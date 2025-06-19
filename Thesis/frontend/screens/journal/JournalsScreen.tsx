import { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SwipeListView } from "react-native-swipe-list-view";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import ScreenContainer from "../../layouts/ScreenContainer";
import { theme } from "../../styles/theme";
import { getAllJournals, deleteJournal } from "../../services/journalService";
import JournalCard from "../../components/cards/JournalCard";
import { Journal } from "../../types/Journal";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import { filterByDateRange, DateRangeFilter } from "../../utils/dateFilters";

type JournalStackParamList = {
  LogJournalScreen: { selectedDate: string };
};

export default function JournalsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<JournalStackParamList>>();
  const [journals, setJournals] = useState<Journal[]>([]);
  const [filteredJournals, setFilteredJournals] = useState<Journal[]>([]);
  const [cardHeights, setCardHeights] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<DateRangeFilter>("all");
  useEffect(() => {
    const mappedJournals = journals.map((j) => ({ ...j, created_at: j.date }));
    setFilteredJournals(filterByDateRange(mappedJournals, filter) as Journal[]);
  }, [journals, filter]);

  useFocusEffect(
    useCallback(() => {
      const fetchJournals = async () => {
        try {
          const data = await getAllJournals();
          setJournals(data || []);
        } catch (error) {
          console.warn("Failed to fetch journals:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchJournals();
    }, [])
  );
  const goToDetail = (date: string) => {
    navigation.navigate("LogJournalScreen", { selectedDate: date });
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Journal",
      "Are you sure you want to delete this entry?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteJournal(id);
              setJournals((prev) => prev.filter((j) => j.id !== id));
            } catch (err) {
              console.warn("Failed to delete journal:", err);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <ScreenContainer scrollable={false}>
        <Text style={styles.title}>My Journal</Text>
        <View style={styles.filtersRow}>
          {(["7_days", "30_days", "1_year", "all"] as DateRangeFilter[]).map(
            (option) => (
              <TouchableOpacity
                key={option}
                onPress={() => setFilter(option)}
                style={[
                  styles.filterPill,
                  filter === option && styles.filterPillActive,
                ]}
              >
                <Text style={styles.filterText}>
                  {option === "7_days"
                    ? "Last 7 Days"
                    : option === "30_days"
                    ? "Last 30 Days"
                    : option === "1_year"
                    ? "Last Year"
                    : "All"}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {!filteredJournals.length && !loading && (
          <Text style={styles.emptyText}>No dreams yet... ✧</Text>
        )}

        <SwipeListView
          data={filteredJournals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              onLayout={({ nativeEvent }) => {
                const { height } = nativeEvent.layout; // ← copy immediately
                setCardHeights((prev) => ({ ...prev, [item.id]: height }));
              }}
            >
              <JournalCard
                journal={item}
                onPress={() => goToDetail(item.date)}
              />
            </View>
          )}
          renderHiddenItem={({ item }) => (
            <View
              style={[
                styles.hiddenRow,
                { height: cardHeights[item.id] ?? "75%" },
              ]}
            >
              <View style={styles.actionWrap}>
                <RectButton
                  style={[styles.actionBtn, styles.delete]}
                  onPress={() => handleDelete(item.id)}
                >
                  <Feather
                    name="trash"
                    size={20}
                    color={theme.colors.textLight}
                  />
                </RectButton>
              </View>
            </View>
          )}
          rightOpenValue={-70}
          disableRightSwipe
          contentContainerStyle={styles.list}
        />
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.xl,
    color: theme.colors.blushPetal,
    marginBottom: theme.spacing.md,
    textAlign: "center",
    textShadowColor: theme.shadow.pinkGlow,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  list: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  hiddenRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 4,
  },
  actionWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtn: {
    width: 60,
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.lg,
  },
  edit: {
    backgroundColor: theme.colors.accent,
    borderTopLeftRadius: theme.radius.lg,
    borderBottomLeftRadius: theme.radius.lg,
    marginRight: 2,
  },
  delete: {
    backgroundColor: theme.colors.error,
    borderTopRightRadius: theme.radius.lg,
    borderBottomRightRadius: theme.radius.lg,
  },
  filtersRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  filterPill: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: 20,
    backgroundColor: "rgba(102, 52, 127, 0.3)", // translucent lilac
    borderWidth: 1,
    borderColor: "rgba(158, 112, 187, 0.6)",
  },
  filterPillActive: {
    backgroundColor: "rgba(194, 170, 209, 0.6)",
    borderColor: theme.colors.gold,
  },
  filterText: {
    fontSize: theme.font.size.sm,
    fontFamily: theme.font.body,
    color: theme.colors.textLight,
  },
  emptyText: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.textMuted,
    textAlign: "center",
    marginBottom: theme.spacing.lg,
  },
});

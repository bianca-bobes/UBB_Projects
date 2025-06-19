import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import ScreenContainer from "../../layouts/ScreenContainer";
import DreamCard from "../../components/cards/DreamCard";
import { theme } from "../../styles/theme";
import { getAllDreams, deleteDream } from "../../services/homeService";
import { Dream } from "../../types/Dream";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { SwipeListView } from "react-native-swipe-list-view";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import { filterByDateRange, DateRangeFilter } from "../../utils/dateFilters";

type DreamsStackParamList = {
  DreamDetail: { dreamId: string };
  EditDream: { dreamId: string };
};

export default function DreamsScreen() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [filteredDreams, setFilteredDreams] = useState<Dream[]>([]);
  const [cardHeights, setCardHeights] = useState<Record<string, number>>({});
  const [filter, setFilter] = useState<DateRangeFilter>("all");
  const navigation =
    useNavigation<NativeStackNavigationProp<DreamsStackParamList>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mappedDreams = dreams.map((d) => ({ ...d, created_at: d.date }));
    setFilteredDreams(filterByDateRange(mappedDreams, filter) as Dream[]);
  }, [dreams, filter]);

  useFocusEffect(
    useCallback(() => {
      const fetchDreams = async () => {
        try {
          const data = await getAllDreams();
          setDreams(data || []);
        } catch (error) {
          console.warn("Failed to fetch dreams:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDreams();
    }, [])
  );

  const handleCardPress = (dreamId: string) => {
    navigation.navigate("DreamDetail", { dreamId });
  };

  const handleEdit = (dreamId: string) => {
    navigation.navigate("EditDream", { dreamId });
  };

  const handleDelete = (dreamId: string) => {
    Alert.alert(
      "Delete Dream",
      "Are you sure you want to delete this dream?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDream(dreamId);
              setDreams((prev) => prev.filter((d) => d.id !== dreamId));
            } catch (err) {
              console.warn("Failed to delete dream:", err);
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
        <Text style={styles.title}>My Dreams</Text>

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

        {!filteredDreams.length && !loading && (
          <Text style={styles.emptyText}>No dreams yet... ✧</Text>
        )}

        <SwipeListView
          data={filteredDreams}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              onLayout={(e) => {
                const height = e.nativeEvent.layout.height;
                setCardHeights((prev) => ({ ...prev, [item.id]: height }));
              }}
            >
              <DreamCard
                content={item.content}
                date={item.date}
                keywords={item.keywords}
                onPress={() => handleCardPress(item.id)}
              />
            </View>
          )}
          renderHiddenItem={({ item }) => (
            <View
              style={[
                styles.hiddenActions,
                { height: cardHeights[item.id] ?? "80%" },
              ]}
            >
              <View style={styles.swipeButtonContainer}>
                <RectButton
                  style={[styles.swipeAction, styles.edit]}
                  onPress={() => handleEdit(item.id)}
                >
                  <Feather
                    name="edit-2"
                    size={20}
                    color={theme.colors.textLight}
                  />
                </RectButton>
              </View>
              <View style={styles.swipeButtonContainer}>
                <RectButton
                  style={[styles.swipeAction, styles.delete]}
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
          rightOpenValue={-140}
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
    marginBottom: theme.spacing.sm,
    textAlign: "center",
    textShadowColor: theme.shadow.pinkGlow,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
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
  list: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  emptyText: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.textMuted,
    textAlign: "center",
    marginBottom: theme.spacing.lg,
  },
  hiddenActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 4,
  },
  swipeAction: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: "70%",
    borderRadius: theme.radius.lg,
  },
  swipeButtonContainer: {
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
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
});

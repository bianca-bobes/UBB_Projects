import { useEffect, useState, useCallback } from "react";
import { Text, View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import ScreenContainer from "../../layouts/ScreenContainer";
import DejaVuCard from "../../components/cards/DejaVuCard";
import { theme } from "../../styles/theme";
import { getAllDejaVus, deleteDejaVu } from "../../services/homeService";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SwipeListView } from "react-native-swipe-list-view";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import { filterByDateRange, DateRangeFilter } from "../../utils/dateFilters";
import { DejaVu } from "../../types/DejaVu";

export type DejaVuStackParamList = {
  DejaVuDetail: { dejaVuId: string };
  EditDejaVu: { dejaVuId: string };
};

export default function DejaVusScreen() {
  const [dejaVus, setDejaVus] = useState<any[]>([]);
  const [filteredDejaVus, setFilteredDejaVus] = useState<DejaVu[]>([]);
  const [cardHeights, setCardHeights] = useState<Record<string, number>>({});
  const navigation =
    useNavigation<NativeStackNavigationProp<DejaVuStackParamList>>();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<DateRangeFilter>("all");

  useEffect(() => {
    const mappedDejaVus = dejaVus.map((d) => ({ ...d, created_at: d.date }));
    setFilteredDejaVus(filterByDateRange(mappedDejaVus, filter) as DejaVu[]);
  }, [dejaVus, filter]);

  const fetchDejaVus = async () => {
    try {
      const res = await getAllDejaVus();
      setDejaVus(res || []);
    } catch (error) {
      console.warn("Failed to fetch deja vus:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDejaVus();
    }, [])
  );

  const handleEdit = (dejaVuId: string) => {
    navigation.navigate("EditDejaVu", { dejaVuId });
  };

  const handleDelete = (dejaVuId: string) => {
    Alert.alert(
      "Delete Déjà Vu",
      "Are you sure you want to delete this entry?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDejaVu(dejaVuId);
              setDejaVus((prev) => prev.filter((d) => d.id !== dejaVuId));
            } catch (err) {
              Alert.alert("Error", "Failed to delete. Try again.");
              console.warn("Delete error:", err);
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
        <Text style={styles.title}>My Déjà Vus</Text>
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

        {!filteredDejaVus.length && !loading && (
          <Text style={styles.emptyText}>No dreams yet... ✧</Text>
        )}

        <SwipeListView
          data={filteredDejaVus}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              onLayout={(e) => {
                const height = e.nativeEvent.layout.height;
                setCardHeights((prev) => ({ ...prev, [item.id]: height }));
              }}
            >
              <DejaVuCard
                content={item.content}
                date={item.date}
                onPress={() =>
                  navigation.navigate("DejaVuDetail", { dejaVuId: item.id })
                }
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
  hiddenActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center", // 🔥 This makes children take full height
    paddingRight: 4,
  },
  swipeAction: {
    justifyContent: "center", // 🔥 This centers the icon inside
    alignItems: "center",
    width: 60,
    height: "70%", // Fill the container height
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

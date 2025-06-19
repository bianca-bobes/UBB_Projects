import { useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  Platform,
  BackHandler,
  NativeEventSubscription,
} from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { format, addMonths } from "date-fns";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";

import WidgetBox from "./WidgetBox";
import PrimaryButton from "../buttons/PrimaryButton";
import { theme } from "../../styles/theme";

/* ──────────────────── Navigation types ──────────────────── */
// Tabs declared in AppTabs.tsx
type TabParamList = {
  Home: undefined;
  Dreams: undefined;
  "Déjà Vu": undefined;
  Journal: {
    screen: "LogJournalScreen";
    params: { selectedDate: string };
  };
  Profile: undefined;
};

// Screens inside JournalStack.tsx
type JournalStackParamList = {
  LogJournalScreen: { selectedDate: string };
};

// What this widget needs:
type NavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, "Journal">,
  NativeStackNavigationProp<JournalStackParamList>
>;

/* ───────────────────────── Component ───────────────────────── */
export default function JournalEntryWidget() {
  const navigation = useNavigation<NavProp>();

  const [pickerVisible, setPickerVisible] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const backSub = useRef<NativeEventSubscription | null>(null);

  const openPicker = () => {
    setPickerVisible(true);
    if (Platform.OS === "android") {
      backSub.current = BackHandler.addEventListener(
        "hardwareBackPress",
        handleClose // same handler we use for the ✕ button
      );
    }
  };

  const handleClose = () => {
    setPickerVisible(false);
    backSub.current?.remove(); // <-- here, not removeEventListener
    backSub.current = null;
    return true; // we consumed the back press
  };

  /** Confirm date & navigate into the Journal tab */
  const handleConfirm = () => {
    handleClose();
    navigation.navigate("Journal", {
      screen: "LogJournalScreen",
      params: { selectedDate: tempDate.toISOString().split("T")[0] },
    });
  };

  const formattedSelected = tempDate.toISOString().split("T")[0];

  /* ──────────────────────── UI ──────────────────────── */
  return (
    <>
      {/* small widget on Home */}
      <TouchableOpacity onPress={openPicker}>
        <WidgetBox title="Journal">
          <Text style={styles.label}>Reflect on it 💭</Text>
          <Text style={styles.dateText}>
            {format(new Date(), "MMMM d, yyyy")}
          </Text>
        </WidgetBox>
      </TouchableOpacity>

      {/* calendar modal */}
      <Modal
        visible={pickerVisible}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.roseQuartz}
              />
            </TouchableOpacity>

            <Calendar
              current={formattedSelected}
              maxDate={new Date().toISOString().split("T")[0]}
              minDate={addMonths(new Date(), -6).toISOString().split("T")[0]}
              onDayPress={(day) => setTempDate(new Date(day.dateString))}
              markedDates={{
                [formattedSelected]: {
                  selected: true,
                  selectedColor: theme.colors.gold,
                  selectedTextColor: theme.colors.surface,
                },
              }}
              theme={{
                backgroundColor: theme.colors.surface,
                calendarBackground: theme.colors.surface,
                dayTextColor: theme.colors.textLight,
                todayTextColor: theme.colors.accent,
                selectedDayBackgroundColor: theme.colors.gold,
                selectedDayTextColor: theme.colors.surface,
                textDisabledColor: "#444",
                monthTextColor: theme.colors.roseQuartz,
                arrowColor: theme.colors.roseQuartz,
                textSectionTitleColor: theme.colors.mistBlue,
              }}
            />

            <PrimaryButton label="Confirm" onPress={handleConfirm} />
          </View>
        </View>
      </Modal>
    </>
  );
}

/* ───────────────────────── Styles ───────────────────────── */
const styles = StyleSheet.create({
  dateText: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.textMuted,
  },
  label: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.sm,
    color: theme.colors.accent,
    textAlign: "center",
    marginBottom: 4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarContainer: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    width: "90%",
    alignItems: "center",
    gap: theme.spacing.md,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    padding: theme.spacing.xs,
  },
});

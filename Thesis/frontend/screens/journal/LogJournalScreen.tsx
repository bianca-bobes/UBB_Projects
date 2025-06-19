import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from "react-native";
import { format } from "date-fns";
import { getJournal, logJournal } from "../../services/journalService";
import VoiceInputField from "../../components/inputs/VoiceInputField";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import MoodBoard from "../../components/common/MoodBoard";
import ScreenContainer from "../../layouts/ScreenContainer";
import { theme } from "../../styles/theme";
import { Ionicons } from "@expo/vector-icons";

interface RouteParams {
  selectedDate: string; // ISO YYYY‑MM‑DD
}

/* ---------------------------------------------------------------- */
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MIN_EDITOR_HEIGHT = SCREEN_HEIGHT * 0.35; // ~45 % of viewport
const MIN_INPUT_HEIGHT = MIN_EDITOR_HEIGHT - 60; // room for voice bar & padding
/* ---------------------------------------------------------------- */

export default function LogJournalScreen() {
  /** ───────── Navigation & params ───────── */
  const navigation = useNavigation();
  const { params } = useRoute();
  const { selectedDate } = params as RouteParams;

  /** ───────── State ───────── */
  const [text, setText] = useState("");
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [inputHeight, setInputHeight] = useState<number>(MIN_INPUT_HEIGHT);

  /** ───────── Prefill (if entry exists) ───────── */
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const result = await getJournal(selectedDate);
        if (mounted && result) {
          setText(result.content);
          setSelectedMoods(result.moods ?? []);
        }
      } catch {
        /* no journal yet – silent */
      }
    })();
    return () => {
      mounted = false;
    };
  }, [selectedDate]);

  /** ───────── Helpers ───────── */
  const toggleMood = (mood: string) =>
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );

  const clearEntry = () =>
    Alert.alert("Clear entry", "Erase all text?", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: () => setText("") },
    ]);

  /** ───────── Save (upsert) ───────── */
  const handleSave = async () => {
    const trimmed = text.trim();
    if (trimmed.length < 2) {
      return Alert.alert("Empty journal", "Please write something first.");
    }
    setSaving(true);
    try {
      await logJournal(trimmed, selectedDate, selectedMoods); // ⬅️ backend upsert
      Alert.alert("Saved ✨", "Your journal entry has been saved.");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not save your journal.");
    } finally {
      setSaving(false);
    }
  };

  /** ───────── Dynamic grow for TextInput ───────── */
  const handleSizeChange = (
    e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => {
    const { height } = e.nativeEvent.contentSize;
    if (height > inputHeight) setInputHeight(height);
  };

  /** ───────── UI ───────── */
  return (
    <ScreenContainer scrollable>
      <Text style={styles.dateLabel}>
        Journal for {format(new Date(selectedDate), "MMMM d, yyyy")}
      </Text>

      {/* ─── Editor box ─── */}
      <View style={[styles.editorBox, { minHeight: MIN_EDITOR_HEIGHT }]}>
        {/* Clear icon */}
        <TouchableOpacity style={styles.clearBtn} onPress={clearEntry}>
          <Ionicons name="trash-outline" size={20} color={theme.colors.moonLilac} />
        </TouchableOpacity>

        <TextInput
          style={[styles.textInput, { height: inputHeight }]}
          multiline
          onContentSizeChange={handleSizeChange}
          value={text}
          placeholder="Write about your day, emotions, thoughts…"
          placeholderTextColor={theme.colors.textMuted}
          onChangeText={setText}
        />

        {/* Voice input */}
        <VoiceInputField
          onTextFinalized={(spoken) =>
            setText((prev) => `${prev}${prev ? "\n" : ""}${spoken}`)
          }
        
        />
      </View>

      {/* ─── Mood tags ─── */}
      <MoodBoard selectedMoods={selectedMoods} onToggleMood={toggleMood} />

      {/* ─── Save button ─── */}
      <PrimaryButton
        label={saving ? "Saving…" : "Save entry"}
        onPress={handleSave}
        disabled={saving}
      />
    </ScreenContainer>
  );
}

/* ──────────────────────────── Styles ──────────────────────────── */
const styles = StyleSheet.create({
  dateLabel: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.xl,
    color: theme.colors.blushPetal,
    textAlign: "center",
    textShadowColor: theme.shadow.pinkGlow,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  editorBox: {
    backgroundColor: "rgba(0,0,0,0.20)", // subtle transparency so stars peek through
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  clearBtn: {
    position: "absolute",
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    zIndex: 2,
  },
  textInput: {
    color: theme.colors.textLight,
    fontSize: theme.font.size.md,
    fontFamily: theme.font.body,
    textAlignVertical: "top",
  },
  voiceBox: {
    backgroundColor: "rgba(0,0,0,0.25)",
    marginTop: theme.spacing.md,
  },
});

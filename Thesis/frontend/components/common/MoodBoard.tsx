import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { moodTags } from '../../utils/moodTags';
import { theme } from '../../styles/theme';

export type MoodBoardProps = {
  selectedMoods: string[];
  onToggleMood: (label: string) => void;
};

export default function MoodBoard({ selectedMoods, onToggleMood }: MoodBoardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How did you feel?</Text>
      <View style={styles.tagsContainer}>
        {moodTags.map(({ label, color }) => {
          const selected = selectedMoods.includes(label);
          return (
            <TouchableOpacity
              key={label}
              onPress={() => onToggleMood(label)}
              style={[
                styles.tag,
                { borderColor: color },
                selected && { backgroundColor: color },
              ]}
            >
              <Text
                style={[
                  styles.tagText,
                  selected && { color: theme.colors.background, fontWeight: '600' },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  title: {
    fontSize: 16,
    fontFamily: theme.font.header,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    gap: 10,
  },
  tag: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  tagText: {
    fontSize: 13,
    fontFamily: theme.font.body,
    color: theme.colors.textMuted,
  },
});

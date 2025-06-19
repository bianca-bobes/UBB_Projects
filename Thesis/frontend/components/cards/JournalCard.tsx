import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import { theme, cardThemes } from '../../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { Journal } from '../../types/Journal';

interface Props {
  journal: Journal;
  onPress: () => void;
}

export default function JournalCard({ journal, onPress }: Props) {
  const variant = cardThemes.journal;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, {
        backgroundColor: variant.backgroundColor,
        borderColor: variant.borderColor,
        shadowColor: '#000',
      }]}
    >
      <Text style={[styles.date,{ color: theme.colors.gold }]}>
        {format(parseISO(journal.date), 'MMM d, yyyy')}
      </Text>

      <View style={styles.moodRow}>
        {journal.moods?.slice(0, 4).map((m) => (
          <View key={m} style={styles.moodChip}>
            <Text style={[styles.moodText, { color: variant.textColor }]}>{m}</Text>
          </View>
        ))}
        {journal.moods?.length! > 4 && (
          <Ionicons
            name="chevron-forward"
            size={14}
            color={theme.colors.textMuted}
          />
        )}
      </View>

      <Text numberOfLines={2} style={[styles.snippet, { color: variant.textColor }]}>
        {journal.content}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    minWidth: '100%',
  },
  date: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.md,
    marginBottom: theme.spacing.xs,
    textShadowColor: theme.shadow.pinkGlow,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  moodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xxs,
    marginBottom: theme.spacing.xs,
  },
  moodChip: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: theme.radius.pill,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
  },
  moodText: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.sm,
  },
  snippet: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.sm,
  },
});

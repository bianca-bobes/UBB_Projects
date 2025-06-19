import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { theme, cardThemes } from '../../styles/theme';
import { format } from 'date-fns';

interface Props {
  content: string;
  date: string;
  keywords?: string[];
  onPress?: () => void;
}

export default function DejaVuCard({ content, date, onPress }: Props) {
  let formattedDate = 'Unknown Date';

  try {
    if (date) {
      const parsed = new Date(date);
      if (!isNaN(parsed.getTime())) {
        formattedDate = format(parsed, 'MMM d, yyyy');
      }
    }
  } catch {
    formattedDate = 'Invalid Date';
  }

  const variant = cardThemes.dejavu;

  return (
    <TouchableOpacity
      style={[styles.card, {
        backgroundColor: variant.backgroundColor,
        borderColor: variant.borderColor,
        shadowColor: '#000',
      }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={[styles.date, { color: theme.colors.gold }]}>{formattedDate}</Text>
      <Text style={[styles.content, { color: variant.textColor }]} numberOfLines={4}>
        {content}
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

  content: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.sm,
  },
});

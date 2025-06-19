import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

interface Props {
  quote: string;
  author?: string;
}

export default function QuoteBlock({ quote, author }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.quoteText}>"{quote}"</Text>
      {author && <Text style={styles.author}>– {author}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(30, 16, 51, 0.6)',
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    marginHorizontal: theme.spacing.sm,
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  quoteText: {
    fontFamily:theme.font.quote,
    fontSize: theme.font.size.md,
    color: theme.colors.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  author: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.sm,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
  },
});

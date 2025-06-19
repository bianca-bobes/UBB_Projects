import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { theme, cardThemes } from '../../styles/theme';
import { format } from 'date-fns';

interface Props {
  content: string;
  date: string;
  keywords?: string[];
  onPress?: () => void;
}

export default function DreamCard({ content, date, keywords, onPress }: Props) {
  const formattedDate = format(new Date(date), 'MMM d, yyyy');
  const variant = cardThemes.dream;

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

      {keywords?.length ? (
        <View style={styles.keywordContainer}>
          {keywords.slice(0, 3).map((kw, index) => (
            <View
              key={index}
              style={[
                styles.keywordPill,
                { backgroundColor: theme.colors.galaxyIndigo, borderColor: theme.colors.dreamyPink },
              ]}
            >
              <Text style={[styles.keywordText, { color: theme.colors.mistBlue }]}>{kw}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <Text style={[styles.content, { color: variant.textColor }]} numberOfLines={4}>
        {content}
      </Text>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
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

  keywordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },

  keywordPill: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: theme.radius.pill,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
  },

  keywordText: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.sm,
  },

  content: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.sm,
  },
});

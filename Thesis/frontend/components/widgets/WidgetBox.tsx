import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../styles/theme';

interface Props {
  title: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export default function WidgetBox({ title, children, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(30, 16, 51, 0.75)',
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    justifyContent: 'center',
  },
  title: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.md,
    color: theme.colors.dreamyPink,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
    textShadowColor: theme.shadow.softGlow,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10
  },
  content: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
});

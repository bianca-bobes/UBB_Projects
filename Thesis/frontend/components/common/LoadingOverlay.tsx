import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export default function LoadingOverlay({ message = 'Loading your dreamspace... 🌙✨' }) {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={theme.colors.accent} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 10, 35, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    paddingHorizontal: theme.spacing.lg,
  },
  text: {
    marginTop: theme.spacing.lg,
    fontFamily: theme.font.body,
    fontSize: theme.font.size.lg,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
});

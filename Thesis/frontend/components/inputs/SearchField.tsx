import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '../../styles/theme';

export default function SearchField(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor={theme.colors.textMuted}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(30, 16, 51, 0.7)',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.md,
    color: theme.colors.textLight,
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    width: '100%',
  },
});

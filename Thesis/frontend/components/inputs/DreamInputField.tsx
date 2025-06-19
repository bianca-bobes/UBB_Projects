import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

interface Props extends TextInputProps {
  fullWidth?: boolean;
}

export default function DreamInputField({ fullWidth = true, ...rest }: Props) {
  return (
    <TextInput
      {...rest}
      style={[styles.input, fullWidth && styles.fullWidth, rest.style]}
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
  },
  fullWidth: {
    width: '100%',
  },
});

import { StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export const screenContainerStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  keyboardWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: theme.font.size.xxl,
    fontFamily: theme.font.header,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.font.size.md,
    fontFamily: theme.font.body,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  welcomeTitle: {
    fontSize: theme.font.size.xxl + 4,
    fontFamily: theme.font.header,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  welcomeSubtitle: {
    fontSize: theme.font.size.md,
    fontFamily: theme.font.body,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  content: {
  flexGrow: 1,
  paddingBottom: theme.spacing.xl,
  gap: theme.spacing.xs,
  width: '100%',   
  alignSelf: 'stretch',  
},

});

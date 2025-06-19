import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ScreenContainer from '../../layouts/ScreenContainer';
import AuthInput from '../../components/inputs/AuthInput';
import { theme } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';
import { login as loginApi } from '../../services/authService';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const token = await loginApi(email, password);
      if (token) {
        await login(token);
      } else {
        Alert.alert('Login failed', 'No token received');
      }
    } catch (error: any) {
      Alert.alert('Invalid credentials', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <ScreenContainer variant="welcome" scrollable={false}>
      <View style={styles.centered}>
        <Text style={styles.title}>Welcome to Oneiro</Text>
        <Text style={styles.subtitle}>Enter your dreamspace</Text>

        <AuthInput placeholder="Email" value={email} onChangeText={setEmail} />
        <AuthInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Log In'}</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.lg,
  },
  title: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.xxl,
    color: theme.colors.textLight,
  },
  subtitle: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.lg,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radius.lg,
  },
  buttonText: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.textLight,
  },
  linkText: {
    fontFamily: theme.font.body,
    color: theme.colors.textLight,
    textDecorationLine: 'underline',
  },
  buttonDisabled: {
    opacity: 0.6,
  }  
});

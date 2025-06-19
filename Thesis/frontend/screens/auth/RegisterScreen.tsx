import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ScreenContainer from '../../layouts/ScreenContainer';
import AuthInput from '../../components/inputs/AuthInput';
import { theme } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';
import { register as registerApi } from '../../services/authService';

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleRegister = async () => {
    try {
      const token = await registerApi(email, password);
      if (token) {
        await login(token);
      } else {
        Alert.alert('Registration failed', 'No token received');
      }
    } catch (error: any) {
      console.warn('Register failed:', error?.response?.data || error.message);
      Alert.alert(
        'Registration Error',
        error?.response?.data?.detail || error.message || 'Something went wrong'
      );
    }
  };
  

  return (
    <ScreenContainer variant="welcome" scrollable={false}>
      <View style={styles.centered}>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Begin your journey</Text>

        <AuthInput placeholder="Email" value={email} onChangeText={setEmail} />
        <AuthInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Log in</Text>
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
});

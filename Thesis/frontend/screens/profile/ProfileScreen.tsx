import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import ScreenContainer from '../../layouts/ScreenContainer';
import { theme } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import EditModal from '../../components/cards/EditModal';
import { updateEmail, updatePassword } from '../../services/authService';
import { Pencil } from 'phosphor-react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const username = user?.email?.split('@')[0] ?? 'dreamer';
  const email = user?.email ?? '';

  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const handleEmailUpdate = async (newEmail: string) => {
    try {
      await updateEmail(newEmail);
      Alert.alert('Success', 'Check your inbox to confirm email update.');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handlePasswordUpdate = async (newPassword: string, confirm: string) => {
    try {
      await updatePassword(newPassword);
      Alert.alert('Success', 'Password updated successfully.');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScreenContainer variant="welcome">
      <View style={styles.container}>
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.subtitle}>Manage your dreamspace</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.value}>{username}</Text>
        </View>

        <View style={styles.cardRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
          <TouchableOpacity onPress={() => setEmailModalVisible(true)}>
            <Pencil size={22} color={theme.colors.accent} weight="bold" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cardButton} onPress={() => setPasswordModalVisible(true)}>
          <Text style={styles.cardButtonText}>Change Password</Text>
        </TouchableOpacity>

        <PrimaryButton label="Log Out" onPress={logout} style={styles.logout} />
      </View>

      <EditModal
        visible={emailModalVisible}
        onClose={() => setEmailModalVisible(false)}
        onSave={(value) => handleEmailUpdate(value)}
        label="Update Email"
        placeholder="Enter new email"
        type="email"
      />

      <EditModal
        visible={passwordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
        onSave={(value, confirm) => handlePasswordUpdate(value, confirm || '')}
        label="Update Password"
        placeholder="New password"
        type="password"
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  title: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.xxl,
    color: theme.colors.blushPetal,
    textAlign: 'center',
    textShadowColor: theme.shadow.pinkGlow,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  card: {
    backgroundColor: theme.colors.galaxyIndigo,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    width: '95%',
    maxWidth: 360,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.galaxyIndigo,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    width: '95%',

  },
  infoBlock: {
    flexShrink: 1,
  },
  label: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.sm,
    color: theme.colors.textMuted,
  },
  value: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.textLight,
  },
  cardButton: {
    backgroundColor: theme.colors.galaxyIndigo,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    width: '95%',

  },
  cardButtonText: {
    textAlign: 'center',
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.textLight,
  },
  logout: {
    backgroundColor: theme.colors.galaxyIndigo,
    width: '95%',
  },
});

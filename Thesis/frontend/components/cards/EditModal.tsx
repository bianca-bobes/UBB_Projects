import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { theme } from '../../styles/theme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (value: string, confirm?: string) => void;
  label: string;
  placeholder: string;
  type: 'email' | 'password';
}

export default function EditModal({ visible, onClose, onSave, label, placeholder, type }: Props) {
  const [value, setValue] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSave = () => {
    if (type === 'password') onSave(value, confirm);
    else onSave(value);
    setValue('');
    setConfirm('');
    onClose();
  };

  const handleCancel = () => {
    setValue('');
    setConfirm('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <View style={styles.modalCard}>
          <Text style={styles.label}>{label}</Text>

          <TextInput
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textMuted}
            style={styles.input}
            value={value}
            onChangeText={setValue}
            autoCapitalize="none"
            secureTextEntry={type === 'password'}
          />

          {type === 'password' && (
            <TextInput
              placeholder="Confirm password"
              placeholderTextColor={theme.colors.textMuted}
              style={styles.input}
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
            />
          )}

          <View style={styles.row}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.save}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '85%',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    gap: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  label: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.lg,
    color: theme.colors.textLight,
  },
  input: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.textLight,
    borderColor: theme.colors.accent,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancel: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.textMuted,
  },
  save: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.md,
    color: theme.colors.accent,
  },
});

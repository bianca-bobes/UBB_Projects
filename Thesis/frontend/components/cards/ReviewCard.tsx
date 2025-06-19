import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { theme } from '../../styles/theme';

interface Props {
  visible: boolean;
  onClose: () => void;
  text: string;
  onTextChange: (text: string) => void;
  onLogDream: () => void;
  onLogDejaVu: () => void;
}

export default function ReviewCard({
  visible,
  onClose,
  text,
  onTextChange,
  onLogDream,
  onLogDejaVu,
}: Props) {
  const [selected, setSelected] = useState<'dream' | 'dejavu' | null>(null);

  const handleDone = () => {
    if (selected === 'dream') onLogDream();
    else if (selected === 'dejavu') onLogDejaVu();
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <BlurView intensity={70} tint="dark" style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Review Your Entry</Text>

          <TextInput
            value={text}
            onChangeText={onTextChange}
            multiline
            placeholder="Edit what you wrote or said..."
            placeholderTextColor="#aaa"
            style={styles.input}
          />

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => setSelected('dream')}
              style={[
                styles.optionButton,
                selected === 'dream' && styles.selectedButton,
              ]}
            >
              <Text style={styles.optionText}>Log as Dream</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelected('dejavu')}
              style={[
                styles.optionButton,
                selected === 'dejavu' && styles.selectedButton,
              ]}
            >
              <Text style={styles.optionText}>Log as Déjà Vu</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.cancel}>
              <Text style={{ color: '#ccc' }}>Cancel</Text>
            </TouchableOpacity>

            {selected && (
              <TouchableOpacity onPress={handleDone} style={styles.done}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Done</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(30, 16, 51, 0.85)', // dreamy semi-transparent
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.accent,
    padding: 20,
    width: '90%',
    shadowColor: theme.colors.shimmer,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  title: {
    color: theme.colors.textLight,
    fontSize: theme.font.size.lg,
    fontFamily: theme.font.header,
    marginBottom: 12,
    textAlign: 'center',
    textShadowColor: theme.shadow.pinkGlow,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)', // soft dreamy mist
    color: theme.colors.textLight,
    padding: 12,
    borderRadius: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    fontFamily: theme.font.body,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.galaxyIndigo,
    borderWidth: 1,
    borderColor: theme.colors.dreamyPink,
  },
  selectedButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.accent,
  },
  optionText: {
    color: theme.colors.textLight,
    fontFamily: theme.font.body,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancel: {
    padding: 10,
  },
  done: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    shadowColor: theme.colors.accent,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
});


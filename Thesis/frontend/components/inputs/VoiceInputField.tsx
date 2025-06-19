import { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Microphone, Stop, PaperPlaneRight } from 'phosphor-react-native';
import { theme } from '../../styles/theme';
import { useTranscription } from '../../hooks/useTranscription';

interface Props {
  onTextFinalized: (text: string) => void;
}

export default function VoiceInputField({ onTextFinalized }: Props) {
  const [text, setText] = useState('');
  const {
    startRecording,
    stopAndTranscribe,
    recording,
    loading,
    transcribedText,
    clearTranscription // ADD THIS TO YOUR useTranscription HOOK!
  } = useTranscription({
    onTranscription: (text: string) => setText(prev => `${prev} ${text}`.trim()),
  });

  // Append transcription once
  useEffect(() => {
    if (transcribedText && !text.includes(transcribedText)) {
      setText(prev => `${prev} ${transcribedText}`.trim());
    }
  }, [transcribedText]);

  const handleMicPress = async () => {
    if (recording) await stopAndTranscribe();
    else await startRecording();
  };

  const handleDone = () => {
    if (text.trim()) {
      onTextFinalized(text.trim());
      setText('');
      clearTranscription(); // clear Whisper result after done
    }
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder="Let’s hear what happened..."
        placeholderTextColor={theme.colors.textMuted}
        style={styles.input}
        value={text}
        onChangeText={setText}
        multiline
      />
      <TouchableOpacity onPress={handleMicPress} style={styles.iconButton}>
        {loading ? <ActivityIndicator color={theme.colors.primary} /> : recording ? <Stop size={24} color={theme.colors.primary} /> : <Microphone size={24} color={theme.colors.primary} />}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
        <PaperPlaneRight size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  input: {
    flex: 1,
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.textLight,
    paddingRight: theme.spacing.sm,
  },
  iconButton: {
    marginLeft: theme.spacing.sm,
  },
  doneButton: {
    marginLeft: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.xs,
  },
});

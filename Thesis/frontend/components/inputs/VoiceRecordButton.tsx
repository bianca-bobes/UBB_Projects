import { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Audio } from 'expo-av';
import { theme } from '../../styles/theme';

interface Props {
  isRecording: boolean;
  onStart: () => void;
  onStop: (uri: string) => void;
}

export default function VoiceRecordButton({ isRecording, onStart, onStop }: Props) {
  const soundRef = useRef<Audio.Recording | null>(null);
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Audio.requestPermissionsAsync();
  }, []);

  const start = async () => {
    try {
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      soundRef.current = recording;
      await recording.startAsync();
      onStart();
    } catch (err) {
      console.warn('Start recording error:', err);
    }
  };

  const stop = async () => {
    try {
      if (!soundRef.current) return;
      await soundRef.current.stopAndUnloadAsync();
      const uri = soundRef.current.getURI();
      onStop(uri ?? '');
    } catch (err) {
      console.warn('Stop recording error:', err);
    }
  };

  const handlePressIn = () => {
    start();
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    stop();
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.buttonWrapper, { transform: [{ scale }] }]}>
      <TouchableOpacity
        style={styles.button}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={styles.text}>{isRecording ? 'Recording...' : 'Hold / Tap'}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radius.pill,
    shadowColor: theme.colors.accent,
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  text: {
    color: theme.colors.textLight,
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
  },
});

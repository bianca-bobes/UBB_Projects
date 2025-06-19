import { Audio, InterruptionModeIOS } from 'expo-av';
import { useState } from 'react';

export function useVoiceRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const startRecording = async () => {
  try {
    console.log('[Recorder] Requesting microphone permission...');
    const { granted } = await Audio.requestPermissionsAsync();

    if (!granted) {
      console.warn('[Recorder] Microphone permission not granted');
      return;
    }

    console.log('[Recorder] Permission granted. Configuring audio mode...');
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
    });

    console.log('[Recorder] Audio mode set. Preparing to record...');
    const rec = new Audio.Recording();
    await rec.prepareToRecordAsync({
      android: {
        extension: '.m4a',
        outputFormat: 2,
        audioEncoder: 3,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
      },
      ios: {
        extension: '.m4a',
        audioQuality: 127,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
      },
      web: {},
      isMeteringEnabled: false,
    });

    console.log('[Recorder] Starting recording...');
    await rec.startAsync();
    setRecording(rec);
    console.log('[Recorder] Recording started.');
  } catch (error) {
    console.error('[Recorder] Failed to start recording:', error);
  }
};

  const stopRecording = async (): Promise<string> => {
    try {
      if (!recording) {
        throw new Error('[Recorder] No active recording to stop.');
      }

      console.log('[Recorder] Stopping recording...');
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('[Recorder] Recording stopped. File saved at:', uri);
      setRecording(null);
      return uri!;
    } catch (error) {
      console.error('[Recorder] Failed to stop recording:', error);
      throw error;
    }
  };

  return {
    recording,
    startRecording,
    stopRecording,
  };
}

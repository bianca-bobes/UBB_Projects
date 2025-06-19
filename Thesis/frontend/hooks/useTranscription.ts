import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { transcribeAudio } from '../services/homeService'; // ✅ make sure this points to the correct service

export const useTranscription = (p0: { onTranscription: (text: any) => void; }) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [loading, setLoading] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const clearTranscription= () => setTranscribedText('');

  const startRecording = async () => {
    try {
      console.log('[Recorder] Requesting microphone permission...');
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') throw new Error('Microphone permission denied');

      console.log('[Recorder] Permission granted. Configuring audio mode...');
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('[Recorder] Audio mode set. Preparing to record...');
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      console.log('[Recorder] Starting recording...');
      await newRecording.startAsync();
      setRecording(newRecording);
      console.log('[Recorder] Recording started.');
    } catch (err) {
      console.error('[Recorder] Failed to start recording:', err);
    }
  };

  const stopAndTranscribe = async () => {
    if (!recording) return;

    console.log('[Recorder] Stopping recording...');
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('[Recorder] Recording stopped. File saved at:', uri);

      if (!uri) throw new Error('No recording URI found');

      setLoading(true);

      // ✅ Convert local URI to a File object
      const fileInfo = await FileSystem.getInfoAsync(uri);
      const fileBlob = {
        uri: uri,
        name: 'recording.m4a',
        type: 'audio/m4a',
      } as unknown as File;

      // ✅ Call transcribe service
      const transcription = await transcribeAudio(fileBlob);
      console.log('[Transcription] Result:', transcription);

      setTranscribedText(transcription);
    } catch (err) {
      console.error('Transcription failed:', err);
    } finally {
      setRecording(null);
      setLoading(false);
    }
  };

  return {
    startRecording,
    stopAndTranscribe,
    recording: !!recording,
    loading,
    transcribedText,
    clearTranscription,
  };
};

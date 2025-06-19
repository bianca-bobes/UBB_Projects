import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getDream, updateDream } from '../../services/homeService';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import ScreenContainer from '../../layouts/ScreenContainer';
import { theme } from '../../styles/theme';

type MainStackParamList = {
    Interpretation: { dreamId: string, dreamText: string };
    Tabs: undefined;
  };
export default function EditDreamScreen() {
  const route = useRoute();
  const navigation =useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { dreamId } = route.params as { dreamId: string };

  const [text, setText] = useState('');
  const [initialText, setInitialText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchDream = async () => {
      try {
        const dream = await getDream(dreamId);
        setText(dream.content);
        setInitialText(dream.content);
      } catch (err) {
        Alert.alert('Error', 'Failed to load dream');
      } finally {
        setLoading(false);
      }
    };
    fetchDream();
  }, [dreamId]);

  const handleUpdate = async () => {
    const trimmed = text.trim();
    if (trimmed === initialText.trim()) {
      Alert.alert('No changes made');
      return;
    }

    setSaving(true);
    try {
      await updateDream(dreamId, trimmed);
     navigation.replace('Interpretation', {
            dreamId,
            dreamText: trimmed,
          })
    } catch (err) {
      Alert.alert('Error', 'Failed to update dream.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.wrapper}>
          <Text style={styles.label}>Edit Dream ✨</Text>

          <View style={styles.inputCard}>
            <TextInput
              style={styles.input}
              multiline
              value={text}
              onChangeText={setText}
              placeholder="Update your dream content..."
              placeholderTextColor={theme.colors.textMuted}
              editable={!loading}
            />
          </View>

          <PrimaryButton
            label={saving ? 'Saving...' : 'Save & Reinterpret'}
            onPress={handleUpdate}
            disabled={saving || !text.trim()}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.md,
    gap: theme.spacing.lg,
  },
  label: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.lg,
    color: theme.colors.blushPetal,
    textAlign: 'center',
    textShadowColor: theme.shadow.pinkGlow,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  inputCard: {
    backgroundColor:theme.colors.warmGalaxyIndigo,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    shadowColor: theme.shadow.pinkGlow,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 3,
  },
  input: {
    color: theme.colors.textLight,
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    minHeight: 140,
    minWidth: '100%',
    textAlignVertical: 'top',
  },
});

import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getDejaVu, updateDejaVu } from '../../services/homeService';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import ScreenContainer from '../../layouts/ScreenContainer';
import { theme } from '../../styles/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type DejaVuStackParamList = {
  DejaVuDetail: { dejaVuId: string };
};

export default function EditDejaVuScreen() {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<DejaVuStackParamList>>();
  const { dejaVuId } = route.params as { dejaVuId: string };

  const [text, setText] = useState('');
  const [initialText, setInitialText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchDejaVu = async () => {
      try {
        const dejaVu = await getDejaVu(dejaVuId);
        setText(dejaVu.content);
        setInitialText(dejaVu.content);
      } catch (err) {
        Alert.alert('Error', 'Failed to load deja vu');
      } finally {
        setLoading(false);
      }
    };
    fetchDejaVu();
  }, [dejaVuId]);

  const handleSave = async () => {
    const trimmed = text.trim();
    if (trimmed === initialText.trim()) {
      Alert.alert('No changes made');
      return;
    }

    setSaving(true);
    try {
      await updateDejaVu(dejaVuId, trimmed);
      Alert.alert('Updated!', 'Your deja vu has been updated.');
      navigation.navigate('DejaVuDetail', { dejaVuId });
    } catch (err) {
      Alert.alert('Error', 'Failed to update deja vu');
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
          <Text style={styles.label}>Edit Déjà Vu ✨</Text>
          <TextInput
            style={styles.input}
            multiline
            value={text}
            onChangeText={setText}
            placeholder="Update your deja vu..."
            placeholderTextColor={theme.colors.textMuted}
            editable={!loading}
          />
          <PrimaryButton
            label={saving ? 'Saving...' : 'Save Changes'}
            onPress={handleSave}
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
    marginBottom: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    color: theme.colors.textLight,
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    minHeight: 140,
    textAlignVertical: 'top',
  },
});

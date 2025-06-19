import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import ScreenContainer from '../../layouts/ScreenContainer';
import { theme } from '../../styles/theme';
import { interpretDream } from '../../services/homeService';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type MainStackParamList = {
    DreamDetail: { dreamId: string };
    Tabs: undefined;
  };
interface RouteParams {
  dreamId: string;
  dreamText: string;
  dreamDate?: string;
}

const lengths = ['short', 'medium', 'long'];
const stylesList = ['symbolic', 'psychological', 'mythological'];

export default function InterpretationScreen() {
  const route = useRoute();
   const navigation =useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { dreamId, dreamText,dreamDate } = route.params as RouteParams;

  const [selectedLength, setSelectedLength] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [customStyle, setCustomStyle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInterpret = async () => {
    if (!selectedLength) {
      Alert.alert('⏳ Please select a length');
      return;
    }

    const finalStyle = customStyle || selectedStyle;

    try {
      setLoading(true);
      await interpretDream(dreamId, dreamText, selectedLength, finalStyle || '', dreamDate || '');
      Alert.alert('✨ Success', 'Your dream has been interpreted.');
      navigation.navigate('DreamDetail', { dreamId });

    } catch (error) {
      Alert.alert('Error', '✨ Failed to interpret your dream');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Text style={styles.header}>✨ Interpret Your Dream</Text>

      <Text style={styles.label}>Select Length *</Text>
      <View style={styles.badgeRow}>
        {lengths.map((len) => (
          <TouchableOpacity
            key={len}
            style={[styles.badge, selectedLength === len && styles.activeBadge]}
            onPress={() => setSelectedLength(len)}
          >
            <Text style={styles.badgeText}>{len}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Choose a Style (optional)</Text>
      <View style={styles.badgeRow}>
        {stylesList.map((style) => (
          <TouchableOpacity
            key={style}
            style={[styles.badge, selectedStyle === style && styles.activeBadge]}
            onPress={() => setSelectedStyle(style)}
          >
            <Text style={styles.badgeText}>{style}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Or write your own style</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. surrealist, Jungian..."
        value={customStyle}
        onChangeText={setCustomStyle}
        placeholderTextColor={theme.colors.textMuted}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleInterpret}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Interpreting...' : 'Interpret ✨'}
        </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.xl,
    color: theme.colors.blushPetal,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
    textShadowColor: theme.shadow.pinkGlow,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  label: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.sm,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  badge: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.accent,
    marginBottom: theme.spacing.sm,
  },
  activeBadge: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.primary,
  },
  badgeText: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.sm,
    color: theme.colors.textLight,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.accent,
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
    fontFamily: theme.font.body,
    color: theme.colors.textLight,
    backgroundColor: theme.colors.surface,
  },
  button: {
    backgroundColor: theme.colors.primary,
    marginTop: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.textLight,
  },
});

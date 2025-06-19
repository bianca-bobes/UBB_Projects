import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import ScreenContainer from '../../layouts/ScreenContainer';
import { theme } from '../../styles/theme';
import { getDejaVu, matchDejaVu, getDream } from '../../services/homeService';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import { showSnackbar } from '../../utils/showSnackbar'; // Ensure this exists

interface RouteParams {
  dejaVuId: string;
}

export default function DejaVuDetailScreen() {
  const route = useRoute();
  const { dejaVuId } = route.params as RouteParams;

  const [dejaVu, setDejaVu] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [matchLoading, setMatchLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchDejaVu = async () => {
        setLoading(true);
        try {
          const data = await getDejaVu(dejaVuId);
          setDejaVu(data);

        } catch (err) {
          console.warn('Failed to fetch deja vu:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchDejaVu();
    }, [dejaVuId])
  );

  const handleCheckMatch = async () => {
    setMatchLoading(true);
    try {
      const result = await matchDejaVu(dejaVuId);
      if (result.match?.dreamId) {
        const matchedDream = await getDream(result.match.dreamId);
        setDejaVu((prev: any) => ({ ...prev, match: matchedDream.content }));
        showSnackbar('🎯 Match found from your dreams!');
      } else {
        showSnackbar('😔 No strong match found.');
      }
    } catch (err) {
      console.warn('Error checking match:', err);
      showSnackbar('Error while matching déjà vu.');
    } finally {
      setMatchLoading(false);
    }
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!dejaVu) {
    return (
      <ScreenContainer>
        <Text style={styles.error}>Could not load deja vu details.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
    <View style={styles.wrapper}>
      {dejaVu?.date && (
        <Text style={styles.date}>
          {new Date(dejaVu.date).toDateString()}
        </Text>
      )}

      <Text style={styles.sectionTitle}>Your Déjà Vu</Text>
      <Text style={styles.content}>{dejaVu.content}</Text>

      <TouchableOpacity
        onPress={handleCheckMatch}
        style={styles.interpretButton}
        disabled={matchLoading}
      >
        <Text style={styles.interpretButtonText}>
          {matchLoading ? 'Checking...' : 'Check for Dream Match 🔍'}
        </Text>
      </TouchableOpacity>

      {dejaVu.match && (
        <>
          <Text style={styles.sectionTitle}>Related Dream</Text>
          <Text style={styles.content}>{dejaVu.match}</Text>
        </>
      )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignContent: 'flex-start',
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  date: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.xxl,
    color: theme.colors.blushPetal,
    marginTop: theme.spacing.lg,
    textAlign: 'center',
    textShadowColor: theme.shadow.pinkGlow,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  sectionTitle: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.md,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  content: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.lg,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
  },
  error: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.error,
    textAlign: 'center',
  },
  interpretButton: {
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignSelf: 'flex-start',
  },
  interpretButtonText: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.textLight,
  },
 
});

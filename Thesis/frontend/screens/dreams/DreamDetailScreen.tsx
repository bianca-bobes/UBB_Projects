import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert, TouchableOpacity } from 'react-native';
import { useNavigation ,useFocusEffect,useIsFocused} from '@react-navigation/native';
import ScreenContainer from '../../layouts/ScreenContainer';
import { theme } from '../../styles/theme';
import { useRoute } from '@react-navigation/native';
import { getDream, markDreamAsReal } from '../../services/homeService';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface RouteParams {
  dreamId: string;
}
type MainStackParamList = {
    Interpretation: { dreamId: string, dreamText: string, dreamDate?: string };
    Tabs: undefined;
  };

export default function DreamDetailScreen() {
  const isFocused = useIsFocused();
  const route = useRoute();
  const { dreamId } = route.params as RouteParams;

  const [dream, setDream] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isReal, setIsReal] = useState(false);
  const navigation =useNavigation<NativeStackNavigationProp<MainStackParamList>>();


  useFocusEffect(
    useCallback(() => {
      const fetchDream = async () => {
        setLoading(true);
        try {
          const data = await getDream(dreamId);
          setDream(data);
          setIsReal(data.happened_in_real_life || false);
        } catch (err) {
          console.warn('Failed to fetch dream:', err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchDream();
    }, [dreamId])
  );
  

  const handleToggleReal = async (value: boolean) => {
    setIsReal(value);
    if (value) {
      try {
        await markDreamAsReal(dreamId);
      } catch (error) {
        Alert.alert('Error', 'Could not mark dream as real');
        setIsReal(false);
      }
    }
  };

  if (loading) {
    return (
        <LoadingOverlay />
    );
  }

  if (!dream) {
    return (
      <ScreenContainer>
        <Text style={styles.error}>Could not load dream details.</Text>
      </ScreenContainer>
    );
  }

 return (
  <ScreenContainer>
    <Text style={styles.date}>{new Date(dream.date).toDateString()}</Text>
    <Text style={styles.sectionTitle}>Your Dream</Text>
    <Text style={styles.content}>{dream.content}</Text>

    {dream.interpreted_text ? (
      <>
        <Text style={styles.sectionTitle}>Dream Interpretation</Text>
        <Text style={styles.interpretation}>{dream.interpreted_text}</Text>
      </>
    ) : (
      <TouchableOpacity
        style={styles.interpretButton}
        onPress={() =>
          navigation.navigate('Interpretation', {
            dreamId,
            dreamText: dream.content,
            dreamDate: dream.date || '',
          })
        }
      >
        <Text style={styles.interpretButtonText}>Interpret this dream ✨</Text>
      </TouchableOpacity>
    )}

    {dream.keywords && (
      <>
        <Text style={styles.sectionTitle}>Important Keywords</Text>
        <View style={styles.keywordsContainer}>
          {dream.keywords.map((kw: string) => (
            <Text key={kw} style={styles.keywordBadge}>✨ {kw}</Text>
          ))}
        </View>
      </>
    )}

    <View style={styles.switchContainer}>
      <Text style={styles.switchLabel}>🌟 Happened in Real Life</Text>
      <Switch
        value={isReal}
        onValueChange={handleToggleReal}
        trackColor={{ false: theme.colors.surface, true: theme.colors.accent }}
        thumbColor={isReal ? theme.colors.primary : theme.colors.textMuted}
      />
    </View>
  </ScreenContainer>
);

}
const styles = StyleSheet.create({
  date: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.xxl,
    color: theme.colors.blushPetal,
    marginTop: theme.spacing.lg,
    textAlign: 'center',
    textShadowColor: theme.shadow.pinkGlow,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10
  },
  sectionTitle: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.lg,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.xs,
    alignContent:'stretch'
  },
  content: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.lg,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
    
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  keywordBadge: {
    backgroundColor: theme.colors.galaxyIndigo,
    color: theme.colors.textLight,
    borderRadius: theme.radius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    fontSize: theme.font.size.sm,
    fontFamily: theme.font.body,
  },
  interpretation: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.moonLilac,
    fontStyle: 'italic',
    marginBottom: theme.spacing.xs,
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
  switchContainer: {
    marginTop: theme.spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.textLight,
  },
  error: {
    fontFamily: theme.font.body,
    fontSize: theme.font.size.md,
    color: theme.colors.error,
    textAlign: 'center',
  },
      floatingHome: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    backgroundColor: theme.colors.galaxyIndigo,
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  floatingIcon: {
    fontSize: 28,
    color: 'white',
  },


});

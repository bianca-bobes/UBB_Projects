import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from './AppTabs';
import InterpretationScreen from '../screens/interpretation/InterpretationScreen';
import DreamDetailScreen from '../screens/dreams/DreamDetailScreen';
import DejaVuDetailScreen from '../screens/dejavus/DejaVuDetailScreen';
import LogJournalScreen from '../screens/journal/LogJournalScreen';

export type AppStackParamList = {
  Tabs: undefined;
  Interpretation: { dreamId: string; dreamText: string };
  DreamDetail: { dreamId: string };
  DejaVuDetail: { dejaVuId: string };
  LogJournal: { selectedDate: string }; 
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={AppTabs} />
      <Stack.Screen name="Interpretation" component={InterpretationScreen} />
      <Stack.Screen name="DreamDetail" component={DreamDetailScreen} />
      <Stack.Screen name="DejaVuDetail" component={DejaVuDetailScreen} />
      <Stack.Screen name="LogJournal" component={LogJournalScreen} /> 
    </Stack.Navigator>
  );
}

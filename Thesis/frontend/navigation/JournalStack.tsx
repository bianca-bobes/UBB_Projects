// navigation/JournalStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JournalsScreen from '../screens/journal/JournalsScreen';
import LogJournalScreen from '../screens/journal/LogJournalScreen';

const Stack = createNativeStackNavigator();

export default function JournalStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="JournalsScreen" component={JournalsScreen} />
      <Stack.Screen name="LogJournalScreen" component={LogJournalScreen} />
    </Stack.Navigator>
  );
}

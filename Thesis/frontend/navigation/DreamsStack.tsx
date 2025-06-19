// navigation/DreamsStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DreamsScreen from '../screens/dreams/DreamsScreen';
import DreamDetailScreen from '../screens/dreams/DreamDetailScreen';
import EditDreamScreen from '../screens/dreams/EditDreamScreen';
import InterpretationScreen from '../screens/interpretation/InterpretationScreen';

const Stack = createNativeStackNavigator();

export default function DreamsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DreamsList" component={DreamsScreen} />
      <Stack.Screen name="DreamDetail" component={DreamDetailScreen} />
      <Stack.Screen name="EditDream" component={EditDreamScreen} />
      <Stack.Screen name="Interpretation" component={InterpretationScreen} />
    </Stack.Navigator>
  );
}

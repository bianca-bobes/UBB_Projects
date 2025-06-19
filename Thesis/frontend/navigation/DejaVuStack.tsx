// navigation/DreamsStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DejaVusScreen from '../screens/dejavus/DejaVusScreen';
import DejaVuDetailScreen from '../screens/dejavus/DejaVuDetailScreen';
import EditDejaVuScreen from '../screens/dejavus/EditDejaVuScreen';

const Stack = createNativeStackNavigator();

export default function DejaVusStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DejaVusScreen" component={DejaVusScreen} />
      <Stack.Screen name="DejaVuDetail" component={DejaVuDetailScreen} />
      <Stack.Screen name="EditDejaVu" component={EditDejaVuScreen} />
    </Stack.Navigator>
  );
}

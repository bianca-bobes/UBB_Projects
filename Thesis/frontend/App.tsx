import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import RootNavigator from './navigation/RootNavigator';
import { AuthProvider } from './contexts/AuthContext';
import useCustomFonts from './hooks/useFonts';
import { SnackbarProvider } from './contexts/SnackbarContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) return <View><Text>Loading fonts...</Text></View>;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthProvider>
      <SnackbarProvider>
        <RootNavigator />
        <StatusBar style="light" />
      </SnackbarProvider>
    </AuthProvider>
    </GestureHandlerRootView>
  );
}

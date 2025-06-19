import { useFonts } from 'expo-font';

export default function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    'CormorantGaramond-Regular': require('../assets/fonts/CormorantGaramond-Regular.ttf'),
    'CormorantGaramond-SemiBold': require('../assets/fonts/CormorantGaramond-SemiBold.ttf'),
    'CormorantGaramond-LightItalic': require('../assets/fonts/CormorantGaramond-LightItalic.ttf'),
    'BonheurRoyale-Regular': require('../assets/fonts/BonheurRoyale-Regular.ttf'),
  });

  return fontsLoaded;
}

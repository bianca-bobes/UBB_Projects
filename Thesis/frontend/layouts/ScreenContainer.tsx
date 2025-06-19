import {
    View,
    ImageBackground,
    ScrollView,
    Text,
    KeyboardAvoidingView,
    Platform,
  } from 'react-native';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { ReactNode } from 'react';
  import mainBg from '../assets/images/main_bg.png';
  import welcomeBg from '../assets/images/welcome_bg.png';
  import { screenContainerStyles as styles } from './ScreenContainer.styles';
  import StarsBackground from '../components/common/StarsBackground';
  
  type Variant = 'main' | 'welcome';
  
  interface Props {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    scrollable?: boolean;
    variant?: Variant;
  }
  
  export default function ScreenContainer({
    children,
    title,
    subtitle,
    scrollable = true,
    variant = 'main',
  }: Props) {
    const bg = variant === 'welcome' ? welcomeBg : mainBg;
    const Content = scrollable ? ScrollView : View;
  
    return (
      <ImageBackground source={bg} style={styles.background}>
        <StarsBackground />
        <SafeAreaView style={styles.wrapper}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            style={styles.keyboardWrapper}
          >
            <View style={styles.container}>
              {title && <Text style={variant === 'welcome' ? styles.welcomeTitle : styles.title}>{title}</Text>}
              {subtitle && (
                <Text style={variant === 'welcome' ? styles.welcomeSubtitle : styles.subtitle}>
                  {subtitle}
                </Text>
              )}
              <Content contentContainerStyle={styles.content}>{children}</Content>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
  
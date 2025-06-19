import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

type SnackbarContextType = {
  showMessage: (message: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showMessage = (msg: string) => {
    setMessage(msg);
    setVisible(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        setMessage('');
      });
    }, 1000); // show for 2 seconds
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      {visible && (
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <Text style={styles.text}>{message}</Text>
        </Animated.View>
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error('useSnackbar must be used within a SnackbarProvider');
  return context;
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 10, 35, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
    paddingHorizontal: theme.spacing.lg,
  },
  text: {
    fontFamily: theme.font.header,
    fontSize: theme.font.size.lg,
    color: theme.colors.textLight,
    textAlign: 'center',
    textShadowColor: theme.shadow.pinkGlow,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

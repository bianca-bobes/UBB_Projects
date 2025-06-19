// components/common/StarsBackground.tsx
import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

const { width: W, height: H } = Dimensions.get('window');

const NUM_STATIC_STARS   = 120; 

/* ────────────────────────────────────────────────────────── *
 *                      Static twinkles                       *
 * ────────────────────────────────────────────────────────── */
function StaticStar() {
  const opacity = useRef(new Animated.Value(Math.random())).current;

  useEffect(() => {
    const twinkle = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: Math.random() * 0.8 + 0.2,
          duration: 1200 + Math.random() * 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.delay(400 + Math.random() * 600),
      ]).start(twinkle);
    };
    twinkle();
  }, [opacity]);

  const size = Math.random() * 1.4 + 0.8;
  const left = Math.random() * W;
  const top  = Math.random() * H;

  return (
    <Animated.View
      style={[
        styles.star,
        {
          width:  size,
          height: size,
          borderRadius: size / 2,
          opacity,
          left,
          top,
        },
      ]}
    />
  );
}

/* ────────────────────────────────────────────────────────── *
 *                      Shooting stars                        *
 * ────────────────────────────────────────────────────────── */

/* ────────────────────────────────────────────────────────── *
 *                    Composite background                    *
 * ────────────────────────────────────────────────────────── */
export default function StarsBackground({ style }: { style?: any }) {
  return (
    <View pointerEvents="none" style={[styles.wrapper, style]}>
      {/* static dots */}
      {Array.from({ length: NUM_STATIC_STARS }).map((_, i) => (
        <StaticStar key={`static-${i}`} />
      ))}

      
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: W,
    height: H,
  },
  star: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
  },
  shootingStar: {
    position: 'absolute',
    width: 120,
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
});

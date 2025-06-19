export const theme = {
  colors: {
    // Core Theme
    primary: '#a485ff',       // lavender-violet
    secondary: '#f6d6ff',     // pink mist
    background: '#120a23',    // deep space
    surface: '#1e1033',       // cosmic purple
    accent: '#e8d6ff',        // soft ethereal pink
    error: '#ff6e7f',         // dreamy coral

    // Text
    textLight: '#ffffff',
    textMuted: '#c9b8e4',

    // Ethereal Accents ✨
    gold: '#f3e9c6',          // celestial gold
    silver: '#c0c0c0',        // moonbeam silver
    shimmer: '#e4e9f2',       // stardust glow

    // Extra Ethereal Tints
    mistBlue: '#b8d0ff',      // morning mist
    moonLilac: '#d2c2ff',     // moonlight lilac
    //warmviolet
    warmViolet: '#582e72',    // warm violet
    nebulaRose: '#ffcce8',    // pastel rose
    starlight: '#f9f7ff',     // faint galaxy white
    warmLilac:'#a06ec4',
    galaxyIndigo: '#4b3f72',  // deep nebula tone
    auroraGreen: '#c5ffd6',   // pale aurora

    // Soft Pinks 💗
    blushPetal: '#f9d0e5',
    dreamyPink: '#fcd6ec',
    roseQuartz: '#eac4d5',
    star:'#ffffffcc',
    warmPinkviolet: '#805C9D',
    warmGalaxyIndigo: '#300047', // warm galaxy indigo
    boderwarmPinkviolet: '#5e1a80', // border warm pink violet
  },

  spacing: {
    xxxs: 2,
    xxs: 4,
    xs: 6,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },

  radius: {
    sm: 8,
    md: 16,
    lg: 24,
    pill: 999,
  },

  font: {
    header: 'CormorantGaramond-SemiBold',
    body: 'CormorantGaramond-Regular',
    quote: 'CormorantGaramond-LightItalic',
    accent: 'BonheurRoyale-Regular',
    size: {
      xxxs: 10,
      xxs: 11,
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 28,
      xxl: 36,
    },
  },

  shadow: {
    default: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    softGlow: '0 0 12px rgba(228, 233, 242, 0.3)',
    accentGlow: '0 0 8px rgba(164, 133, 255, 0.6)',
    pinkGlow: '0 0 8px rgba(240, 170, 211, 0.4)',
  },
};

export const cardThemes = {
  dream: {
    backgroundColor: theme.colors.warmGalaxyIndigo, // soft surface w/ transparency
    borderColor: theme.colors.surface,         // soft pink glow
    textColor: theme.colors.textLight,
    shadow: theme.shadow.accentGlow,
  },
  journal: {
    backgroundColor: theme.colors.warmPinkviolet, // transparent white haze
    borderColor: theme.colors.galaxyIndigo,              // gentle gold glow
    textColor: theme.colors.shimmer,             // stardust glow
    shadow: theme.shadow.softGlow,
  },
  dejavu: {
    backgroundColor: theme.colors.warmViolet,  // galaxy indigo w/ blur
    borderColor: theme.colors.boderwarmPinkviolet,         // morning mist border
    textColor: theme.colors.textMuted,          // dreamy muted white
    shadow: theme.shadow.default,
  },
};

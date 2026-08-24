export const COLORS = {
  primary: '#D6293C',       // Rojo de marca, un tono más profundo y menos "neón"
  primaryDark: '#A81F2C',
  primarySoft: '#FBEAEC',   // Tinte muy claro para fondos/insignias suaves
  ink: '#15161E',           // Negro cálido — reemplaza al azul marino como color "fuerte"
  inkLight: '#2A2C3A',
  secondary: '#2B3A55',     // Azul pizarra, ahora un acento puntual, no un fondo completo
  secondaryLight: '#44557A',
  accent: '#C9A227',
  background: '#FAF9F6',    // Blanco cálido, más elegante que el gris frío anterior
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#181924',
  textLight: '#6C7280',
  textMuted: '#9CA0AC',
  border: '#ECE9E2',
  divider: '#F2F0EA',
  danger: '#DC2626',
  success: '#16A34A',
  warning: '#D97706',
};

// Tipografía: Plus Jakarta Sans para títulos (personalidad, geometría),
// Inter para texto de cuerpo y UI (alta legibilidad). Se cargan como Google
// Fonts en app/_layout.tsx vía @expo-google-fonts.
export const FONTS = {
  display: 'PlusJakartaSans_800ExtraBold',
  displayBold: 'PlusJakartaSans_700Bold',
  displaySemi: 'PlusJakartaSans_600SemiBold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemi: 'Inter_600SemiBold',
};

// Tokens compartidos de diseño: radios, sombras y espaciados consistentes
export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  pill: 999,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const SHADOW = {
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  floating: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
} as const;

// Depósito de Full Advance: Av. Sarmiento 4777, Las Paredes, San Rafael, Mendoza
// (coordenadas tomadas del pin de Google Maps compartido por el cliente)
export const UBICACION_FULL_ADVANCE = {
  latitude: -34.6054366,
  longitude: -68.3917533,
  direccion: 'Av. Sarmiento 4777, Las Paredes, San Rafael, Mendoza',
};

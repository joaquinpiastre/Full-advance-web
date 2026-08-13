export const COLORS = {
  primary: '#E31E24',       // Rojo Bimbo
  primaryDark: '#B0151A',
  secondary: '#003087',     // Azul Bimbo
  secondaryLight: '#1E4FA0',
  accent: '#F57C00',
  background: '#F4F6F9',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#111827',
  textLight: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',
  divider: '#EEF1F5',
  danger: '#DC2626',
  success: '#16A34A',
  warning: '#D97706',
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

// Depósito de Full Advance: Sarmiento 4777, Las Paredes, San Rafael, Mendoza
// (geocodificado vía OpenStreetMap Nominatim sobre Av. Sarmiento, Capitán Montoya, Distrito Las Paredes)
export const UBICACION_FULL_ADVANCE = {
  latitude: -34.5856,
  longitude: -68.4499,
  direccion: 'Sarmiento 4777, Las Paredes, San Rafael, Mendoza',
};

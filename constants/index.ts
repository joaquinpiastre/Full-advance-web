// Paleta: sale del propio logo de Full Advance (rojo, cobre y gris acero) sobre
// neutros cálidos tipo papel/cartón, que es el material del rubro.
export const COLORS = {
  primary: '#BE1E25',       // Rojo del logo
  primaryDark: '#96141B',
  primarySoft: '#FAE8E5',   // Tinte claro para fondos e insignias
  cobre: '#8F5B45',         // Marrón cobre del logo: acento secundario
  kraft: '#D8B78F',         // Cartón: detalles y líneas sobre fondos oscuros
  kraftSoft: '#F1E6D7',
  ink: '#1D1614',           // Negro cálido para títulos y texto
  inkLight: '#33241D',
  espresso: '#221814',      // Fondo de las secciones oscuras
  secondary: '#5E5F60',     // Gris acero del logo
  secondaryLight: '#8A8B8C',
  accent: '#D8B78F',
  background: '#F8F4EE',    // Papel
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#1D1614',
  textLight: '#5E544E',
  textMuted: '#8F847D',
  border: '#E8E0D6',
  divider: '#F0EAE1',
  danger: '#DC2626',
  success: '#16A34A',
  warning: '#D97706',
};

// Tipografía: Archivo (Omnibus-Type, Buenos Aires) en toda la página. ExtraBold para
// títulos —con itálica para los énfasis—, Archivo Narrow en mayúsculas para rótulos
// y Archivo regular para el texto. Se cargan en app/_layout.tsx.
export const FONTS = {
  display: 'Archivo_800ExtraBold',
  displayItalic: 'Archivo_800ExtraBold_Italic',
  displayBold: 'Archivo_800ExtraBold',
  displaySemi: 'Archivo_600SemiBold',
  label: 'ArchivoNarrow_600SemiBold',
  body: 'Archivo_400Regular',
  bodyMedium: 'Archivo_500Medium',
  bodySemi: 'Archivo_600SemiBold',
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 26,
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
    boxShadow: '0 1px 2px rgba(29, 22, 20, 0.04), 0 10px 28px rgba(29, 22, 20, 0.06)',
  },
  floating: {
    boxShadow: '0 2px 6px rgba(29, 22, 20, 0.06), 0 22px 54px rgba(29, 22, 20, 0.16)',
  },
} as const;

// Ancho máximo del contenido y cortes de diseño
export const MAX_WIDTH = 1200;
export const BREAKPOINTS = { tablet: 720, desktop: 1024 };

// Depósito de Full Advance: Av. Sarmiento 4777, Las Paredes, San Rafael, Mendoza
// (coordenadas tomadas del pin de Google Maps compartido por el cliente)
export const UBICACION_FULL_ADVANCE = {
  latitude: -34.6054366,
  longitude: -68.3917533,
  direccion: 'Av. Sarmiento 4777, Las Paredes, San Rafael, Mendoza',
};

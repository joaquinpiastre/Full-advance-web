// Paleta: el rojo y el gris acero del logo de Full Advance sobre blancos y grises
// neutros. Sin marrones ni cremas: el color lo ponen las fotos y los packs.
export const COLORS = {
  primary: '#BE1E25',       // Rojo del logo
  primaryDark: '#96141B',
  primarySoft: '#FCE9EA',   // Tinte claro para fondos e insignias
  rojoClaro: '#FF5A5F',     // El rojo, aclarado para que se lea sobre fondos oscuros
  ink: '#15171A',           // Negro neutro para títulos y texto
  inkLight: '#2C3036',
  carbon: '#0F1113',        // Fondo de las secciones oscuras
  secondary: '#5E5F60',     // Gris acero del logo
  secondaryLight: '#8A8B8C',
  verde: '#1B7A43',         // Sello “Sin gluten”
  verdeSoft: '#E5F4EA',
  background: '#F4F5F7',    // Gris muy claro
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#15171A',
  textLight: '#565B63',
  textMuted: '#7D838C',
  border: '#E3E6EA',
  borderFuerte: '#D3D8DE',
  divider: '#EEF0F3',
  danger: '#DC2626',
  success: '#16A34A',
  warning: '#D97706',
};

// Los mismos tonos en rgb, para transparencias y sombras
const INK_RGB = '21, 23, 26';
export const CARBON_RGB = '15, 17, 19';
export const tinta = (opacidad: number) => `rgba(${INK_RGB}, ${opacidad})`;

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
    boxShadow: `0 1px 2px ${tinta(0.04)}, 0 10px 28px ${tinta(0.06)}`,
  },
  floating: {
    boxShadow: `0 2px 6px ${tinta(0.06)}, 0 22px 54px ${tinta(0.16)}`,
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

// Las marcas que distribuye Full Advance: una sola fuente de datos para la portada
// y para la página de catálogos.
import { FOTOS_MARCA, type Foto } from './productos';

export type Catalogo = {
  label: string;
  /** PDF dentro de public/catalogos (termina en .pdf) o ruta de la app. */
  url: string;
  tapa: any;
  /** Formato que se muestra en la tarjeta. */
  formato: 'PDF' | 'Online';
};

export type Marca = {
  id: keyof typeof FOTOS_MARCA;
  nombre: string;
  /** Color de identidad de la marca (acentos puntuales). */
  color: string;
  logo?: any;
  /** Proporción ancho/alto del logo, para dibujarlo sin deformar. */
  logoRatio?: number;
  etiqueta?: string;
  descripcion: string;
  lineas: string[];
  fotos: Foto[];
  catalogos: Catalogo[];
};

export const MARCAS: Marca[] = [
  {
    id: 'bimbo',
    nombre: 'Bimbo',
    color: '#D5202B',
    logo: require('../assets/logos/bimbo.webp'),
    logoRatio: 1.232,
    descripcion:
      'Panes de molde, bollería, dulces y tortillas. Con las líneas Artesano, Fargo, Lactal, Rapiditas y Takis.',
    lineas: ['Pan de molde', 'Hamburguesas y panchos', 'Madalenas y budines', 'Vainillas', 'Tortillas', 'Snacks'],
    fotos: FOTOS_MARCA.bimbo,
    catalogos: [
      {
        label: 'Catálogo de productos',
        url: '/catalogos/bimbo-productos.pdf',
        tapa: require('../assets/catalogos/bimbo-productos.webp'),
        formato: 'PDF',
      },
      {
        label: 'Catálogo gastronómico',
        url: '/catalogos/bimbo-gastronomico.pdf',
        tapa: require('../assets/catalogos/bimbo-gastronomico.webp'),
        formato: 'PDF',
      },
    ],
  },
  {
    id: 'palluzzi',
    nombre: 'Palluzzi',
    color: '#E0574A',
    logo: require('../assets/logos/palluzzi.webp'),
    logoRatio: 0.992,
    etiqueta: 'Sin gluten',
    descripcion: 'Pastas frescas, panificados y dulces de tradición artesanal, todos sin gluten.',
    lineas: ['Pastas frescas', 'Panes', 'Empanadas', 'Pizzas y tapas', 'Alfajorcitos', 'Galletitas dulces'],
    fotos: FOTOS_MARCA.palluzzi,
    catalogos: [
      {
        label: 'Catálogo de productos',
        url: '/catalogos/palluzi.pdf',
        tapa: require('../assets/catalogos/palluzzi.webp'),
        formato: 'PDF',
      },
    ],
  },
  {
    id: 'angiola',
    nombre: 'Angiola',
    color: '#4A2B1D',
    logo: require('../assets/logos/angiola.webp'),
    logoRatio: 0.971,
    etiqueta: 'Sin gluten',
    descripcion: 'Alfajores, budines y galletitas sin gluten.',
    lineas: ['Alfajores', 'Budines', 'Galletitas dulces', 'Galletitas bañadas', 'Crackers'],
    fotos: FOTOS_MARCA.angiola,
    catalogos: [
      {
        label: 'Catálogo de productos',
        url: '/catalogos/angiola.pdf',
        tapa: require('../assets/catalogos/angiola.webp'),
        formato: 'PDF',
      },
    ],
  },
  {
    id: 'silvina',
    nombre: 'Silvina',
    color: '#D40F3A',
    logo: require('../assets/logos/silvina.webp'),
    logoRatio: 1.185,
    descripcion: 'Rebozadores, pan rallado y productos para cocinar desde 1972.',
    lineas: ['Pan rallado', 'Rebozador', 'Mezcla', 'Polenta', 'Sémola', 'Fécula de mandioca', 'Fainá', 'Sopa paraguaya'],
    fotos: FOTOS_MARCA.silvina,
    catalogos: [
      {
        label: 'Catálogo de productos',
        url: '/catalogo-silvina',
        tapa: require('../assets/catalogos/silvina.webp'),
        formato: 'Online',
      },
    ],
  },
  {
    id: 'rikitos',
    nombre: 'Rikitos',
    color: '#C81E3A',
    descripcion: 'Snacks y golosinas para todo momento.',
    lineas: ['Papas fritas', 'Palitos salados', 'Snacks', 'Golosinas'],
    fotos: FOTOS_MARCA.rikitos,
    catalogos: [],
  },
  {
    id: 'citric',
    nombre: 'Citric',
    color: '#E87700',
    logo: require('../assets/logos/citric.webp'),
    logoRatio: 1.342,
    descripcion: 'Jugos y bebidas cítricas para todo momento.',
    lineas: ['Jugos exprimidos', 'Bebidas cítricas'],
    fotos: FOTOS_MARCA.citric,
    catalogos: [],
  },
];

export const LOGO_FULL_ADVANCE = {
  src: require('../assets/logos/full-advance.webp'),
  ratio: 1.512,
};

export const CATALOGO_GASTRONOMICO = '/catalogos/bimbo-gastronomico.pdf';

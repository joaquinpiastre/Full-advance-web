// Registro de imágenes de producto.
//
// De dónde salen:
// - Bimbo, Palluzzi y Angiola: fotos y packs oficiales tomados de los catálogos PDF
//   de cada marca (los mismos que están en public/catalogos).
// - Silvina, Rikitos y Citric: las fotos que ya teníamos, optimizadas.
//
// Cómo agregar fotos:
// 1) Guardá el archivo en assets/products/<marca>/ (conviene .webp o .jpg de hasta
//    ~1500px de lado; los packs para la góndola, recortados al borde del producto).
// 2) Sumá una línea `require('../assets/products/<marca>/archivo.webp')` en la lista
//    que corresponda acá abajo, en el orden en que querés que aparezca.
// 3) Metro necesita rutas literales: por eso cada imagen se declara a mano y no se
//    puede leer la carpeta en tiempo de ejecución.

import type { ImageContentPosition } from 'expo-image';

export type Foto = {
  src: any;
  alt: string;
  /**
   * 'cover' llena el recuadro (fotos); 'contain' muestra el pack entero;
   * 'enmarcada' muestra la foto entera, centrada sobre un fondo liso (para fotos chicas,
   * que se verían pixeladas si se estiraran).
   */
  fit?: 'cover' | 'contain' | 'enmarcada';
  /** Punto de la foto que tiene que quedar visible al recortar (como object-position). */
  foco?: ImageContentPosition;
  /** Color de fondo del recuadro cuando la foto o el pack no lo llenan. */
  fondo?: string;
};

// Las tres fotos de la portada
export type FotoPortada = Foto & { marca: string };

export const FOTOS_HERO: Record<'principal' | 'arriba' | 'abajo', FotoPortada> = {
  principal: {
    src: require('../assets/products/bimbo/bimbo-sandwich.webp'),
    alt: 'Sándwich de jamón, queso y verduras en pan integral Bimbo',
    foco: 'center',
    marca: 'Bimbo',
  },
  arriba: {
    src: require('../assets/products/palluzi/palluzzi-pan-con-semillas.webp'),
    alt: 'Pan de molde con semillas Palluzzi, sin gluten, sobre una tabla de madera',
    foco: 'center',
    marca: 'Palluzzi',
  },
  abajo: {
    src: require('../assets/products/bimbo/bimbo-madalenas.webp'),
    alt: 'Madalenas Bimbo recién servidas',
    foco: 'bottom',
    marca: 'Bimbo',
  },
};

// Foto de la sección de clientes (catálogo gastronómico de Bimbo)
export const FOTO_GASTRONOMIA = {
  src: require('../assets/products/bimbo/bimbo-hamburguesa-clasica.webp'),
  alt: 'Hamburguesa doble con cheddar y lechuga en pan Bimbo con sésamo',
};

// Fotos de cada marca para su tarjeta (hasta tres: una grande y dos chicas)
export const FOTOS_MARCA: Record<'bimbo' | 'palluzzi' | 'angiola' | 'rikitos' | 'citric' | 'silvina', Foto[]> = {
  bimbo: [
    {
      src: require('../assets/products/bimbo/bimbo-tortillas.webp'),
      alt: 'Tacos armados con tortillas Rapiditas',
    },
    {
      src: require('../assets/products/bimbo/bimbo-tortilla-wrap.webp'),
      alt: 'Wrap de pollo y verduras armado con tortilla de trigo',
      foco: { left: '46%', top: '50%' },
    },
    {
      src: require('../assets/products/bimbo/bimbo-pancho.webp'),
      alt: 'Pancho armado en pan Bimbo',
    },
  ],
  palluzzi: [
    {
      src: require('../assets/products/palluzi/palluzzi-fideos.webp'),
      alt: 'Plato de fideos frescos Palluzzi con salsa de tomate',
    },
    {
      src: require('../assets/products/palluzi/palluzzi-empanadas.webp'),
      alt: 'Empanadas de carne Palluzzi sobre una tabla',
    },
    {
      src: require('../assets/products/palluzi/palluzzi-masas-secas.webp'),
      alt: 'Masas secas y rosquitas bañadas Palluzzi',
    },
  ],
  angiola: [
    {
      src: require('../assets/products/angiola/angiola-pack-galletitas-chips.webp'),
      alt: 'Galletitas Angiola de vainilla con chips',
      fit: 'contain',
      fondo: '#E7EFFB',
    },
    {
      src: require('../assets/products/angiola/angiola-pack-galletitas-pistacho.webp'),
      alt: 'Galletitas Angiola de pistacho bañadas',
      fit: 'contain',
      fondo: '#ECF4E3',
    },
    {
      src: require('../assets/products/angiola/angiola-alfajor-frutos-rojos.webp'),
      alt: 'Alfajor Angiola sabor frutos rojos',
      fit: 'contain',
      fondo: '#FBE9EC',
    },
  ],
  rikitos: [
    {
      src: require('../assets/products/rikitos/rikitos-papas-fritas.webp'),
      alt: 'Bolsa de papas fritas clásicas Rikitos',
      foco: { left: '50%', top: '30%' },
    },
    {
      src: require('../assets/products/rikitos/zia-carmela-sal-especiada.webp'),
      alt: 'Frascos de sal especiada Zia Carmela',
    },
    {
      src: require('../assets/products/rikitos/zia-carmela-pochoclo-dulce.webp'),
      alt: 'Bolsa de pochoclo dulce Zia Carmela',
    },
  ],
  citric: [
    {
      src: require('../assets/products/citric/citric-linea-jugos.webp'),
      alt: 'Línea de jugos Citric 100% exprimidos',
      fit: 'enmarcada',
      fondo: '#DCEBFA',
    },
  ],
  silvina: [
    {
      src: require('../assets/catalogos/silvina.webp'),
      alt: 'Rebozador, pan rallado, polenta y fainá Silvina',
      foco: 'bottom',
    },
  ],
};

// Fotos de repuesto: ya están optimizadas en assets/products/<marca>/ y todavía no se usan.
// Sirven para sumar o intercambiar en las listas de arriba:
//   bimbo:    bimbo-pack-pan-integral, bimbo-pack-artesano-hamburguesa
//   palluzzi: palluzzi-noquis, palluzzi-pan-de-molde, palluzzi-pastafrola
//   angiola:  angiola-budin-porcion, angiola-galletitas-linea, angiola-crackers-linea
// Estas otras quedaron afuera a propósito porque tienen fondo marrón (no usarlas de portada):
//   bimbo-hamburguesa-brioche, bimbo-hamburguesa-pan-de-papa, palluzzi-alfajorcitos,
//   angiola-exhibidor, angiola-budines

// Packs de la góndola de la portada. `ratio` = ancho / alto del archivo;
// `alto` = altura relativa en el estante (1 = el más alto), para que guarden escala entre sí.
export type Pack = { src: any; marca: string; nombre: string; ratio: number; alto: number };

export const GONDOLA: Pack[] = [
  { src: require('../assets/products/bimbo/bimbo-pack-pan-blanco.webp'), marca: 'Bimbo', nombre: 'Pan blanco', ratio: 0.469, alto: 1 },
  { src: require('../assets/products/silvina/silvina-pan-rallado.webp'), marca: 'Silvina', nombre: 'Pan rallado', ratio: 0.751, alto: 0.92 },
  { src: require('../assets/products/bimbo/bimbo-pack-madalenas.webp'), marca: 'Bimbo', nombre: 'Madalenas', ratio: 0.771, alto: 0.82 },
  { src: require('../assets/products/angiola/angiola-pack-galletitas-chips.webp'), marca: 'Angiola', nombre: 'Galletitas con chips', ratio: 0.898, alto: 0.8 },
  { src: require('../assets/products/bimbo/bimbo-pack-artesano.webp'), marca: 'Artesano', nombre: 'Pan de molde', ratio: 0.477, alto: 1 },
  { src: require('../assets/products/palluzi/palluzzi-pack-palmeritas.webp'), marca: 'Palluzzi', nombre: 'Palmeritas', ratio: 0.695, alto: 0.86 },
  { src: require('../assets/products/bimbo/bimbo-pack-pan-panchos.webp'), marca: 'Bimbo', nombre: 'Pan para panchos', ratio: 0.726, alto: 0.84 },
  { src: require('../assets/products/silvina/silvina-rebozador.webp'), marca: 'Silvina', nombre: 'Rebozador', ratio: 0.751, alto: 0.92 },
  { src: require('../assets/products/bimbo/bimbo-pack-fargo.webp'), marca: 'Fargo', nombre: 'Pan lacteado', ratio: 0.264, alto: 1 },
  { src: require('../assets/products/bimbo/bimbo-pack-vainillas.webp'), marca: 'Bimbo', nombre: 'Vainillas', ratio: 0.955, alto: 0.78 },
  { src: require('../assets/products/angiola/angiola-alfajor-maicena.webp'), marca: 'Angiola', nombre: 'Alfajor de maicena', ratio: 1.965, alto: 0.5 },
  { src: require('../assets/products/bimbo/bimbo-pack-rapiditas.webp'), marca: 'Rapiditas', nombre: 'Tortillas clásicas', ratio: 0.93, alto: 0.8 },
  { src: require('../assets/products/bimbo/bimbo-pack-lactal.webp'), marca: 'Lactal', nombre: 'Pan blanco', ratio: 0.366, alto: 1 },
  { src: require('../assets/products/silvina/silvina-polenta.webp'), marca: 'Silvina', nombre: 'Polenta', ratio: 0.751, alto: 0.92 },
  { src: require('../assets/products/bimbo/bimbo-pack-takis.webp'), marca: 'Takis', nombre: 'Fuego', ratio: 0.744, alto: 0.84 },
  { src: require('../assets/products/bimbo/bimbo-pack-oroweat.webp'), marca: 'Oroweat', nombre: 'Pan con semillas', ratio: 0.5, alto: 1 },
  { src: require('../assets/products/angiola/angiola-pack-galletitas-naranja.webp'), marca: 'Angiola', nombre: 'Galletitas bañadas', ratio: 1.048, alto: 0.8 },
  { src: require('../assets/products/bimbo/bimbo-pack-pan-hamburguesa.webp'), marca: 'Bimbo', nombre: 'Pan para hamburguesas', ratio: 0.587, alto: 0.9 },
  { src: require('../assets/products/silvina/silvina-faina.webp'), marca: 'Silvina', nombre: 'Fainá', ratio: 0.771, alto: 0.92 },
  { src: require('../assets/products/bimbo/bimbo-pack-tia-rosa.webp'), marca: 'Tía Rosa', nombre: 'Tortillas de trigo', ratio: 0.873, alto: 0.8 },
  { src: require('../assets/products/bimbo/bimbo-pack-salmas.webp'), marca: 'Salmas', nombre: 'Clásicas', ratio: 0.884, alto: 0.8 },
  { src: require('../assets/products/bimbo/bimbo-pack-madalenas-chocolate.webp'), marca: 'Bimbo', nombre: 'Madalenas de chocolate', ratio: 0.768, alto: 0.82 },
  { src: require('../assets/products/angiola/angiola-alfajor-chocolate.webp'), marca: 'Angiola', nombre: 'Alfajor de chocolate', ratio: 1.823, alto: 0.5 },
  { src: require('../assets/products/bimbo/bimbo-pack-grisines.webp'), marca: 'Bimbo', nombre: 'Grisines', ratio: 0.47, alto: 0.95 },
];

// Packs que asoman en el bloque de cierre (tienen fondo transparente)
export const PACKS_CIERRE = [
  { src: require('../assets/products/silvina/silvina-polenta.webp'), ratio: 0.751, alt: 'Polenta Silvina' },
  { src: require('../assets/products/angiola/angiola-pack-galletitas-chips.webp'), ratio: 0.898, alt: 'Galletitas Angiola' },
  { src: require('../assets/products/silvina/silvina-pan-rallado.webp'), ratio: 0.751, alt: 'Pan rallado Silvina' },
];

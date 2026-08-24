// Imágenes de productos por marca, para los carruseles del catálogo.
//
// Cómo agregar fotos:
// 1) Guardá los archivos en assets/products/<marca>/ (ya están creadas las carpetas
//    bimbo, palluzi, angiola, rikitos y citric).
// 2) Agregá una línea `require('../assets/products/<marca>/archivo.jpg')` dentro
//    del array correspondiente más abajo (respetando el orden en que querés que
//    aparezcan en el carrusel).
// 3) Metro necesita rutas de archivo literales, por eso no se puede armar esta
//    lista leyendo la carpeta en tiempo de ejecución: cada imagen se declara a mano.

export const IMAGENES_PRODUCTOS: Record<'bimbo' | 'palluzi' | 'angiola' | 'rikitos' | 'citric', any[]> = {
  bimbo: [require('../assets/products/bimbo/bimbo-linea-productos.png')],
  palluzi: [require('../assets/products/palluzi/palluzi-pepas-membrillo.jpg')],
  angiola: [],
  rikitos: [
    require('../assets/products/rikitos/rikitos-papas-fritas.jpg'),
    require('../assets/products/rikitos/zia-carmela-pochoclo-dulce.jpeg'),
    require('../assets/products/rikitos/zia-carmela-sal-especiada.jpeg'),
  ],
  citric: [require('../assets/products/citric/citric-linea-jugos.jpg')],
};

export type ProductoDestacado = {
  imagen: any;
  nombre: string;
  marca: string;
  color: string;
};

// Selección de fotos de producto para el carrusel grande de la portada
// ("Productos destacados"). Armalo eligiendo 1-2 imágenes copadas por marca
// una vez que estén cargadas en IMAGENES_PRODUCTOS.
export const PRODUCTOS_DESTACADOS: ProductoDestacado[] = [
  {
    imagen: require('../assets/products/bimbo/bimbo-linea-productos.png'),
    nombre: 'Línea completa de panificados',
    marca: 'Bimbo',
    color: '#E31E24',
  },
  {
    imagen: require('../assets/products/citric/citric-linea-jugos.jpg'),
    nombre: 'Jugos 100% naturales',
    marca: 'Citric',
    color: '#0D9488',
  },
  {
    imagen: require('../assets/products/palluzi/palluzi-pepas-membrillo.jpg'),
    nombre: 'Pepas de membrillo sin gluten',
    marca: 'Palluzi',
    color: '#7C2D12',
  },
  {
    imagen: require('../assets/products/rikitos/rikitos-papas-fritas.jpg'),
    nombre: 'Papas fritas clásicas',
    marca: 'Rikitos',
    color: '#7C3AED',
  },
  {
    imagen: require('../assets/products/rikitos/zia-carmela-sal-especiada.jpeg'),
    nombre: 'Sal especiada Zia Carmela',
    marca: 'Rikitos',
    color: '#7C3AED',
  },
];

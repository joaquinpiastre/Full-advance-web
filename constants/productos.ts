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
  bimbo: [],
  palluzi: [],
  angiola: [],
  rikitos: [],
  citric: [],
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
export const PRODUCTOS_DESTACADOS: ProductoDestacado[] = [];

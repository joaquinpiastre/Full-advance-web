// Imágenes de productos por marca, para las tarjetas del catálogo.
//
// Cómo agregar fotos:
// 1) Guardá los archivos en assets/products/<marca>/ (ya están creadas las carpetas
//    bimbo, palluzi, angiola, rikitos, citric y silvina).
// 2) Agregá una línea `require('../assets/products/<marca>/archivo.jpg')` dentro
//    del array correspondiente más abajo (respetando el orden en que querés que
//    aparezcan).
// 3) Metro necesita rutas de archivo literales, por eso no se puede armar esta
//    lista leyendo la carpeta en tiempo de ejecución: cada imagen se declara a mano.

export const IMAGENES_PRODUCTOS: Record<'bimbo' | 'palluzi' | 'angiola' | 'rikitos' | 'citric' | 'silvina', any[]> = {
  bimbo: [require('../assets/products/bimbo/bimbo-linea-productos.png')],
  palluzi: [require('../assets/products/palluzi/palluzi-palmeritas.jpg')],
  angiola: [require('../assets/products/angiola/angiola-alfajores.png')],
  rikitos: [
    require('../assets/products/rikitos/rikitos-papas-fritas.jpg'),
    require('../assets/products/rikitos/zia-carmela-sal-especiada.jpeg'),
  ],
  citric: [require('../assets/products/citric/citric-linea-jugos.jpg')],
  silvina: [
    require('../assets/products/silvina/silvina-pan-rallado.png'),
    require('../assets/products/silvina/silvina-rebozador.png'),
    require('../assets/products/silvina/silvina-rebozador-total.png'),
    require('../assets/products/silvina/silvina-horno-rebozador.png'),
    require('../assets/products/silvina/silvina-mezcla.png'),
    require('../assets/products/silvina/silvina-polenta.png'),
    require('../assets/products/silvina/silvina-semola.png'),
    require('../assets/products/silvina/silvina-fecula-mandioca.png'),
    require('../assets/products/silvina/silvina-faina.png'),
    require('../assets/products/silvina/silvina-faina-verdeo.png'),
    require('../assets/products/silvina/silvina-sopa-paraguaya.png'),
  ],
};

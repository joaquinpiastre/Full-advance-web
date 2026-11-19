import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, RADIUS, SHADOW } from '../constants';
import BarraSuperior from '../components/BarraSuperior';
import PieDePagina from '../components/PieDePagina';
import { Aparecer, Contenedor, Rotulo, Titulo, useDiseno, volver } from '../components/ui';

const SILVINA_TINTE = '#FBECEE';

type ProductoSilvina = {
  nombre: string;
  descripcion: string;
  presentaciones: string[];
  imagen: any;
};

const PRODUCTOS_SILVINA: ProductoSilvina[] = [
  {
    nombre: 'Pan rallado',
    descripcion: '0% grasas trans, 0% colesterol.',
    presentaciones: ['12u x 450g', '10u x 1kg', 'Bolsas 5/10/25kg'],
    imagen: require('../assets/products/silvina/silvina-pan-rallado.webp'),
  },
  {
    nombre: 'Rebozador',
    descripcion: 'Rebozador clásico para milanesas y frituras.',
    presentaciones: ['12u x 450g', '10u x 1kg', 'Bolsas 5/10/25kg'],
    imagen: require('../assets/products/silvina/silvina-rebozador.webp'),
  },
  {
    nombre: 'Rebozador Total',
    descripcion: 'Saborizado con queso, ajo y perejil, orégano y huevo.',
    presentaciones: ['12u x 400g', 'Bolsa 3kg'],
    imagen: require('../assets/products/silvina/silvina-rebozador-total.webp'),
  },
  {
    nombre: 'Horno Rebozador',
    descripcion: 'Rebozador pensado para cocción al horno.',
    presentaciones: ['12u x 400g'],
    imagen: require('../assets/products/silvina/silvina-horno-rebozador.webp'),
  },
  {
    nombre: 'Mezcla',
    descripcion: 'Mezcla de pan rallado y rebozador.',
    presentaciones: ['12u x 450g', 'Bolsas 5/25kg'],
    imagen: require('../assets/products/silvina/silvina-mezcla.webp'),
  },
  {
    nombre: 'Polenta',
    descripcion: 'Polenta de cocción rápida.',
    presentaciones: ['10u x 400g', 'Bolsa 5kg'],
    imagen: require('../assets/products/silvina/silvina-polenta.webp'),
  },
  {
    nombre: 'Sémola',
    descripcion: 'Sémola de trigo candeal.',
    presentaciones: ['10u x 400g', 'Bolsa 5kg'],
    imagen: require('../assets/products/silvina/silvina-semola.webp'),
  },
  {
    nombre: 'Fécula de mandioca',
    descripcion: 'Ideal para preparar chipá.',
    presentaciones: ['10u x 400g', '6u x 900g', 'Bolsa 5kg'],
    imagen: require('../assets/products/silvina/silvina-fecula-mandioca.webp'),
  },
  {
    nombre: 'Fainá',
    descripcion: 'Preparado tradicional de fainá.',
    presentaciones: ['12u x 250g', 'Bolsa 5kg'],
    imagen: require('../assets/products/silvina/silvina-faina.webp'),
  },
  {
    nombre: 'Fainá con verdeo',
    descripcion: 'Preparado de fainá con verdeo.',
    presentaciones: ['12u x 250g'],
    imagen: require('../assets/products/silvina/silvina-faina-verdeo.webp'),
  },
  {
    nombre: 'Sopa paraguaya',
    descripcion: 'Preparado tradicional de sopa paraguaya.',
    presentaciones: ['10u x 400g', '8u x 900g', 'Bolsa 5kg'],
    imagen: require('../assets/products/silvina/silvina-sopa-paraguaya.webp'),
  },
];

function enFilas<T>(items: T[], columnas: number): (T | null)[][] {
  const filas: (T | null)[][] = [];
  for (let i = 0; i < items.length; i += columnas) {
    const fila: (T | null)[] = items.slice(i, i + columnas);
    while (fila.length < columnas) fila.push(null);
    filas.push(fila);
  }
  return filas;
}

export default function CatalogoSilvina() {
  const { esEscritorio, esTablet } = useDiseno();
  const { top } = useSafeAreaInsets();
  const columnas = esEscritorio ? 4 : esTablet ? 3 : 2;
  const separacion = esEscritorio ? 22 : esTablet ? 18 : 12;

  return (
    <View style={styles.raiz}>
      <BarraSuperior volver={{ label: 'Catálogos', onPress: volver }} />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <Contenedor style={{ paddingTop: top + (esTablet ? 144 : 108), paddingBottom: esTablet ? 96 : 64 }}>
          <Aparecer style={[styles.encabezado, esTablet && styles.encabezadoFila]}>
            <View style={styles.logoCaja}>
              <Image
                source={require('../assets/logos/silvina.webp')}
                alt="Logo de Silvina"
                contentFit="contain"
                style={{ width: esTablet ? 118 : 88, height: esTablet ? 100 : 74 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Rotulo>Catálogo de productos</Rotulo>
              <Titulo nivel={1} tamano={2} style={{ marginTop: 14 }}>
                Silvina
              </Titulo>
              <Text style={styles.bajada}>
                Rebozadores, pan rallado y productos para cocinar desde 1972. Distribuido por Araujo S.R.L.
              </Text>
            </View>
          </Aparecer>

          <View style={{ gap: separacion, marginTop: esTablet ? 52 : 32 }}>
            {enFilas(PRODUCTOS_SILVINA, columnas).map((fila, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: separacion }}>
                {fila.map((p, j) =>
                  p ? (
                    <Aparecer key={p.nombre} demora={j * 70} style={{ flex: 1 }}>
                      <View style={styles.tarjeta}>
                        <View style={styles.marco}>
                          <Image
                            source={p.imagen}
                            alt={`Silvina ${p.nombre}`}
                            contentFit="contain"
                            transition={200}
                            style={styles.pack}
                          />
                        </View>
                        <View style={[styles.cuerpo, !esTablet && { padding: 10, paddingTop: 12 }]}>
                          <Text style={[styles.nombre, !esTablet && { fontSize: 17, lineHeight: 21 }]}>{p.nombre}</Text>
                          <Text style={styles.descripcion}>{p.descripcion}</Text>
                          <View style={styles.presentaciones}>
                            {p.presentaciones.map((pr) => (
                              <View key={pr} style={styles.presentacion}>
                                <Text style={styles.presentacionTexto}>{pr}</Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    </Aparecer>
                  ) : (
                    <View key={`hueco-${j}`} style={{ flex: 1 }} />
                  ),
                )}
              </View>
            ))}
          </View>
        </Contenedor>

        <PieDePagina />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  raiz: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  encabezado: {
    gap: 20,
  },
  encabezadoFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  logoCaja: {
    alignSelf: 'flex-start',
    padding: 16,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    ...SHADOW.card,
  },
  bajada: {
    marginTop: 14,
    fontFamily: FONTS.body,
    fontSize: 17,
    lineHeight: 28,
    color: COLORS.textLight,
    maxWidth: 560,
  },
  tarjeta: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 8,
    ...SHADOW.card,
  },
  marco: {
    aspectRatio: 1,
    borderRadius: RADIUS.lg,
    backgroundColor: SILVINA_TINTE,
    overflow: 'hidden',
  },
  pack: {
    position: 'absolute',
    top: '9%',
    bottom: '7%',
    left: '8%',
    right: '8%',
  },
  cuerpo: {
    flex: 1,
    padding: 14,
    paddingTop: 16,
  },
  nombre: {
    fontFamily: FONTS.display,
    fontSize: 19.5,
    lineHeight: 24,
    letterSpacing: -0.3,
    color: COLORS.ink,
  },
  descripcion: {
    marginTop: 6,
    fontFamily: FONTS.body,
    fontSize: 14.5,
    lineHeight: 21,
    color: COLORS.textLight,
  },
  presentaciones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 'auto',
    paddingTop: 14,
  },
  presentacion: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  presentacionTexto: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 13,
    color: COLORS.ink,
  },
});

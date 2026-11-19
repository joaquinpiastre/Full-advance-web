import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, RADIUS, SHADOW } from '../constants';
import { MARCAS, type Catalogo, type Marca } from '../constants/marcas';
import BarraSuperior from '../components/BarraSuperior';
import PieDePagina from '../components/PieDePagina';
import { Aparecer, Contenedor, Enfasis, Rotulo, Titulo, abrirCatalogo, soloWeb, useDiseno, volver } from '../components/ui';

type Entrada = { marca: Marca; catalogo: Catalogo };

// Para sumar un catálogo, agregalo en la lista `catalogos` de la marca en constants/marcas.ts:
// aparece acá solo, y la marca deja de figurar en “Próximamente”.
const DISPONIBLES: Entrada[] = MARCAS.flatMap((marca) => marca.catalogos.map((catalogo) => ({ marca, catalogo })));
const PROXIMAMENTE = MARCAS.filter((m) => m.catalogos.length === 0);

function enFilas<T>(items: T[], columnas: number): (T | null)[][] {
  const filas: (T | null)[][] = [];
  for (let i = 0; i < items.length; i += columnas) {
    const fila: (T | null)[] = items.slice(i, i + columnas);
    while (fila.length < columnas) fila.push(null);
    filas.push(fila);
  }
  return filas;
}

function TarjetaCatalogo({ marca, catalogo }: Entrada) {
  const [hover, setHover] = useState(false);
  const esPdf = catalogo.formato === 'PDF';
  return (
    <Pressable
      role="link"
      aria-label={`${marca.nombre}: ${catalogo.label}`}
      onPress={() => abrirCatalogo(catalogo.url)}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      style={({ pressed }) => [
        styles.tarjeta,
        hover && styles.tarjetaHover,
        pressed && { transform: [{ scale: 0.99 }] },
        soloWeb({ transitionProperty: 'transform, box-shadow', transitionDuration: '300ms' }),
      ]}
    >
      <View style={styles.tapa}>
        <Image
          source={catalogo.tapa}
          alt={`Tapa del ${catalogo.label.toLowerCase()} de ${marca.nombre}`}
          contentFit="cover"
          contentPosition="top"
          transition={250}
          style={[
            StyleSheet.absoluteFill,
            { transform: [{ scale: hover ? 1.04 : 1 }] },
            soloWeb({ transitionProperty: 'transform', transitionDuration: '600ms', transitionTimingFunction: 'cubic-bezier(0.2, 0.7, 0.2, 1)' }),
          ]}
        />
        <View style={styles.formato}>
          <Ionicons name={esPdf ? 'document-text-outline' : 'globe-outline'} size={13} color={COLORS.ink} />
          <Text style={styles.formatoTexto}>{catalogo.formato}</Text>
        </View>
      </View>

      <View style={styles.cuerpo}>
        <View style={{ flex: 1 }}>
          <Text style={styles.marca}>{marca.nombre}</Text>
          <Text style={styles.titulo}>{catalogo.label}</Text>
        </View>
        <View style={[styles.flecha, hover && { backgroundColor: COLORS.primary }, soloWeb({ transitionProperty: 'background-color', transitionDuration: '200ms' })]}>
          <Ionicons name={esPdf ? 'arrow-down' : 'arrow-forward'} size={19} color="#fff" />
        </View>
      </View>
    </Pressable>
  );
}

export default function Catalogos() {
  const { esEscritorio, esTablet } = useDiseno();
  const { top } = useSafeAreaInsets();
  const separacion = esEscritorio ? 24 : 18;
  const columnas = esEscritorio ? 3 : esTablet ? 2 : 1;

  // En escritorio, los dos catálogos de la primera marca van arriba, más grandes.
  const filas = esEscritorio
    ? [DISPONIBLES.slice(0, 2), ...enFilas(DISPONIBLES.slice(2), 3)]
    : enFilas(DISPONIBLES, columnas);

  return (
    <View style={styles.raiz}>
      <BarraSuperior volver={{ label: 'Inicio', onPress: volver }} />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <Contenedor style={{ paddingTop: top + (esTablet ? 144 : 108), paddingBottom: esTablet ? 96 : 64 }}>
          <Aparecer>
            <Rotulo>Catálogos</Rotulo>
            <Titulo nivel={1} tamano={2} style={{ marginTop: 16, maxWidth: 720 }}>
              Todos los productos, <Enfasis>marca por marca.</Enfasis>
            </Titulo>
            <Text style={styles.bajada}>Todo el catálogo de productos de cada marca, en un solo lugar.</Text>
          </Aparecer>

          <View style={{ gap: separacion, marginTop: esTablet ? 52 : 34 }}>
            {filas.map((fila, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: separacion }}>
                {fila.map((entrada, j) =>
                  entrada ? (
                    <Aparecer key={entrada.catalogo.url} demora={j * 100} style={{ flex: 1 }}>
                      <TarjetaCatalogo {...entrada} />
                    </Aparecer>
                  ) : (
                    <View key={`hueco-${j}`} style={{ flex: 1 }} />
                  ),
                )}
              </View>
            ))}
          </View>

          {PROXIMAMENTE.length > 0 && (
            <Aparecer style={{ marginTop: esTablet ? 72 : 48 }}>
              <Rotulo>Próximamente</Rotulo>
              <Text style={[styles.bajada, { marginTop: 10 }]}>
                Estamos preparando los catálogos de estas marcas. Mientras tanto, consultale a tu preventista.
              </Text>
              <View style={[styles.proximos, { gap: separacion }, !esTablet && { flexDirection: 'column' }]}>
                {PROXIMAMENTE.map((m) => (
                  <View key={m.id} style={[styles.proximo, esTablet && { flex: 1, maxWidth: 420 }]}>
                    <Image source={m.fotos[0].src} alt={m.fotos[0].alt} contentFit="cover" contentPosition={m.fotos[0].foco ?? 'center'} style={styles.proximoFoto} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.titulo}>{m.nombre}</Text>
                      <Text style={styles.proximoTexto}>{m.descripcion}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </Aparecer>
          )}
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
  bajada: {
    marginTop: 16,
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
  tarjetaHover: {
    transform: [{ translateY: -5 }],
    ...SHADOW.floating,
  },
  tapa: {
    aspectRatio: 1.5,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.divider,
  },
  formato: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
  },
  formatoTexto: {
    fontFamily: FONTS.label,
    fontSize: 12.5,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: COLORS.ink,
  },
  cuerpo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    paddingTop: 18,
  },
  marca: {
    fontFamily: FONTS.label,
    fontSize: 13,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: COLORS.primary,
  },
  titulo: {
    marginTop: 4,
    fontFamily: FONTS.display,
    fontSize: 21,
    lineHeight: 26,
    letterSpacing: -0.3,
    color: COLORS.ink,
  },
  flecha: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proximos: {
    flexDirection: 'row',
    marginTop: 26,
  },
  proximo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 10,
    paddingRight: 18,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  proximoFoto: {
    width: 92,
    height: 92,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.divider,
  },
  proximoTexto: {
    marginTop: 4,
    fontFamily: FONTS.body,
    fontSize: 14.5,
    lineHeight: 21,
    color: COLORS.textLight,
  },
});

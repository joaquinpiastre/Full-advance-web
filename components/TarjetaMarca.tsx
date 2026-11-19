// Tarjeta de una marca: mosaico de fotos reales, logo, líneas de producto y catálogos.
import { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../constants';
import type { Marca } from '../constants/marcas';
import type { Foto } from '../constants/productos';
import { EnlaceFlecha, Titulo, abrirCatalogo, soloWeb, useDiseno } from './ui';

const SEPARACION = 8;

function Tesela({ foto, flex, zoom }: { foto: Foto; flex: number; zoom?: boolean }) {
  const entero = foto.fit === 'contain';
  if (foto.fit === 'enmarcada') {
    return (
      <View style={[styles.tesela, { flex, backgroundColor: COLORS.espresso }]}>
        <Image source={foto.src} alt="" contentFit="cover" blurRadius={26} style={[StyleSheet.absoluteFill, { transform: [{ scale: 1.25 }], opacity: 0.85 }]} />
        <View style={styles.marcoCentro}>
          <View style={styles.marco}>
            <Image source={foto.src} alt={foto.alt} contentFit="cover" transition={250} style={StyleSheet.absoluteFill} />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={[styles.tesela, { flex, backgroundColor: foto.fondo ?? COLORS.divider }]}>
      <Image
        source={foto.src}
        alt={foto.alt}
        contentFit={entero ? 'contain' : 'cover'}
        contentPosition={foto.foco ?? 'center'}
        transition={250}
        style={[
          entero ? styles.fotoEntera : StyleSheet.absoluteFill,
          { transform: [{ scale: zoom ? 1.045 : 1 }] },
          soloWeb({ transitionProperty: 'transform', transitionDuration: '600ms', transitionTimingFunction: 'cubic-bezier(0.2, 0.7, 0.2, 1)' }),
        ]}
      />
    </View>
  );
}

export default function TarjetaMarca({ marca }: { marca: Marca }) {
  const { esTablet } = useDiseno();
  const [hover, setHover] = useState(false);
  const [a, b, c] = marca.fotos;

  const eventosHover =
    Platform.OS === 'web' ? { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) } : null;

  return (
    <View
      {...(eventosHover as object)}
      style={[
        styles.tarjeta,
        hover && styles.tarjetaHover,
        soloWeb({ transitionProperty: 'transform, box-shadow', transitionDuration: '300ms' }),
      ]}
    >
      <View style={[styles.mosaico, { aspectRatio: b ? 1.58 : 1.72 }]}>
        <Tesela foto={a} flex={b ? 1.5 : 1} zoom={hover} />
        {b && (
          <View style={{ flex: 1, gap: SEPARACION }}>
            <Tesela foto={b} flex={1} />
            {c && <Tesela foto={c} flex={1} />}
          </View>
        )}
      </View>

      <View style={[styles.cuerpo, esTablet && { padding: 24, paddingTop: 22 }]}>
        <View style={styles.cabecera}>
          <View style={{ flex: 1 }}>
            <Titulo nivel={3}>{marca.nombre}</Titulo>
            {marca.etiqueta && (
              <View style={styles.sello}>
                <Ionicons name="leaf-outline" size={12} color={COLORS.cobre} />
                <Text style={styles.selloTexto}>{marca.etiqueta}</Text>
              </View>
            )}
          </View>
          {marca.logo && (
            <Image
              source={marca.logo}
              alt={`Logo de ${marca.nombre}`}
              contentFit="contain"
              style={{ height: 50, width: Math.min(50 * (marca.logoRatio ?? 1), 76) }}
            />
          )}
        </View>

        <Text style={styles.descripcion}>{marca.descripcion}</Text>
        <Text style={styles.lineas}>{marca.lineas.join('  ·  ')}</Text>

        <View style={styles.pie}>
          {marca.catalogos.length > 0 ? (
            marca.catalogos.map((cat) => (
              <EnlaceFlecha
                key={cat.url}
                label={cat.label}
                color={COLORS.primary}
                onPress={() => abrirCatalogo(cat.url)}
              />
            ))
          ) : (
            <View style={styles.pronto}>
              <Ionicons name="time-outline" size={15} color={COLORS.textMuted} />
              <Text style={styles.prontoTexto}>Catálogo próximamente</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  mosaico: {
    flexDirection: 'row',
    gap: SEPARACION,
  },
  tesela: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  marcoCentro: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  marco: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    ...SHADOW.floating,
  },
  fotoEntera: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    bottom: 12,
  },
  cuerpo: {
    flex: 1,
    padding: 16,
    paddingTop: 18,
  },
  cabecera: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    minHeight: 50,
  },
  sello: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    marginTop: 6,
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.kraftSoft,
  },
  selloTexto: {
    fontFamily: FONTS.label,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: COLORS.cobre,
  },
  descripcion: {
    marginTop: 12,
    fontFamily: FONTS.body,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textLight,
  },
  lineas: {
    marginTop: 12,
    fontFamily: FONTS.bodyMedium,
    fontSize: 14.5,
    lineHeight: 23,
    color: COLORS.ink,
  },
  pie: {
    marginTop: 'auto',
    paddingTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 26,
    rowGap: 10,
  },
  pronto: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  prontoTexto: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 14.5,
    color: COLORS.textMuted,
  },
});

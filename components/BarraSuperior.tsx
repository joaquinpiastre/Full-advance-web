// Barra flotante de arriba. En la portada lleva los enlaces a las secciones;
// en las páginas internas, un botón para volver.
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, MAX_WIDTH, RADIUS, SHADOW, tinta } from '../constants';
import { LOGO_FULL_ADVANCE } from '../constants/marcas';
import { Boton, soloWeb, useDiseno } from './ui';

type Enlace = { label: string; onPress: () => void };

function EnlaceNav({ label, onPress }: Enlace) {
  const [hover, setHover] = useState(false);
  return (
    <Pressable
      role="link"
      onPress={onPress}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      style={[styles.enlace, hover && { backgroundColor: COLORS.divider }, soloWeb({ transitionProperty: 'background-color', transitionDuration: '160ms' })]}
    >
      <Text style={styles.enlaceTexto}>{label}</Text>
    </Pressable>
  );
}

export default function BarraSuperior({
  enlaces,
  accion,
  volver,
}: {
  enlaces?: Enlace[];
  accion?: Enlace;
  volver?: Enlace;
}) {
  const { esEscritorio, esTablet, margen } = useDiseno();
  const { top } = useSafeAreaInsets();
  const altoLogo = esTablet ? 52 : 44;

  const logo = (
    <Pressable role="link" aria-label="Full Advance, ir al inicio" onPress={() => router.replace('/')} hitSlop={6}>
      <Image
        source={LOGO_FULL_ADVANCE.src}
        alt="Full Advance"
        contentFit="contain"
        priority="high"
        style={{ height: altoLogo, width: altoLogo * LOGO_FULL_ADVANCE.ratio }}
      />
    </Pressable>
  );

  return (
    <View style={[styles.envoltorio, { top: top + (esTablet ? 16 : 10), paddingHorizontal: margen }]}>
      <View style={[styles.barra, { height: esTablet ? 74 : 64 }, soloWeb({ backdropFilter: 'saturate(160%) blur(14px)' })]}>
        {volver ? (
          <Pressable
            role="link"
            onPress={volver.onPress}
            style={({ pressed }) => [styles.volver, pressed && { opacity: 0.6 }]}
          >
            <Ionicons name="arrow-back" size={17} color={COLORS.ink} />
            <Text style={styles.volverTexto}>{volver.label}</Text>
          </Pressable>
        ) : (
          logo
        )}

        {esEscritorio && enlaces && (
          <View style={styles.enlaces}>
            {enlaces.map((e) => (
              <EnlaceNav key={e.label} {...e} />
            ))}
          </View>
        )}

        {volver ? logo : accion ? <Boton label={accion.label} onPress={accion.onPress} variante="oscuro" flecha chico /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  envoltorio: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 30,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  barra: {
    width: '100%',
    maxWidth: MAX_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: tinta(0.08),
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    ...SHADOW.card,
  },
  enlaces: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  enlace: {
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: RADIUS.pill,
  },
  enlaceTexto: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 15.5,
    color: COLORS.ink,
  },
  volver: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.divider,
  },
  volverTexto: {
    fontFamily: FONTS.bodySemi,
    fontSize: 15,
    color: COLORS.ink,
  },
});

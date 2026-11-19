// Góndola: los packs reales apoyados sobre un estante que se desliza sin parar.
// Se detiene al pasar el mouse y, si la persona pidió menos movimiento, queda
// quieta y se recorre deslizando con el dedo.
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, tinta } from '../constants';
import type { Pack } from '../constants/productos';
import { soloWeb, useDiseno, useReducirMovimiento } from './ui';

const VELOCIDAD = 36; // píxeles por segundo
const ANCHO_MINIMO = 124; // para que entre la etiqueta de los packs angostos
const ALTO_ESTANTE = 14;

function Tanda({
  packs,
  alto,
  separacion,
  oculta,
  onAncho,
}: {
  packs: Pack[];
  alto: number;
  separacion: number;
  oculta?: boolean;
  onAncho?: (ancho: number) => void;
}) {
  return (
    <View
      style={[styles.tanda, { gap: separacion, paddingRight: separacion }]}
      onLayout={onAncho ? (e) => onAncho(e.nativeEvent.layout.width) : undefined}
      aria-hidden={oculta}
      importantForAccessibility={oculta ? 'no-hide-descendants' : 'auto'}
    >
      {packs.map((p, i) => {
        const h = alto * p.alto;
        const w = h * p.ratio;
        return (
          <View key={i} style={{ width: Math.max(w, ANCHO_MINIMO), alignItems: 'center' }}>
            <View style={{ height: alto, justifyContent: 'flex-end' }}>
              <Image
                source={p.src}
                alt={oculta ? '' : `${p.marca} ${p.nombre}`}
                style={{ width: w, height: h }}
                contentFit="contain"
              />
            </View>
            <View style={styles.etiqueta}>
              <Text style={styles.etiquetaMarca} numberOfLines={1}>
                {p.marca}
              </Text>
              <Text style={styles.etiquetaNombre} numberOfLines={2}>
                {p.nombre}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default function Gondola({ packs }: { packs: Pack[] }) {
  const { esEscritorio, esTablet } = useDiseno();
  const reducir = useReducirMovimiento();
  const x = useRef(new Animated.Value(0)).current;
  const posicion = useRef(0);
  const [ancho, setAncho] = useState(0);
  const [pausado, setPausado] = useState(false);

  const alto = esEscritorio ? 172 : esTablet ? 152 : 128;
  const separacion = esEscritorio ? 30 : 18;

  useEffect(() => {
    if (!ancho || reducir || pausado) return;
    let activo = true;
    const correr = (desde: number) => {
      x.setValue(desde);
      Animated.timing(x, {
        toValue: -ancho,
        duration: ((ancho + desde) / VELOCIDAD) * 1000,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
      }).start(({ finished }) => {
        if (finished && activo) correr(0);
      });
    };
    correr(posicion.current);
    return () => {
      activo = false;
      x.stopAnimation((valor) => {
        posicion.current = valor <= -ancho ? 0 : valor;
      });
    };
  }, [ancho, reducir, pausado, x]);

  const estante = <View style={[styles.estante, { top: alto }]} />;

  if (reducir) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.fila}>
        {estante}
        <View style={{ width: separacion }} />
        <Tanda packs={packs} alto={alto} separacion={separacion} />
      </ScrollView>
    );
  }

  return (
    <Pressable
      tabIndex={-1}
      onHoverIn={() => setPausado(true)}
      onHoverOut={() => setPausado(false)}
      style={[styles.ventana, soloWeb({ cursor: 'default' })]}
    >
      <Animated.View style={[styles.fila, { transform: [{ translateX: x }] }]}>
        {estante}
        <Tanda packs={packs} alto={alto} separacion={separacion} onAncho={setAncho} />
        <Tanda packs={packs} alto={alto} separacion={separacion} oculta />
      </Animated.View>
      <LinearGradient
        colors={['#FFFFFF', 'rgba(255,255,255,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.borde, { left: 0, width: esTablet ? 96 : 28 }]}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0)', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.borde, { right: 0, width: esTablet ? 96 : 28 }]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ventana: {
    overflow: 'hidden',
  },
  fila: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  tanda: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  estante: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: ALTO_ESTANTE,
    backgroundColor: COLORS.divider,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderFuerte,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    boxShadow: `0 8px 16px ${tinta(0.07)}`,
    pointerEvents: 'none',
  },
  etiqueta: {
    marginTop: ALTO_ESTANTE + 12,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  etiquetaMarca: {
    fontFamily: FONTS.label,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: COLORS.primary,
  },
  etiquetaNombre: {
    marginTop: 2,
    fontFamily: FONTS.bodyMedium,
    fontSize: 13.5,
    lineHeight: 18,
    color: COLORS.ink,
    textAlign: 'center',
  },
  borde: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
});

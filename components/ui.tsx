// Piezas de interfaz compartidas por todas las páginas.
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BREAKPOINTS, COLORS, FONTS, MAX_WIDTH, RADIUS, tinta } from '../constants';

export type Icono = keyof typeof Ionicons.glyphMap;

/** Estilos que solo existen en web (transiciones, blur, cursor). En nativo no aplican nada. */
export const soloWeb = (estilos: Record<string, unknown>): any => (Platform.OS === 'web' ? estilos : null);

export function useDiseno() {
  const { width, height } = useWindowDimensions();
  const esEscritorio = width >= BREAKPOINTS.desktop;
  const esTablet = width >= BREAKPOINTS.tablet;
  const margen = esEscritorio ? 40 : esTablet ? 32 : 20;
  return { width, height, esEscritorio, esTablet, margen };
}

/** true si la persona pidió menos movimiento en su sistema. */
export function useReducirMovimiento() {
  const [reducir, setReducir] = useState(
    () =>
      Platform.OS === 'web' &&
      typeof window !== 'undefined' &&
      !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    let vivo = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((v) => vivo && setReducir(v))
      .catch(() => {});
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReducir);
    return () => {
      vivo = false;
      sub.remove();
    };
  }, []);
  return reducir;
}

/** Centra el contenido y le da el margen lateral de la página. */
export function Contenedor({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const { margen } = useDiseno();
  return (
    <View style={[{ width: '100%', maxWidth: MAX_WIDTH + margen * 2, alignSelf: 'center', paddingHorizontal: margen }, style]}>
      {children}
    </View>
  );
}

/** Rótulo en mayúsculas angostas que encabeza cada sección. */
export function Rotulo({ children, claro, style }: { children: ReactNode; claro?: boolean; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.rotulo, style]}>
      <View style={[styles.rotuloMarca, claro && { backgroundColor: COLORS.rojoClaro }]} />
      <Text style={[styles.rotuloTexto, claro && { color: COLORS.rojoClaro }]}>{children}</Text>
    </View>
  );
}

const TAMANOS_TITULO = {
  1: { escritorio: [72, 74, -2.4], tablet: [54, 57, -1.6], movil: [40, 43, -1.1] },
  2: { escritorio: [46, 50, -1.3], tablet: [38, 42, -1], movil: [31, 35, -0.7] },
  3: { escritorio: [25, 30, -0.4], tablet: [24, 29, -0.4], movil: [22, 27, -0.3] },
} as const;

/** Título con su jerarquía real (h1/h2/h3 en web). */
export function Titulo({
  nivel = 2,
  tamano,
  children,
  claro,
  style,
}: {
  nivel?: 1 | 2 | 3;
  /** Tamaño visual, si tiene que ser distinto de la jerarquía (por defecto, el del nivel). */
  tamano?: 1 | 2 | 3;
  children: ReactNode;
  claro?: boolean;
  style?: StyleProp<TextStyle>;
}) {
  const { esEscritorio, esTablet } = useDiseno();
  const [fontSize, lineHeight, letterSpacing] =
    TAMANOS_TITULO[tamano ?? nivel][esEscritorio ? 'escritorio' : esTablet ? 'tablet' : 'movil'];
  return (
    <Text
      role="heading"
      {...({ 'aria-level': nivel } as object)}
      style={[styles.titulo, { fontSize, lineHeight, letterSpacing }, claro && { color: '#fff' }, style]}
    >
      {children}
    </Text>
  );
}

/** Parte destacada de un título: itálica y en rojo de marca. */
export function Enfasis({ children, color = COLORS.primary }: { children: ReactNode; color?: string }) {
  return <Text style={{ fontFamily: FONTS.displayItalic, color }}>{children}</Text>;
}

type Variante = 'primario' | 'oscuro' | 'blanco' | 'contorno' | 'contornoClaro';

const VARIANTES: Record<Variante, { fondo: string; fondoHover: string; texto: string; borde: string }> = {
  primario: { fondo: COLORS.primary, fondoHover: COLORS.primaryDark, texto: '#fff', borde: COLORS.primary },
  oscuro: { fondo: COLORS.ink, fondoHover: COLORS.inkLight, texto: '#fff', borde: COLORS.ink },
  blanco: { fondo: '#fff', fondoHover: COLORS.divider, texto: COLORS.ink, borde: '#fff' },
  contorno: { fondo: 'transparent', fondoHover: '#fff', texto: COLORS.ink, borde: tinta(0.22) },
  contornoClaro: { fondo: 'transparent', fondoHover: 'rgba(255,255,255,0.1)', texto: '#fff', borde: 'rgba(255,255,255,0.36)' },
};

export function Boton({
  label,
  onPress,
  variante = 'primario',
  icono,
  flecha,
  chico,
  style,
}: {
  label: string;
  onPress: () => void;
  variante?: Variante;
  icono?: Icono;
  flecha?: boolean;
  chico?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const [hover, setHover] = useState(false);
  const v = VARIANTES[variante];
  return (
    <Pressable
      role="button"
      onPress={onPress}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      style={({ pressed }) => [
        styles.boton,
        chico && styles.botonChico,
        { backgroundColor: hover ? v.fondoHover : v.fondo, borderColor: hover && variante !== 'contorno' ? v.fondoHover : v.borde },
        pressed && { transform: [{ scale: 0.97 }] },
        soloWeb({ transitionProperty: 'background-color, border-color, transform', transitionDuration: '180ms' }),
        style,
      ]}
    >
      {icono && <Ionicons name={icono} size={chico ? 16 : 18} color={v.texto} />}
      <Text style={[styles.botonTexto, chico && { fontSize: 14 }, { color: v.texto }]}>{label}</Text>
      {flecha && (
        <View style={[{ transform: [{ translateX: hover ? 4 : 0 }] }, soloWeb({ transitionProperty: 'transform', transitionDuration: '180ms' })]}>
          <Ionicons name="arrow-forward" size={chico ? 15 : 17} color={v.texto} />
        </View>
      )}
    </Pressable>
  );
}

/** Enlace de texto con flecha (“Ver catálogo →”). */
export function EnlaceFlecha({
  label,
  onPress,
  color = COLORS.ink,
  icono = 'arrow-forward',
}: {
  label: string;
  onPress: () => void;
  color?: string;
  icono?: Icono;
}) {
  const [hover, setHover] = useState(false);
  return (
    <Pressable
      role="link"
      onPress={onPress}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      hitSlop={8}
      style={({ pressed }) => [styles.enlace, pressed && { opacity: 0.6 }]}
    >
      <Text style={[styles.enlaceTexto, { color }, hover && { textDecorationLine: 'underline' }]}>{label}</Text>
      <View style={[{ transform: [{ translateX: hover ? 4 : 0 }] }, soloWeb({ transitionProperty: 'transform', transitionDuration: '180ms' })]}>
        <Ionicons name={icono} size={16} color={color} />
      </View>
    </Pressable>
  );
}

/**
 * Hace aparecer su contenido (sube y se aclara) cuando entra en pantalla.
 * Sin movimiento si la persona lo pidió así en su sistema.
 */
export function Aparecer({
  children,
  demora = 0,
  desplazamiento = 22,
  style,
}: {
  children: ReactNode;
  demora?: number;
  desplazamiento?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const reducir = useReducirMovimiento();
  const progreso = useRef(new Animated.Value(0)).current;
  const ref = useRef<View>(null);

  useEffect(() => {
    if (reducir) {
      progreso.setValue(1);
      return;
    }
    const mostrar = () =>
      Animated.timing(progreso, {
        toValue: 1,
        duration: 700,
        delay: demora,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: Platform.OS !== 'web',
      }).start();

    const nodo = ref.current as unknown as Element | null;
    if (Platform.OS !== 'web' || typeof IntersectionObserver === 'undefined' || !nodo) {
      mostrar();
      return;
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          mostrar();
          observador.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, [reducir, demora, progreso]);

  return (
    <Animated.View
      ref={ref}
      style={[
        style,
        {
          opacity: progreso,
          transform: [{ translateY: progreso.interpolate({ inputRange: [0, 1], outputRange: [desplazamiento, 0] }) }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

/** Abre un catálogo: los PDF en una pestaña nueva, las páginas propias dentro de la app. */
export function abrirCatalogo(url: string) {
  if (url.endsWith('.pdf')) Linking.openURL(url);
  else router.push(url as any);
}

/** Vuelve atrás; si se entró directo por el enlace, va al inicio. */
export function volver() {
  if (router.canGoBack()) router.back();
  else router.replace('/');
}

const styles = StyleSheet.create({
  rotulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rotuloMarca: {
    width: 22,
    height: 2,
    backgroundColor: COLORS.primary,
  },
  rotuloTexto: {
    fontFamily: FONTS.label,
    fontSize: 13.5,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: COLORS.primary,
  },
  titulo: {
    fontFamily: FONTS.display,
    color: COLORS.ink,
  },
  boton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    minHeight: 52,
    paddingHorizontal: 26,
    borderRadius: RADIUS.pill,
    borderWidth: 1.5,
  },
  botonChico: {
    minHeight: 42,
    paddingHorizontal: 18,
    gap: 7,
  },
  botonTexto: {
    fontFamily: FONTS.bodySemi,
    fontSize: 16,
    letterSpacing: -0.1,
  },
  enlace: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  enlaceTexto: {
    fontFamily: FONTS.bodySemi,
    fontSize: 15.5,
  },
});

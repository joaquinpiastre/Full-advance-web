import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CARBON_RGB, COLORS, FONTS, RADIUS, SHADOW, tinta } from '../constants';
import { CATALOGO_GASTRONOMICO, MARCAS } from '../constants/marcas';
import { FOTO_GASTRONOMIA, FOTOS_HERO, GONDOLA, PACKS_CIERRE, type FotoPortada } from '../constants/productos';
import BarraSuperior from './BarraSuperior';
import Gondola from './Gondola';
import PieDePagina from './PieDePagina';
import TarjetaMarca from './TarjetaMarca';
import UbicacionMapa from './UbicacionMapa';
import {
  Aparecer,
  Boton,
  Contenedor,
  EnlaceFlecha,
  Enfasis,
  Rotulo,
  Titulo,
  abrirCatalogo,
  useDiseno,
  type Icono,
} from './ui';

const CIFRAS = [
  { valor: '+1000', label: 'comercios visitados' },
  { valor: '6', label: 'marcas líderes en consumo masivo' },
  { valor: 'Diaria', label: 'distribución con flota propia' },
  { valor: 'Sur de Mendoza', label: 'zona de cobertura' },
];

const PROCESO: { icono: Icono; titulo: string; texto: string }[] = [
  {
    icono: 'storefront-outline',
    titulo: 'Visita comercial',
    texto: 'El preventista recorre el comercio y releva sus necesidades de stock.',
  },
  {
    icono: 'receipt-outline',
    titulo: 'Toma de pedido',
    texto: 'Se arma el pedido con el catálogo completo de nuestras marcas.',
  },
  {
    icono: 'navigate-outline',
    titulo: 'Reparto con seguimiento',
    texto: 'La flota propia entrega con seguimiento GPS en tiempo real.',
  },
  {
    icono: 'card-outline',
    titulo: 'Cobro y control',
    texto: 'Se registra el pago y todo queda historizado en el sistema.',
  },
];

const MOTIVOS: { icono: Icono; titulo: string; texto: string }[] = [
  {
    icono: 'shield-checkmark-outline',
    titulo: 'Marcas de confianza',
    texto: 'Distribuimos únicamente marcas líderes y reconocidas por los consumidores.',
  },
  {
    icono: 'flash-outline',
    titulo: 'Entrega eficiente',
    texto: 'Logística propia con rutas optimizadas para llegar a tiempo, siempre.',
  },
  {
    icono: 'people-outline',
    titulo: 'Atención cercana',
    texto: 'Preventistas y repartidores que conocen a cada comercio de la zona.',
  },
  {
    icono: 'trending-up-outline',
    titulo: 'Crecimiento constante',
    texto: 'Ampliamos día a día nuestra red de clientes en todo el sur mendocino.',
  },
  {
    icono: 'hardware-chip-outline',
    titulo: 'Tecnología propia',
    texto: 'Sistema propio con seguimiento de rutas, pedidos y pagos en tiempo real.',
  },
  {
    icono: 'cube-outline',
    titulo: 'Stock permanente',
    texto: 'Reposición constante para que el comercio nunca se quede sin producto.',
  },
];

const TIPOS_COMERCIO: { icono: Icono; label: string }[] = [
  { icono: 'storefront-outline', label: 'Kioscos' },
  { icono: 'basket-outline', label: 'Almacenes' },
  { icono: 'cart-outline', label: 'Supermercados' },
  { icono: 'bag-handle-outline', label: 'Minimarkets' },
  { icono: 'restaurant-outline', label: 'Rotiserías' },
  { icono: 'nutrition-outline', label: 'Panaderías' },
  { icono: 'file-tray-stacked-outline', label: 'Despensas' },
  { icono: 'cash-outline', label: 'Autoservicios' },
];

function enFilas<T>(items: T[], columnas: number): T[][] {
  const filas: T[][] = [];
  for (let i = 0; i < items.length; i += columnas) filas.push(items.slice(i, i + columnas));
  return filas;
}

function FotoHero({
  foto,
  flex,
  demora,
  radio,
  prioridad,
}: {
  foto: FotoPortada;
  flex: number;
  demora: number;
  radio: number;
  prioridad?: boolean;
}) {
  return (
    <Aparecer demora={demora} desplazamiento={36} style={{ flex }}>
      <View style={[styles.fotoHero, { borderRadius: radio }]}>
        <Image
          source={foto.src}
          alt={foto.alt}
          contentFit="cover"
          contentPosition={foto.foco}
          priority={prioridad ? 'high' : 'normal'}
          transition={300}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.fotoRotulo}>
          <Text style={styles.fotoRotuloTexto}>{foto.marca}</Text>
        </View>
      </View>
    </Aparecer>
  );
}

function LogosMarcas() {
  return (
    <View>
      <Text style={styles.logosTitulo}>Marcas que distribuimos</Text>
      <View style={styles.logos}>
        {MARCAS.map((m) => (
          <View key={m.id} style={styles.logoCaja}>
            {m.logo ? (
              <Image
                source={m.logo}
                alt={m.nombre}
                contentFit="contain"
                style={{ height: 44, width: Math.min(44 * (m.logoRatio ?? 1), 62) }}
              />
            ) : (
              <Text style={[styles.logoTexto, { color: m.color }]}>{m.nombre}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

export default function LandingPage() {
  const { width, esEscritorio, esTablet } = useDiseno();
  const { top } = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [posiciones, setPosiciones] = useState({ marcas: 0, proceso: 0, cobertura: 0 });

  const irA = (y: number) => scrollRef.current?.scrollTo({ y: Math.max(y - 84, 0), animated: true });
  const irACatalogos = () => router.push('/catalogos');
  const guardar = (clave: keyof typeof posiciones) => (e: { nativeEvent: { layout: { y: number } } }) => {
    const y = e.nativeEvent.layout.y;
    setPosiciones((p) => (p[clave] === y ? p : { ...p, [clave]: y }));
  };

  const espacio = esEscritorio ? 112 : esTablet ? 88 : 64;
  const separacion = esEscritorio ? 24 : 18;
  const radioFoto = esTablet ? 26 : 20;
  const altoCollage = esEscritorio ? 560 : esTablet ? 520 : Math.min(width * 1.02, 430);
  const desfase = esTablet ? 56 : 30;
  const columnasMotivos = esEscritorio ? 3 : esTablet ? 2 : 1;

  return (
    <View style={styles.raiz}>
      <BarraSuperior
        enlaces={[
          { label: 'Marcas', onPress: () => irA(posiciones.marcas) },
          { label: 'Cómo trabajamos', onPress: () => irA(posiciones.proceso) },
          { label: 'Cobertura', onPress: () => irA(posiciones.cobertura) },
        ]}
        accion={{ label: width < 360 ? 'Catálogos' : 'Ver catálogos', onPress: irACatalogos }}
      />

      <ScrollView ref={scrollRef} contentContainerStyle={styles.contenido} showsVerticalScrollIndicator={false}>
        {/* PORTADA */}
        <View style={{ paddingTop: top + (esEscritorio ? 156 : esTablet ? 132 : 108), paddingBottom: esTablet ? 72 : 48 }}>
          <Contenedor style={esEscritorio ? styles.heroFila : styles.heroColumna}>
            <View style={esEscritorio ? styles.heroTexto : null}>
              <Aparecer>
                <Rotulo>Distribuidora oficial · Sur de Mendoza</Rotulo>
              </Aparecer>
              <Aparecer demora={90}>
                <Titulo nivel={1} style={{ marginTop: esTablet ? 24 : 18 }}>
                  Las marcas más elegidas, <Enfasis>directo a tu comercio.</Enfasis>
                </Titulo>
              </Aparecer>
              <Aparecer demora={180}>
                <Text style={[styles.bajada, esTablet && styles.bajadaGrande]}>
                  Llevamos sus productos a más de 1000 comercios del sur de Mendoza, con flota propia y una
                  logística pensada para que nunca te falte mercadería.
                </Text>
              </Aparecer>
              <Aparecer demora={270} style={[styles.botones, !esTablet && styles.botonesApilados]}>
                <Boton label="Ver catálogos" onPress={irACatalogos} flecha />
                <Boton label="Conocé las marcas" onPress={() => irA(posiciones.marcas)} variante="contorno" />
              </Aparecer>
              {esEscritorio && (
                <Aparecer demora={360} style={{ marginTop: 44 }}>
                  <LogosMarcas />
                </Aparecer>
              )}
            </View>

            <View style={[styles.collage, { height: altoCollage, gap: esTablet ? 16 : 10 }, esEscritorio && { flex: 1 }]}>
              <View style={{ flex: 1.24, paddingBottom: desfase }}>
                <FotoHero foto={FOTOS_HERO.principal} flex={1} demora={220} radio={radioFoto} prioridad />
              </View>
              <View style={{ flex: 1, paddingTop: desfase, gap: esTablet ? 16 : 10 }}>
                <FotoHero foto={FOTOS_HERO.arriba} flex={1.12} demora={340} radio={radioFoto} prioridad />
                <FotoHero foto={FOTOS_HERO.abajo} flex={1} demora={460} radio={radioFoto} />
              </View>
            </View>

            {!esEscritorio && (
              <Aparecer>
                <LogosMarcas />
              </Aparecer>
            )}
          </Contenedor>
        </View>

        {/* CIFRAS */}
        <Contenedor>
          <View style={styles.cifras}>
            {CIFRAS.map((c, i) => {
              const columnas = esTablet ? 4 : 2;
              const primera = i % columnas === 0;
              return (
                <View
                  key={c.label}
                  style={[
                    styles.cifra,
                    { width: `${100 / columnas}%`, paddingVertical: esTablet ? 30 : 22 },
                    !primera && styles.cifraConBorde,
                    !primera && { paddingLeft: esTablet ? 26 : 18 },
                  ]}
                >
                  <Text style={[styles.cifraValor, !esTablet && { fontSize: 25, lineHeight: 29 }]}>{c.valor}</Text>
                  <Text style={styles.cifraLabel}>{c.label}</Text>
                </View>
              );
            })}
          </View>
        </Contenedor>

        {/* GÓNDOLA */}
        <View style={[styles.gondola, { marginTop: espacio, paddingVertical: esTablet ? 64 : 44 }]}>
          <Contenedor style={{ marginBottom: esTablet ? 40 : 28 }}>
            <Rotulo>En tu góndola</Rotulo>
            <Titulo nivel={3} style={{ marginTop: 12, maxWidth: 560 }}>
              Algunos de los productos que llevamos a tu comercio.
            </Titulo>
          </Contenedor>
          <Gondola packs={GONDOLA} />
        </View>

        {/* MARCAS */}
        <View style={{ paddingVertical: espacio }} onLayout={guardar('marcas')}>
          <Contenedor>
            <View style={[styles.encabezado, esEscritorio && styles.encabezadoFila]}>
              <Aparecer style={esEscritorio ? { flex: 1.25 } : null}>
                <Rotulo>Nuestras marcas</Rotulo>
                <Titulo style={{ marginTop: 16 }}>
                  Seis marcas líderes, <Enfasis>un solo proveedor.</Enfasis>
                </Titulo>
              </Aparecer>
              <Aparecer demora={120} style={esEscritorio ? { flex: 1, paddingBottom: 6 } : null}>
                <Text style={styles.parrafo}>
                  El catálogo completo de las marcas que distribuimos en toda la región, con sus líneas de producto
                  y los catálogos para descargar.
                </Text>
                <View style={{ marginTop: 16 }}>
                  <EnlaceFlecha label="Ver todos los catálogos" onPress={irACatalogos} color={COLORS.primary} />
                </View>
              </Aparecer>
            </View>

            <View style={{ gap: separacion, marginTop: esTablet ? 56 : 36 }}>
              {enFilas(MARCAS, esTablet ? 2 : 1).map((fila, i) => (
                <View key={i} style={[styles.fila, { gap: separacion }]}>
                  {fila.map((m, j) => (
                    <Aparecer key={m.id} demora={j * 110} style={{ flex: 1 }}>
                      <TarjetaMarca marca={m} />
                    </Aparecer>
                  ))}
                </View>
              ))}
            </View>
          </Contenedor>
        </View>

        {/* CÓMO TRABAJAMOS */}
        <View style={[styles.blanca, { paddingVertical: espacio }]} onLayout={guardar('proceso')}>
          <Contenedor>
            <Aparecer>
              <Rotulo>Cómo trabajamos</Rotulo>
              <Titulo style={{ marginTop: 16, maxWidth: 720 }}>
                Del pedido a la entrega, <Enfasis>todo bajo control.</Enfasis>
              </Titulo>
            </Aparecer>

            <View style={[{ marginTop: esTablet ? 64 : 40 }, esEscritorio && styles.fila]}>
              {PROCESO.map((p, i) => {
                const ultimo = i === PROCESO.length - 1;
                const nodo = (
                  <View style={styles.nodo}>
                    <Ionicons name={p.icono} size={22} color="#fff" />
                  </View>
                );
                const texto = (
                  <>
                    <Text style={styles.pasoNumero}>Paso {String(i + 1).padStart(2, '0')}</Text>
                    <Text style={styles.pasoTitulo}>{p.titulo}</Text>
                    <Text style={styles.pasoTexto}>{p.texto}</Text>
                  </>
                );
                return esEscritorio ? (
                  <Aparecer key={p.titulo} demora={i * 120} style={{ flex: 1 }}>
                    <View style={styles.pasoRiel}>
                      {nodo}
                      {!ultimo && <View style={styles.rielHorizontal} />}
                    </View>
                    <View style={{ paddingRight: 32, marginTop: 26 }}>{texto}</View>
                  </Aparecer>
                ) : (
                  <Aparecer key={p.titulo} demora={i * 80} style={styles.pasoVertical}>
                    <View style={{ alignItems: 'center' }}>
                      {nodo}
                      {!ultimo && <View style={styles.rielVertical} />}
                    </View>
                    <View style={{ flex: 1, paddingBottom: ultimo ? 0 : 34, paddingTop: 2 }}>{texto}</View>
                  </Aparecer>
                );
              })}
            </View>
          </Contenedor>
        </View>

        {/* A QUIÉN LE LLEGAMOS */}
        <View style={styles.oscura}>
          {esEscritorio ? (
            <View style={styles.oscuraFoto}>
              <Image source={FOTO_GASTRONOMIA.src} alt={FOTO_GASTRONOMIA.alt} contentFit="cover" style={StyleSheet.absoluteFill} />
              <LinearGradient
                colors={[COLORS.carbon, `rgba(${CARBON_RGB}, 0.55)`, `rgba(${CARBON_RGB}, 0)`]}
                locations={[0, 0.14, 0.36]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
              <LinearGradient colors={[COLORS.carbon, `rgba(${CARBON_RGB}, 0)`]} style={styles.oscuraFundidoArriba} />
            </View>
          ) : (
            <View style={{ height: esTablet ? 380 : 250 }}>
              <Image source={FOTO_GASTRONOMIA.src} alt={FOTO_GASTRONOMIA.alt} contentFit="cover" style={StyleSheet.absoluteFill} />
              <LinearGradient
                colors={[`rgba(${CARBON_RGB}, 0)`, COLORS.carbon]}
                style={styles.oscuraFundido}
              />
            </View>
          )}

          <Contenedor>
            <View style={[{ paddingTop: esEscritorio ? espacio : 28, paddingBottom: espacio }, esEscritorio && { maxWidth: 560 }]}>
              <Aparecer>
                <Rotulo claro>A quién le llegamos</Rotulo>
                <Titulo claro style={{ marginTop: 16 }}>
                  Del kiosco de barrio <Enfasis color={COLORS.rojoClaro}>al supermercado.</Enfasis>
                </Titulo>
                <Text style={[styles.parrafo, styles.parrafoClaro, { marginTop: 18 }]}>
                  Comercios de todo tipo confían en nuestra distribución.
                </Text>
              </Aparecer>

              <Aparecer demora={120} style={styles.tipos}>
                {TIPOS_COMERCIO.map((t) => (
                  <View key={t.label} style={styles.tipo}>
                    <Ionicons name={t.icono} size={19} color={COLORS.rojoClaro} />
                    <Text style={styles.tipoTexto}>{t.label}</Text>
                  </View>
                ))}
              </Aparecer>

              <Aparecer demora={200} style={{ marginTop: 34 }}>
                <Text style={styles.notaGastronomia}>
                  ¿Tenés un local de comidas? Mirá los panes de hamburguesa, panchos y tortillas de la línea
                  gastronómica de Bimbo.
                </Text>
                <Boton
                  label="Catálogo gastronómico"
                  icono="document-text-outline"
                  variante="blanco"
                  onPress={() => abrirCatalogo(CATALOGO_GASTRONOMICO)}
                  style={{ alignSelf: 'flex-start', marginTop: 18 }}
                />
              </Aparecer>
            </View>
          </Contenedor>
        </View>

        {/* POR QUÉ ELEGIRNOS */}
        <View style={{ paddingVertical: espacio }}>
          <Contenedor>
            <Aparecer>
              <Rotulo>Por qué elegirnos</Rotulo>
              <Titulo style={{ marginTop: 16, maxWidth: 760 }}>
                Compromiso, cercanía y <Enfasis>logística propia.</Enfasis>
              </Titulo>
            </Aparecer>

            <View style={{ marginTop: esTablet ? 56 : 32, gap: esTablet ? 40 : 0 }}>
              {enFilas(MOTIVOS, columnasMotivos).map((fila, i) => (
                <View key={i} style={[styles.fila, { gap: esTablet ? 40 : 0 }]}>
                  {fila.map((m, j) => (
                    <Aparecer key={m.titulo} demora={j * 100} style={[styles.motivo, !esTablet && { paddingBottom: 26 }]}>
                      <Ionicons name={m.icono} size={26} color={COLORS.primary} />
                      <Text style={styles.motivoTitulo}>{m.titulo}</Text>
                      <Text style={styles.motivoTexto}>{m.texto}</Text>
                    </Aparecer>
                  ))}
                </View>
              ))}
            </View>
          </Contenedor>
        </View>

        {/* COBERTURA */}
        <View style={[styles.blanca, { paddingVertical: espacio }]} onLayout={guardar('cobertura')}>
          <Contenedor style={esEscritorio ? [styles.fila, { gap: 64, alignItems: 'center' }] : { gap: 36 }}>
            <Aparecer style={esEscritorio ? { flex: 0.9 } : null}>
              <Rotulo>Cobertura</Rotulo>
              <Titulo style={{ marginTop: 16 }}>
                Desde San Rafael <Enfasis>a todo el sur mendocino.</Enfasis>
              </Titulo>
              <Text style={[styles.parrafo, { marginTop: 18 }]}>
                Desde nuestro depósito distribuimos en todo el sur de Mendoza, llegando cada día a más comercios
                gracias a nuestra flota propia de reparto.
              </Text>

              <View style={styles.direccion}>
                <View style={styles.direccionIcono}>
                  <Ionicons name="location" size={20} color={COLORS.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.direccionTitulo}>Av. Sarmiento 4777, Las Paredes</Text>
                  <Text style={styles.direccionTexto}>San Rafael, Mendoza</Text>
                </View>
              </View>
            </Aparecer>

            <Aparecer demora={120} style={[styles.mapa, { height: esEscritorio ? 480 : esTablet ? 420 : 320 }, esEscritorio && { flex: 1.2 }]}>
              <UbicacionMapa />
            </Aparecer>
          </Contenedor>
        </View>

        {/* CIERRE */}
        <View style={[styles.blanca, { paddingBottom: espacio }]}>
          <Contenedor>
            <Aparecer>
              <View style={[styles.cierre, { padding: esEscritorio ? 64 : esTablet ? 48 : 28, paddingBottom: esEscritorio ? 64 : 190 }]}>
                <View style={esEscritorio ? { maxWidth: 500 } : null}>
                  <Titulo claro>¿Querés ver todo lo que tenemos?</Titulo>
                  <Text style={[styles.parrafo, styles.parrafoClaro, { marginTop: 16 }]}>
                    Descubrí el catálogo completo de productos de cada una de nuestras marcas.
                  </Text>
                  <Boton
                    label="Ver catálogos"
                    variante="blanco"
                    flecha
                    onPress={irACatalogos}
                    style={{ alignSelf: 'flex-start', marginTop: 28 }}
                  />
                </View>

                <View style={[styles.cierrePacks, esEscritorio ? { right: 48 } : { left: 0, right: 0, justifyContent: 'center' }]}>
                  {PACKS_CIERRE.map((p, i) => {
                    const alto = (esEscritorio ? 268 : 190) * (i === 1 ? 0.86 : 1);
                    return (
                      <Image
                        key={i}
                        source={p.src}
                        alt={p.alt}
                        contentFit="contain"
                        style={{
                          height: alto,
                          width: alto * p.ratio,
                          marginLeft: i === 0 ? 0 : esEscritorio ? -34 : -22,
                          zIndex: i === 1 ? 2 : 1,
                          transform: [{ rotate: `${(i - 1) * 7}deg` }, { translateY: i === 1 ? 0 : 14 }],
                        }}
                      />
                    );
                  })}
                </View>
              </View>
            </Aparecer>
          </Contenedor>
        </View>

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
  contenido: {
    flexGrow: 1,
  },
  fila: {
    flexDirection: 'row',
  },
  blanca: {
    backgroundColor: COLORS.surface,
  },

  // PORTADA
  heroFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 64,
  },
  heroColumna: {
    gap: 40,
  },
  heroTexto: {
    flex: 1.08,
  },
  bajada: {
    marginTop: 20,
    fontFamily: FONTS.body,
    fontSize: 17,
    lineHeight: 27,
    color: COLORS.textLight,
    maxWidth: 540,
  },
  bajadaGrande: {
    marginTop: 26,
    fontSize: 19.5,
    lineHeight: 31,
  },
  botones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 34,
  },
  botonesApilados: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    marginTop: 28,
  },
  collage: {
    flexDirection: 'row',
  },
  fotoHero: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: COLORS.divider,
    ...SHADOW.floating,
  },
  fotoRotulo: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
  },
  fotoRotuloTexto: {
    fontFamily: FONTS.label,
    fontSize: 12.5,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: COLORS.ink,
  },
  logosTitulo: {
    fontFamily: FONTS.label,
    fontSize: 13,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: COLORS.textMuted,
    marginBottom: 12,
  },
  logos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  logoCaja: {
    height: 66,
    minWidth: 88,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  logoTexto: {
    fontFamily: FONTS.displayItalic,
    fontSize: 18,
    letterSpacing: -0.3,
  },

  // CIFRAS
  cifras: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  cifra: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingRight: 12,
  },
  cifraConBorde: {
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },
  cifraValor: {
    fontFamily: FONTS.display,
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: -0.8,
    color: COLORS.ink,
  },
  cifraLabel: {
    marginTop: 6,
    fontFamily: FONTS.body,
    fontSize: 15,
    lineHeight: 21,
    color: COLORS.textLight,
  },

  // GÓNDOLA
  gondola: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },

  // ENCABEZADOS DE SECCIÓN
  encabezado: {
    gap: 20,
  },
  encabezadoFila: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 72,
  },
  parrafo: {
    fontFamily: FONTS.body,
    fontSize: 17,
    lineHeight: 28,
    color: COLORS.textLight,
    maxWidth: 560,
  },
  parrafoClaro: {
    color: 'rgba(255, 255, 255, 0.78)',
  },

  // PROCESO
  nodo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pasoRiel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rielHorizontal: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.borderFuerte,
  },
  pasoVertical: {
    flexDirection: 'row',
    gap: 20,
  },
  rielVertical: {
    flex: 1,
    width: 2,
    backgroundColor: COLORS.borderFuerte,
  },
  pasoNumero: {
    fontFamily: FONTS.label,
    fontSize: 13,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: COLORS.primary,
  },
  pasoTitulo: {
    marginTop: 8,
    fontFamily: FONTS.display,
    fontSize: 21,
    lineHeight: 26,
    letterSpacing: -0.3,
    color: COLORS.ink,
  },
  pasoTexto: {
    marginTop: 8,
    fontFamily: FONTS.body,
    fontSize: 16,
    lineHeight: 25,
    color: COLORS.textLight,
  },

  // A QUIÉN LE LLEGAMOS
  oscura: {
    backgroundColor: COLORS.carbon,
    overflow: 'hidden',
  },
  // La foto va entera, apoyada abajo a la derecha, y se funde con el fondo por arriba y por la izquierda.
  oscuraFoto: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '62%',
    maxWidth: 1000,
    aspectRatio: 1.5,
    pointerEvents: 'none',
  },
  oscuraFundidoArriba: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '24%',
    pointerEvents: 'none',
  },
  oscuraFundido: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 130,
    pointerEvents: 'none',
  },
  tipos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.14)',
  },
  tipo: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.14)',
  },
  tipoTexto: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 17,
    color: '#fff',
  },
  notaGastronomia: {
    fontFamily: FONTS.body,
    fontSize: 15.5,
    lineHeight: 25,
    color: 'rgba(255, 255, 255, 0.7)',
    maxWidth: 460,
  },

  // MOTIVOS
  motivo: {
    flex: 1,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: tinta(0.14),
  },
  motivoTitulo: {
    marginTop: 16,
    fontFamily: FONTS.display,
    fontSize: 21,
    lineHeight: 26,
    letterSpacing: -0.3,
    color: COLORS.ink,
  },
  motivoTexto: {
    marginTop: 8,
    fontFamily: FONTS.body,
    fontSize: 16,
    lineHeight: 25,
    color: COLORS.textLight,
  },

  // COBERTURA
  direccion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 30,
    padding: 16,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    maxWidth: 440,
  },
  direccionIcono: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  direccionTitulo: {
    fontFamily: FONTS.bodySemi,
    fontSize: 16.5,
    color: COLORS.ink,
  },
  direccionTexto: {
    marginTop: 2,
    fontFamily: FONTS.body,
    fontSize: 15,
    color: COLORS.textLight,
  },
  mapa: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.divider,
  },

  // CIERRE
  cierre: {
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    overflow: 'hidden',
  },
  cierrePacks: {
    position: 'absolute',
    bottom: -44,
    flexDirection: 'row',
    alignItems: 'flex-end',
    pointerEvents: 'none',
  },
});

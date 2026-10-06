import { useRef, useState } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity,
  StyleSheet, useWindowDimensions, Platform,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, RADIUS, SHADOW } from '../constants';
import { IMAGENES_PRODUCTOS } from '../constants/productos';
import UbicacionMapa from './UbicacionMapa';

type Marca = {
  nombre: string;
  color: string;
  icono: keyof typeof Ionicons.glyphMap;
  descripcion: string;
  productos: string[];
  logo?: any;
  imagenesProducto: any[];
};

const MARCAS: Marca[] = [
  {
    nombre: 'Bimbo',
    color: '#E31E24',
    icono: 'nutrition-outline',
    descripcion: 'Pan y panificados líderes en toda Argentina.',
    productos: ['Pan lactal', 'Facturas', 'Bizcochos', 'Tostadas', 'Bollería'],
    logo: require('../assets/bimbo-logo.jpg'),
    imagenesProducto: IMAGENES_PRODUCTOS.bimbo,
  },
  {
    nombre: 'Palluzi',
    color: '#7C2D12',
    icono: 'restaurant-outline',
    descripcion: 'Pastas, panificados y productos sin gluten.',
    productos: ['Pastas rellenas', 'Panificados', 'Empanadas', 'Dulces sin gluten'],
    logo: require('../assets/palluzi-logo.jpg'),
    imagenesProducto: IMAGENES_PRODUCTOS.palluzi,
  },
  {
    nombre: 'Angiola',
    color: '#D97706',
    icono: 'ice-cream-outline',
    descripcion: 'Alfajores, budines y galletitas sin gluten.',
    productos: ['Alfajores', 'Budines', 'Galletitas dulces', 'Crackers'],
    logo: require('../assets/angiola-logo.jpg'),
    imagenesProducto: IMAGENES_PRODUCTOS.angiola,
  },
  {
    nombre: 'Rikitos',
    color: '#7C3AED',
    icono: 'fast-food-outline',
    descripcion: 'Snacks y golosinas para todo momento.',
    productos: ['Papas fritas', 'Palitos salados', 'Snacks', 'Golosinas'],
    imagenesProducto: IMAGENES_PRODUCTOS.rikitos,
  },
  {
    nombre: 'Citric',
    color: '#0D9488',
    icono: 'leaf-outline',
    descripcion: 'Jugos y bebidas cítricas para todo momento.',
    productos: ['Jugos', 'Bebidas cítricas'],
    logo: require('../assets/citric-logo.jpg'),
    imagenesProducto: IMAGENES_PRODUCTOS.citric,
  },
  {
    nombre: 'Silvina',
    color: '#C81E3A',
    icono: 'restaurant-outline',
    descripcion: 'Rebozadores, pan rallado y productos para cocinar desde 1972.',
    productos: ['Pan rallado', 'Rebozador', 'Mezcla', 'Polenta', 'Sémola', 'Fécula de mandioca', 'Fainá', 'Sopa paraguaya'],
    logo: require('../assets/silvina-logo.png'),
    imagenesProducto: IMAGENES_PRODUCTOS.silvina,
  },
];

const TRUST_BADGES = [
  { icono: 'shield-checkmark-outline' as const, label: 'Marcas oficiales' },
  { icono: 'time-outline' as const, label: 'Reparto diario' },
  { icono: 'car-sport-outline' as const, label: 'Flota propia' },
];

const ESTADISTICAS = [
  { icono: 'storefront-outline' as const, valor: '+1000', label: 'Comercios visitados' },
  { icono: 'bus-outline' as const, valor: 'Flota propia', label: 'Distribución diaria' },
  { icono: 'map-outline' as const, valor: 'Sur de Mendoza', label: 'Zona de cobertura' },
  { icono: 'pricetags-outline' as const, valor: '6 marcas', label: 'Líderes en consumo masivo' },
];

const PROCESO = [
  {
    numero: '01',
    icono: 'storefront-outline' as const,
    titulo: 'Visita comercial',
    texto: 'El preventista recorre el comercio y releva sus necesidades de stock.',
  },
  {
    numero: '02',
    icono: 'receipt-outline' as const,
    titulo: 'Toma de pedido',
    texto: 'Se arma el pedido con el catálogo completo de nuestras marcas.',
  },
  {
    numero: '03',
    icono: 'navigate-outline' as const,
    titulo: 'Reparto con seguimiento',
    texto: 'La flota propia entrega con seguimiento GPS en tiempo real.',
  },
  {
    numero: '04',
    icono: 'card-outline' as const,
    titulo: 'Cobro y control',
    texto: 'Se registra el pago y todo queda historizado en el sistema.',
  },
];

const MOTIVOS = [
  {
    icono: 'shield-checkmark-outline' as const,
    titulo: 'Marcas de confianza',
    texto: 'Distribuimos únicamente marcas líderes y reconocidas por los consumidores.',
  },
  {
    icono: 'flash-outline' as const,
    titulo: 'Entrega eficiente',
    texto: 'Logística propia con rutas optimizadas para llegar a tiempo, siempre.',
  },
  {
    icono: 'people-outline' as const,
    titulo: 'Atención cercana',
    texto: 'Preventistas y repartidores que conocen a cada comercio de la zona.',
  },
  {
    icono: 'trending-up-outline' as const,
    titulo: 'Crecimiento constante',
    texto: 'Ampliamos día a día nuestra red de clientes en todo el sur mendocino.',
  },
  {
    icono: 'hardware-chip-outline' as const,
    titulo: 'Tecnología propia',
    texto: 'Sistema propio con seguimiento de rutas, pedidos y pagos en tiempo real.',
  },
  {
    icono: 'cube-outline' as const,
    titulo: 'Stock permanente',
    texto: 'Reposición constante para que el comercio nunca se quede sin producto.',
  },
];

const TIPOS_COMERCIO = [
  { icono: 'storefront-outline' as const, label: 'Kioscos' },
  { icono: 'basket-outline' as const, label: 'Almacenes' },
  { icono: 'cart-outline' as const, label: 'Supermercados' },
  { icono: 'bag-handle-outline' as const, label: 'Minimarkets' },
  { icono: 'restaurant-outline' as const, label: 'Rotiserías' },
  { icono: 'nutrition-outline' as const, label: 'Panaderías' },
  { icono: 'file-tray-stacked-outline' as const, label: 'Despensas' },
  { icono: 'cash-outline' as const, label: 'Autoservicios' },
];

const HERO_IMAGE = IMAGENES_PRODUCTOS.bimbo[0] ?? IMAGENES_PRODUCTOS.citric[0] ?? null;

export default function LandingPage() {
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [marcasY, setMarcasY] = useState(0);
  const [ubicacionY, setUbicacionY] = useState(0);

  const isDesktop = width >= 1000;
  const isTablet = width >= 700;
  const isNarrow = width < 380;

  const brandCardWidth = isDesktop ? '23.5%' : isTablet ? '31.5%' : '100%';
  const statCardWidth = isTablet ? '23.5%' : '48%';
  const featureCardWidth = isDesktop ? '31.5%' : isTablet ? '48%' : '100%';
  const stepCardWidth = isDesktop ? '23.5%' : isTablet ? '48%' : '100%';
  const comercioWidth = isDesktop ? '22%' : isTablet ? '31%' : '48%';

  const irACatalogos = () => router.push('/catalogos');
  const irAMarcas = () => scrollRef.current?.scrollTo({ y: marcasY - 90, animated: true });
  const irAUbicacion = () => scrollRef.current?.scrollTo({ y: ubicacionY - 90, animated: true });

  return (
    <View style={styles.root}>
      {/* NAVBAR */}
      <View style={[styles.navbar, { paddingTop: Platform.OS === 'web' ? 14 : 46 }]}>
        <View style={styles.navbarInner}>
          <View style={styles.navBrand}>
            <Image source={require('../assets/full-advance-logo.png')} style={styles.navLogo} resizeMode="contain" />
            {width >= 340 && <Text style={styles.navWordmark}>Full Advance</Text>}
          </View>

          {isDesktop && (
            <View style={styles.navLinks}>
              <TouchableOpacity onPress={irAMarcas} activeOpacity={0.7}>
                <Text style={styles.navLinkText}>Marcas</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={irACatalogos} activeOpacity={0.7}>
                <Text style={styles.navLinkText}>Catálogos</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={irAUbicacion} activeOpacity={0.7}>
                <Text style={styles.navLinkText}>Ubicación</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.navCta} onPress={irACatalogos} activeOpacity={0.85}>
            <Text style={styles.navCtaText}>Catálogos</Text>
            <Ionicons name="arrow-forward" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* HERO */}
        <View style={[styles.hero, { paddingTop: Platform.OS === 'web' ? 128 : 148 }]}>
          <View style={styles.heroBlobPrimary} pointerEvents="none" />
          <View style={styles.heroBlobInk} pointerEvents="none" />

          <View style={[styles.heroInner, isDesktop && styles.heroInnerRow]}>
            <View style={[styles.heroTextCol, isDesktop && styles.heroTextColDesktop]}>
              <View style={[styles.badgePill, !isDesktop && styles.centerSelf]}>
                <Ionicons name="ribbon-outline" size={13} color={COLORS.primary} />
                <Text style={styles.badgePillText}>Distribuidor oficial</Text>
              </View>

              <Text
                style={[
                  styles.heroTitle,
                  { fontSize: isDesktop ? 42 : isTablet ? 34 : isNarrow ? 27 : 30 },
                  !isDesktop && styles.textCenter,
                ]}
              >
                Distribuidora oficial en el sur de Mendoza
              </Text>
              <Text style={[styles.heroSubtitle, !isDesktop && styles.textCenter]}>
                Bimbo · Palluzi · Angiola · Rikitos · Citric · Silvina
              </Text>
              <Text style={[styles.heroParagraph, !isDesktop && styles.textCenter]}>
                Llevamos los productos de las marcas más elegidas a más de 1000 comercios,
                con flota propia y logística pensada para que nunca te falte mercadería.
              </Text>

              <View style={[styles.heroButtons, !isDesktop && styles.centerRow, isNarrow && styles.heroButtonsStack]}>
                <TouchableOpacity
                  style={[styles.btnPrimaryShadow, isNarrow && styles.btnFullWidth]}
                  onPress={irACatalogos}
                  activeOpacity={0.88}
                >
                  <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.btnPrimary}>
                    <Ionicons name="albums-outline" size={18} color="#fff" />
                    <Text style={styles.btnPrimaryText}>Catálogos</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btnOutline, isNarrow && styles.btnFullWidth]}
                  onPress={irAMarcas}
                  activeOpacity={0.85}
                >
                  <Ionicons name="grid-outline" size={18} color={COLORS.ink} />
                  <Text style={styles.btnOutlineText}>Ver marcas</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.trustRow, !isDesktop && styles.centerRow]}>
                {TRUST_BADGES.map((t) => (
                  <View key={t.label} style={styles.trustItem}>
                    <Ionicons name={t.icono} size={15} color={COLORS.primary} />
                    <Text style={styles.trustText}>{t.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            {HERO_IMAGE && (
              <View style={[styles.heroVisualCol, isDesktop && styles.heroVisualColDesktop]}>
                <View style={styles.heroImageCard}>
                  <ExpoImage source={HERO_IMAGE} style={StyleSheet.absoluteFill} contentFit="cover" transition={300} />
                </View>
                <View style={styles.heroStatBadge}>
                  <Text style={styles.heroStatBadgeValue}>+1000</Text>
                  <Text style={styles.heroStatBadgeLabel}>comercios{'\n'}visitados</Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.scrollCue} pointerEvents="none">
            <Ionicons name="chevron-down-outline" size={18} color={COLORS.textMuted} />
          </View>
        </View>

        {/* ESTADÍSTICAS */}
        <View style={styles.statsStrip}>
          {ESTADISTICAS.map((e) => (
            <View key={e.label} style={[styles.statCard, { width: statCardWidth }]}>
              <View style={styles.statIconCircle}>
                <Ionicons name={e.icono} size={22} color={COLORS.primary} />
              </View>
              <Text style={styles.statValor}>{e.valor}</Text>
              <Text style={styles.statLabel}>{e.label}</Text>
            </View>
          ))}
        </View>

        {/* MARCAS / CATÁLOGO */}
        <View style={styles.section} onLayout={(ev) => setMarcasY(ev.nativeEvent.layout.y)}>
          <Text style={styles.eyebrow}>CATÁLOGO</Text>
          <Text style={styles.sectionTitle}>Nuestras marcas</Text>
          <View style={styles.titleBar} />
          <Text style={styles.sectionSubtitle}>
            El catálogo completo de las marcas que distribuimos en toda la región
          </Text>

          <View style={styles.brandGrid}>
            {MARCAS.map((m) => (
              <View key={m.nombre} style={[styles.brandCard, { width: brandCardWidth, borderTopColor: m.color }]}>
                {m.logo ? (
                  <Image source={m.logo} style={styles.brandLogoImg} resizeMode="contain" />
                ) : (
                  <View style={[styles.brandIconCircle, { backgroundColor: m.color }]}>
                    <Ionicons name={m.icono} size={26} color="#fff" />
                  </View>
                )}
                <Text style={styles.brandNombre}>{m.nombre}</Text>
                <Text style={styles.brandDescripcion}>{m.descripcion}</Text>
                <View style={[styles.brandChips, { marginTop: 12 }]}>
                  {m.productos.map((p) => (
                    <View key={p} style={[styles.chip, { borderColor: m.color }]}>
                      <Text style={[styles.chipText, { color: m.color }]}>{p}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* CÓMO TRABAJAMOS */}
        <View style={[styles.section, styles.sectionAlt]}>
          <Text style={styles.eyebrow}>PROCESO</Text>
          <Text style={styles.sectionTitle}>Cómo trabajamos</Text>
          <View style={styles.titleBar} />
          <Text style={styles.sectionSubtitle}>Del pedido a la entrega, todo bajo control</Text>

          <View style={styles.stepGrid}>
            {PROCESO.map((p) => (
              <View key={p.numero} style={[styles.stepCard, { width: stepCardWidth }]}>
                <Text style={styles.stepNumero}>{p.numero}</Text>
                <View style={styles.stepIconCircle}>
                  <Ionicons name={p.icono} size={20} color="#fff" />
                </View>
                <Text style={styles.stepTitulo}>{p.titulo}</Text>
                <Text style={styles.stepTexto}>{p.texto}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* POR QUÉ ELEGIRNOS */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>VENTAJAS</Text>
          <Text style={styles.sectionTitle}>Por qué elegirnos</Text>
          <View style={styles.titleBar} />
          <Text style={styles.sectionSubtitle}>Compromiso, cercanía y logística propia</Text>

          <View style={styles.featureGrid}>
            {MOTIVOS.map((m) => (
              <View key={m.titulo} style={[styles.featureCard, { width: featureCardWidth }]}>
                <View style={styles.featureIconCircle}>
                  <Ionicons name={m.icono} size={22} color={COLORS.primary} />
                </View>
                <View style={styles.featureTextBox}>
                  <Text style={styles.featureTitulo}>{m.titulo}</Text>
                  <Text style={styles.featureTexto}>{m.texto}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* TIPOS DE COMERCIO */}
        <View style={[styles.section, styles.sectionAlt]}>
          <Text style={styles.eyebrow}>CLIENTES</Text>
          <Text style={styles.sectionTitle}>A quién le llegamos</Text>
          <View style={styles.titleBar} />
          <Text style={styles.sectionSubtitle}>Comercios de todo tipo confían en nuestra distribución</Text>

          <View style={styles.comercioGrid}>
            {TIPOS_COMERCIO.map((c) => (
              <View key={c.label} style={[styles.comercioCard, { width: comercioWidth }]}>
                <View style={styles.comercioIconCircle}>
                  <Ionicons name={c.icono} size={20} color={COLORS.primary} />
                </View>
                <Text style={styles.comercioLabel}>{c.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* UBICACIÓN / COBERTURA */}
        <View style={styles.section} onLayout={(ev) => setUbicacionY(ev.nativeEvent.layout.y)}>
          <Text style={styles.eyebrow}>COBERTURA</Text>
          <Text style={styles.sectionTitle}>Dónde estamos</Text>
          <View style={styles.titleBar} />

          <View style={[styles.locationRow, isTablet && styles.locationRowWide]}>
            <View style={[styles.locationMapWrap, isTablet && styles.locationMapWrapWide]}>
              <UbicacionMapa />
            </View>

            <View style={styles.locationTextBox}>
              <Text style={styles.locationDireccion}>Sarmiento 4777, Las Paredes, San Rafael, Mendoza</Text>
              <Text style={styles.locationTexto}>
                Desde nuestro depósito distribuimos en todo el sur de Mendoza, llegando cada día
                a más comercios gracias a nuestra flota propia de reparto.
              </Text>
              <View style={styles.locationBullets}>
                <View style={styles.locationBulletItem}>
                  <Ionicons name="navigate-outline" size={16} color={COLORS.primary} />
                  <Text style={styles.locationBulletText}>Cobertura en todo el sur mendocino</Text>
                </View>
                <View style={styles.locationBulletItem}>
                  <Ionicons name="car-outline" size={16} color={COLORS.primary} />
                  <Text style={styles.locationBulletText}>Amplia flota propia de distribución</Text>
                </View>
                <View style={styles.locationBulletItem}>
                  <Ionicons name="storefront-outline" size={16} color={COLORS.primary} />
                  <Text style={styles.locationBulletText}>Más de 1000 negocios visitados</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* CTA FINAL */}
        <LinearGradient colors={[COLORS.ink, COLORS.inkLight]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.ctaFinal}>
          <Text style={styles.ctaTitulo}>¿Querés ver todo lo que tenemos?</Text>
          <Text style={styles.ctaTexto}>
            Descubrí el catálogo completo de productos de cada una de nuestras marcas.
          </Text>
          <TouchableOpacity style={styles.ctaBtn} onPress={irACatalogos} activeOpacity={0.85}>
            <Ionicons name="albums-outline" size={18} color={COLORS.ink} />
            <Text style={styles.ctaBtnText}>Ver catálogos</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={[styles.footerColumns, isTablet && styles.footerColumnsRow]}>
            <View style={[styles.footerCol, isTablet && { flex: 1.3 }]}>
              <Text style={styles.footerMarca}>FULL ADVANCE</Text>
              <Text style={styles.footerTexto}>
                Distribuidora oficial en el sur de Mendoza. Llevamos las mejores marcas a tu
                comercio con logística propia y atención personalizada.
              </Text>
            </View>

            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>Marcas</Text>
              {MARCAS.map((m) => (
                <Text key={m.nombre} style={styles.footerLink}>{m.nombre}</Text>
              ))}
            </View>

            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>Contacto</Text>
              <View style={styles.footerDireccionRow}>
                <Ionicons name="location-outline" size={14} color="#8A93A6" />
                <Text style={styles.footerDireccion}>Sarmiento 4777, Las Paredes{'\n'}San Rafael, Mendoza</Text>
              </View>
              <TouchableOpacity style={styles.footerLoginRow} onPress={irACatalogos} activeOpacity={0.8}>
                <Ionicons name="albums-outline" size={14} color={COLORS.primary} />
                <Text style={styles.footerLoginText}>Ver catálogos</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footerDivider} />
          <Text style={styles.footerCopy}>© {new Date().getFullYear()} Full Advance. Todos los derechos reservados.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  centerSelf: {
    alignSelf: 'center',
  },
  centerRow: {
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },

  // NAVBAR
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    backgroundColor: 'rgba(250,249,246,0.92)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 14,
  },
  navbarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
  },
  navBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  navLogo: {
    width: 30,
    height: 30,
    borderRadius: 7,
  },
  navWordmark: {
    fontFamily: FONTS.display,
    color: COLORS.ink,
    fontSize: 15,
    letterSpacing: 0.2,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
  },
  navLinkText: {
    fontFamily: FONTS.bodySemi,
    color: COLORS.textLight,
    fontSize: 13.5,
  },
  navCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: RADIUS.pill,
  },
  navCtaText: {
    fontFamily: FONTS.bodySemi,
    color: '#fff',
    fontSize: 13,
  },

  // HERO
  hero: {
    paddingBottom: 44,
    paddingHorizontal: 24,
    overflow: 'hidden',
  },
  heroBlobPrimary: {
    position: 'absolute',
    top: -140,
    right: -120,
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: COLORS.primarySoft,
  },
  heroBlobInk: {
    position: 'absolute',
    bottom: -160,
    left: -140,
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: 'rgba(43,58,85,0.06)',
  },
  heroInner: {
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
    gap: 40,
  },
  heroInnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 56,
  },
  heroTextCol: {
    alignItems: 'center',
  },
  heroTextColDesktop: {
    flex: 1,
    alignItems: 'flex-start',
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primarySoft,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: RADIUS.pill,
    marginBottom: 18,
  },
  badgePillText: {
    fontFamily: FONTS.bodySemi,
    color: COLORS.primaryDark,
    fontSize: 11.5,
    letterSpacing: 0.3,
  },
  heroTitle: {
    fontFamily: FONTS.display,
    color: COLORS.ink,
    maxWidth: 560,
  },
  heroSubtitle: {
    marginTop: 12,
    fontFamily: FONTS.bodySemi,
    fontSize: 15,
    color: COLORS.primary,
    letterSpacing: 0.2,
  },
  heroParagraph: {
    marginTop: 14,
    fontFamily: FONTS.body,
    fontSize: 14.5,
    color: COLORS.textLight,
    maxWidth: 480,
    lineHeight: 22,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 28,
    flexWrap: 'wrap',
  },
  heroButtonsStack: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  btnFullWidth: {
    width: '100%',
    maxWidth: 320,
  },
  btnPrimaryShadow: {
    borderRadius: RADIUS.pill,
    ...SHADOW.floating,
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: RADIUS.pill,
  },
  btnPrimaryText: {
    fontFamily: FONTS.bodySemi,
    color: '#fff',
    fontSize: 15,
  },
  btnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: RADIUS.pill,
  },
  btnOutlineText: {
    fontFamily: FONTS.bodySemi,
    color: COLORS.ink,
    fontSize: 15,
  },
  trustRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    marginTop: 30,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustText: {
    fontFamily: FONTS.bodyMedium,
    color: COLORS.textLight,
    fontSize: 12,
  },
  scrollCue: {
    alignSelf: 'center',
    marginTop: 40,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // HERO VISUAL
  heroVisualCol: {
    width: '100%',
  },
  heroVisualColDesktop: {
    flex: 1,
  },
  heroImageCard: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    backgroundColor: COLORS.border,
    ...SHADOW.floating,
  },
  heroStatBadge: {
    position: 'absolute',
    left: -14,
    bottom: -18,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    paddingHorizontal: 18,
    ...SHADOW.floating,
  },
  heroStatBadgeValue: {
    fontFamily: FONTS.display,
    color: COLORS.ink,
    fontSize: 20,
  },
  heroStatBadgeLabel: {
    fontFamily: FONTS.bodyMedium,
    color: COLORS.textLight,
    fontSize: 11,
    marginTop: 2,
  },

  // ESTADÍSTICAS
  statsStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    marginTop: 8,
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: 18,
    ...SHADOW.card,
  },
  statCard: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  statIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValor: {
    fontFamily: FONTS.display,
    fontSize: 15,
    color: COLORS.text,
    textAlign: 'center',
  },
  statLabel: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 11,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 2,
  },

  // SECCIONES
  section: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 16,
  },
  sectionAlt: {
    backgroundColor: '#F4F2ED',
  },
  eyebrow: {
    fontFamily: FONTS.bodySemi,
    fontSize: 11.5,
    color: COLORS.primary,
    textAlign: 'center',
    letterSpacing: 1.8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: FONTS.display,
    fontSize: 24,
    color: COLORS.ink,
    textAlign: 'center',
  },
  titleBar: {
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    alignSelf: 'center',
    marginTop: 14,
  },
  sectionSubtitle: {
    fontFamily: FONTS.body,
    fontSize: 13.5,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 32,
  },

  // MARCAS
  brandGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  brandCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderTopWidth: 3,
    padding: 18,
    alignItems: 'center',
    ...SHADOW.card,
  },
  brandLogoImg: {
    width: 90,
    height: 56,
    marginBottom: 10,
    borderRadius: 8,
  },
  brandIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  brandNombre: {
    fontFamily: FONTS.displayBold,
    fontSize: 16,
    color: COLORS.ink,
  },
  brandDescripcion: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
  brandChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
  },
  chip: {
    borderWidth: 1,
    borderRadius: RADIUS.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  chipText: {
    fontFamily: FONTS.bodySemi,
    fontSize: 10.5,
  },

  // PROCESO
  stepGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  stepCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 18,
    ...SHADOW.card,
    overflow: 'hidden',
  },
  stepNumero: {
    position: 'absolute',
    top: -8,
    right: 10,
    fontFamily: FONTS.display,
    fontSize: 46,
    color: 'rgba(21,22,30,0.05)',
  },
  stepIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  stepTitulo: {
    fontFamily: FONTS.displayBold,
    fontSize: 14.5,
    color: COLORS.ink,
    marginBottom: 4,
  },
  stepTexto: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
  },

  // MOTIVOS
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 16,
    gap: 12,
    ...SHADOW.card,
  },
  featureIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTextBox: {
    flex: 1,
  },
  featureTitulo: {
    fontFamily: FONTS.displayBold,
    fontSize: 14,
    color: COLORS.ink,
    marginBottom: 4,
  },
  featureTexto: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
  },

  // TIPOS DE COMERCIO
  comercioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'center',
  },
  comercioCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: 'center',
    ...SHADOW.card,
  },
  comercioIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  comercioLabel: {
    fontFamily: FONTS.bodySemi,
    fontSize: 12,
    color: COLORS.ink,
    textAlign: 'center',
  },

  // UBICACIÓN
  locationRow: {
    gap: 16,
  },
  locationRowWide: {
    flexDirection: 'row',
  },
  locationMapWrap: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    minHeight: 240,
    ...SHADOW.card,
  },
  locationMapWrapWide: {
    flex: 1,
  },
  locationTextBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: 22,
    ...SHADOW.card,
  },
  locationDireccion: {
    fontFamily: FONTS.displayBold,
    fontSize: 14,
    color: COLORS.ink,
  },
  locationTexto: {
    fontFamily: FONTS.body,
    fontSize: 12.5,
    color: COLORS.textLight,
    marginTop: 8,
    lineHeight: 19,
  },
  locationBullets: {
    marginTop: 14,
    gap: 8,
  },
  locationBulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationBulletText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 12.5,
    color: COLORS.text,
  },

  // CTA FINAL
  ctaFinal: {
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: RADIUS.xl,
    padding: 32,
    alignItems: 'center',
    overflow: 'hidden',
  },
  ctaTitulo: {
    fontFamily: FONTS.display,
    fontSize: 21,
    color: '#fff',
    textAlign: 'center',
  },
  ctaTexto: {
    fontFamily: FONTS.body,
    fontSize: 13,
    color: 'rgba(255,255,255,0.72)',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 22,
    maxWidth: 420,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: RADIUS.pill,
  },
  ctaBtnText: {
    fontFamily: FONTS.bodySemi,
    color: COLORS.ink,
    fontSize: 15,
  },

  // FOOTER
  footer: {
    backgroundColor: COLORS.ink,
    paddingVertical: 40,
    paddingHorizontal: 24,
    marginTop: 40,
  },
  footerColumns: {
    gap: 28,
  },
  footerColumnsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerCol: {
    flex: 1,
  },
  footerMarca: {
    fontFamily: FONTS.display,
    color: '#fff',
    fontSize: 16,
    letterSpacing: 1,
    marginBottom: 8,
  },
  footerTexto: {
    fontFamily: FONTS.body,
    color: '#9CA0AC',
    fontSize: 12,
    lineHeight: 18,
  },
  footerColTitle: {
    fontFamily: FONTS.displayBold,
    color: '#fff',
    fontSize: 12.5,
    marginBottom: 10,
    letterSpacing: 0.4,
  },
  footerLink: {
    fontFamily: FONTS.body,
    color: '#9CA0AC',
    fontSize: 12.5,
    marginBottom: 8,
  },
  footerDireccionRow: {
    flexDirection: 'row',
    gap: 6,
  },
  footerDireccion: {
    fontFamily: FONTS.body,
    color: '#9CA0AC',
    fontSize: 12,
    lineHeight: 17,
  },
  footerLoginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
  },
  footerLoginText: {
    fontFamily: FONTS.bodySemi,
    color: COLORS.primary,
    fontSize: 12.5,
  },
  footerDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginTop: 32,
    marginBottom: 16,
  },
  footerCopy: {
    fontFamily: FONTS.body,
    color: '#6B7280',
    fontSize: 10.5,
    textAlign: 'center',
  },
});

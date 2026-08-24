import { useRef, useState } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity,
  StyleSheet, useWindowDimensions, Platform,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Carousel, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, SHADOW } from '../constants';
import { IMAGENES_PRODUCTOS, PRODUCTOS_DESTACADOS } from '../constants/productos';
import UbicacionMapa from './UbicacionMapa';
import ProductCarousel from './ProductCarousel';

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
    descripcion: 'Fiambres y embutidos de primera calidad.',
    productos: ['Fiambres', 'Embutidos', 'Quesos', 'Productos de granja'],
    logo: require('../assets/palluzi-logo.jpg'),
    imagenesProducto: IMAGENES_PRODUCTOS.palluzi,
  },
  {
    nombre: 'Angiola',
    color: '#D97706',
    icono: 'pizza-outline',
    descripcion: 'Pastas y productos italianos de siempre.',
    productos: ['Pastas secas', 'Fideos', 'Sémola', 'Salsas'],
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
  { icono: 'pricetags-outline' as const, valor: '5 marcas', label: 'Líderes en consumo masivo' },
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

function ProductosDestacados() {
  const progress = useSharedValue(0);
  if (PRODUCTOS_DESTACADOS.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.eyebrow}>GALERÍA</Text>
      <Text style={styles.sectionTitle}>Productos destacados</Text>
      <View style={styles.titleBar} />
      <Text style={styles.sectionSubtitle}>Una muestra de lo que llevamos día a día a tu comercio</Text>

      <View style={styles.destacadosFrame}>
        <Carousel
          style={styles.destacadosCarousel}
          data={PRODUCTOS_DESTACADOS}
          loop
          autoplay
          autoplayInterval={4000}
          onProgressChange={(p) => {
            progress.value = p;
          }}
          renderItem={({ item }) => (
            <View style={StyleSheet.absoluteFill}>
              <ExpoImage source={item.imagen} style={StyleSheet.absoluteFill} contentFit="cover" transition={250} />
              <LinearGradient colors={['transparent', 'rgba(8,17,38,0.75)']} style={styles.destacadoOverlay}>
                <Text style={[styles.destacadoMarca, { color: item.color }]}>{item.marca}</Text>
                <Text style={styles.destacadoNombre}>{item.nombre}</Text>
              </LinearGradient>
            </View>
          )}
        />
      </View>
      <Pagination
        count={PRODUCTOS_DESTACADOS.length}
        progress={progress}
        containerStyle={styles.destacadosDots}
        dotStyle={{ width: 7, height: 7, borderRadius: 4, backgroundColor: 'rgba(15,23,42,0.15)' }}
        activeDotStyle={{ width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.primary }}
      />
    </View>
  );
}

export default function LandingPage() {
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [marcasY, setMarcasY] = useState(0);

  const isDesktop = width >= 1000;
  const isTablet = width >= 700;
  const isNarrow = width < 380;

  const brandCardWidth = isDesktop ? '23.5%' : isTablet ? '31.5%' : '100%';
  const statCardWidth = isTablet ? '23.5%' : '48%';
  const featureCardWidth = isDesktop ? '31.5%' : isTablet ? '48%' : '100%';
  const stepCardWidth = isDesktop ? '23.5%' : isTablet ? '48%' : '100%';
  const comercioWidth = isDesktop ? '22%' : isTablet ? '31%' : '48%';

  const irACatalogos = () => router.push('/catalogos');
  const irAMarcas = () => scrollRef.current?.scrollTo({ y: marcasY - 20, animated: true });

  return (
    <View style={styles.root}>
      {/* Barra superior fija */}
      {width >= 360 && (
        <View style={styles.navWordmarkPill} pointerEvents="none">
          <Image source={require('../assets/full-advance-logo.png')} style={styles.navLogo} resizeMode="contain" />
          <Text style={styles.navWordmarkText}>FULL ADVANCE</Text>
        </View>
      )}
      <TouchableOpacity style={styles.floatingLoginShadow} onPress={irACatalogos} activeOpacity={0.85}>
        <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.floatingLogin}>
          <Ionicons name="albums-outline" size={17} color="#fff" />
          <Text style={styles.floatingLoginText}>Catálogos</Text>
        </LinearGradient>
      </TouchableOpacity>

      <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* HERO */}
        <LinearGradient
          colors={[COLORS.secondary, '#0A2456']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.hero, { paddingTop: Platform.OS === 'web' ? 92 : 116 }]}
        >
          <View style={styles.heroBlobRed} pointerEvents="none" />

          <View style={styles.badgePill}>
            <Ionicons name="ribbon-outline" size={13} color="#fff" />
            <Text style={styles.badgePillText}>Distribuidor oficial</Text>
          </View>

          <View style={styles.logoBox}>
            <Image
              source={require('../assets/full-advance-logo.png')}
              style={[styles.logo, isNarrow && styles.logoSmall]}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.heroTitle, { fontSize: isDesktop ? 34 : isTablet ? 29 : isNarrow ? 22 : 25 }]}>
            Distribuidora oficial en el sur de Mendoza
          </Text>
          <Text style={styles.heroSubtitle}>Bimbo · Palluzi · Angiola · Rikitos · Citric</Text>
          <Text style={styles.heroParagraph}>
            Llevamos los productos de las marcas más elegidas a más de 1000 comercios,
            con flota propia y logística pensada para que nunca te falte mercadería.
          </Text>

          <View style={[styles.heroButtons, isNarrow && styles.heroButtonsStack]}>
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
              <Ionicons name="grid-outline" size={18} color="#fff" />
              <Text style={styles.btnOutlineText}>Ver marcas</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.trustRow}>
            {TRUST_BADGES.map((t) => (
              <View key={t.label} style={styles.trustItem}>
                <Ionicons name={t.icono} size={15} color="#DCE6FA" />
                <Text style={styles.trustText}>{t.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.scrollCue} pointerEvents="none">
            <Ionicons name="chevron-down-outline" size={18} color="rgba(255,255,255,0.7)" />
          </View>
        </LinearGradient>

        {/* ESTADÍSTICAS */}
        <View style={styles.statsStrip}>
          {ESTADISTICAS.map((e) => (
            <View key={e.label} style={[styles.statCard, { width: statCardWidth }]}>
              <View style={styles.statIconCircle}>
                <Ionicons name={e.icono} size={22} color={COLORS.secondary} />
              </View>
              <Text style={styles.statValor}>{e.valor}</Text>
              <Text style={styles.statLabel}>{e.label}</Text>
            </View>
          ))}
        </View>

        {/* PRODUCTOS DESTACADOS */}
        <ProductosDestacados />

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
                <ProductCarousel images={m.imagenesProducto} color={m.color} height={120} />
                <View style={[styles.brandChips, m.imagenesProducto.length > 0 && { marginTop: 12 }]}>
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
                  <Ionicons name={m.icono} size={22} color={COLORS.secondary} />
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
                  <Ionicons name={c.icono} size={20} color={COLORS.secondary} />
                </View>
                <Text style={styles.comercioLabel}>{c.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* UBICACIÓN / COBERTURA */}
        <View style={styles.section}>
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
                  <Ionicons name="navigate-outline" size={16} color={COLORS.secondary} />
                  <Text style={styles.locationBulletText}>Cobertura en todo el sur mendocino</Text>
                </View>
                <View style={styles.locationBulletItem}>
                  <Ionicons name="car-outline" size={16} color={COLORS.secondary} />
                  <Text style={styles.locationBulletText}>Amplia flota propia de distribución</Text>
                </View>
                <View style={styles.locationBulletItem}>
                  <Ionicons name="storefront-outline" size={16} color={COLORS.secondary} />
                  <Text style={styles.locationBulletText}>Más de 1000 negocios visitados</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* CTA FINAL */}
        <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.ctaFinal}>
          <Text style={styles.ctaTitulo}>¿Querés ver todo lo que tenemos?</Text>
          <Text style={styles.ctaTexto}>
            Descubrí el catálogo completo de productos de cada una de nuestras marcas.
          </Text>
          <TouchableOpacity style={styles.ctaBtn} onPress={irACatalogos} activeOpacity={0.85}>
            <Ionicons name="albums-outline" size={18} color={COLORS.primary} />
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

  // NAV FIJO
  navWordmarkPill: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 16 : 48,
    left: 16,
    zIndex: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(8,17,38,0.55)',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: RADIUS.pill,
  },
  navLogo: {
    width: 22,
    height: 22,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  navWordmarkText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  floatingLoginShadow: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 16 : 48,
    right: 16,
    zIndex: 20,
    borderRadius: RADIUS.pill,
    ...SHADOW.floating,
  },
  floatingLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: RADIUS.pill,
  },
  floatingLoginText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
  },

  // HERO
  hero: {
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden',
  },
  heroBlobRed: {
    position: 'absolute',
    top: -120,
    right: -100,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(227,30,36,0.10)',
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: RADIUS.pill,
    marginBottom: 18,
  },
  badgePillText: {
    color: '#fff',
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  logoBox: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 20,
    ...SHADOW.floating,
  },
  logo: {
    width: 180,
    height: 118,
  },
  logoSmall: {
    width: 150,
    height: 98,
  },
  heroTitle: {
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    maxWidth: 560,
  },
  heroSubtitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '700',
    color: '#FFD8D9',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  heroParagraph: {
    marginTop: 14,
    fontSize: 14,
    color: '#E4EAF5',
    textAlign: 'center',
    maxWidth: 520,
    lineHeight: 21,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 26,
    flexWrap: 'wrap',
    justifyContent: 'center',
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
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  btnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: RADIUS.pill,
  },
  btnOutlineText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  trustRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    justifyContent: 'center',
    marginTop: 28,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustText: {
    color: '#DCE6FA',
    fontSize: 12,
    fontWeight: '600',
  },
  scrollCue: {
    marginTop: 26,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ESTADÍSTICAS
  statsStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    marginTop: -32,
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
    backgroundColor: '#EEF2F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValor: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 2,
  },

  // SECCIONES
  section: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 16,
  },
  sectionAlt: {
    backgroundColor: '#F7F8FA',
  },
  eyebrow: {
    fontSize: 11.5,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },
  titleBar: {
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    alignSelf: 'center',
    marginTop: 12,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 28,
  },

  // PRODUCTOS DESTACADOS
  destacadosFrame: {
    width: '100%',
    height: 260,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    backgroundColor: '#EEF2F8',
    ...SHADOW.card,
  },
  destacadosCarousel: {
    width: '100%',
    height: '100%',
  },
  destacadoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 18,
  },
  destacadoMarca: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  destacadoNombre: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  destacadosDots: {
    gap: 7,
    marginTop: 14,
    justifyContent: 'center',
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
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  brandDescripcion: {
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
    fontSize: 10.5,
    fontWeight: '700',
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
    fontSize: 46,
    fontWeight: '900',
    color: 'rgba(15,23,42,0.06)',
  },
  stepIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  stepTitulo: {
    fontSize: 14.5,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  stepTexto: {
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
    backgroundColor: '#EEF2F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTextBox: {
    flex: 1,
  },
  featureTitulo: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  featureTexto: {
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
    backgroundColor: '#EEF2F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  comercioLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
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
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  locationTexto: {
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
    fontSize: 12.5,
    color: COLORS.text,
    fontWeight: '600',
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
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  ctaTexto: {
    fontSize: 13,
    color: '#FFE1E2',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
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
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 15,
  },

  // FOOTER
  footer: {
    backgroundColor: '#0B1220',
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
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 1,
    marginBottom: 8,
  },
  footerTexto: {
    color: '#8A93A6',
    fontSize: 12,
    lineHeight: 18,
  },
  footerColTitle: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12.5,
    marginBottom: 10,
    letterSpacing: 0.4,
  },
  footerLink: {
    color: '#9CA6B8',
    fontSize: 12.5,
    marginBottom: 8,
  },
  footerDireccionRow: {
    flexDirection: 'row',
    gap: 6,
  },
  footerDireccion: {
    color: '#9CA6B8',
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
    color: COLORS.primary,
    fontSize: 12.5,
    fontWeight: '800',
  },
  footerDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginTop: 32,
    marginBottom: 16,
  },
  footerCopy: {
    color: '#5B6472',
    fontSize: 10.5,
    textAlign: 'center',
  },
});

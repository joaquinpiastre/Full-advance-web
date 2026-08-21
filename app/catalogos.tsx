import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions, Linking, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, SHADOW } from '../constants';

type CatalogoLink = {
  label: string;
  url: string;
};

type CatalogoMarca = {
  nombre: string;
  color: string;
  icono: keyof typeof Ionicons.glyphMap;
  logo?: any;
  // Cuando tengas el catálogo de cada marca (PDF, link de Drive, etc.) completá esta lista
  // y la tarjeta pasa a mostrar el/los botón/es "Ver catálogo" en vez de "Próximamente".
  catalogos?: CatalogoLink[];
};

const CATALOGOS: CatalogoMarca[] = [
  {
    nombre: 'Bimbo',
    color: '#E31E24',
    icono: 'nutrition-outline',
    logo: require('../assets/bimbo-logo.jpg'),
    catalogos: [
      { label: 'Catálogo de productos', url: '/catalogos/bimbo-productos.pdf' },
      { label: 'Catálogo gastronómico', url: '/catalogos/bimbo-gastronomico.pdf' },
    ],
  },
  {
    nombre: 'Palluzi',
    color: '#7C2D12',
    icono: 'restaurant-outline',
    logo: require('../assets/palluzi-logo.jpg'),
    catalogos: [{ label: 'Ver catálogo', url: '/catalogos/palluzi.pdf' }],
  },
  {
    nombre: 'Angiola',
    color: '#D97706',
    icono: 'pizza-outline',
    logo: require('../assets/angiola-logo.jpg'),
    catalogos: [{ label: 'Ver catálogo', url: '/catalogos/angiola.pdf' }],
  },
  { nombre: 'Rikitos', color: '#7C3AED', icono: 'fast-food-outline' },
  { nombre: 'Citric', color: '#0D9488', icono: 'leaf-outline' },
];

export default function Catalogos() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 700;
  const cardWidth = isTablet ? '47%' : '100%';

  return (
    <View style={styles.root}>
      <LinearGradient colors={[COLORS.secondary, '#0A2456']} style={[styles.header, { paddingTop: Platform.OS === 'web' ? 24 : 56 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
          <Text style={styles.backBtnText}>Inicio</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Catálogos</Text>
        <Text style={styles.headerSubtitulo}>Todo el catálogo de productos de cada marca, en un solo lugar</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {CATALOGOS.map((c) => (
            <View key={c.nombre} style={[styles.card, { width: cardWidth, borderTopColor: c.color }]}>
              {c.logo ? (
                <Image source={c.logo} style={styles.logoImg} resizeMode="contain" />
              ) : (
                <View style={[styles.iconCircle, { backgroundColor: c.color }]}>
                  <Ionicons name={c.icono} size={26} color="#fff" />
                </View>
              )}
              <Text style={styles.cardNombre}>{c.nombre}</Text>

              {c.catalogos && c.catalogos.length > 0 ? (
                <View style={styles.verBtnGroup}>
                  {c.catalogos.map((cat) => (
                    <TouchableOpacity
                      key={cat.label}
                      style={[styles.verBtn, { backgroundColor: c.color }]}
                      onPress={() => Linking.openURL(cat.url)}
                      activeOpacity={0.85}
                    >
                      <Ionicons name="document-text-outline" size={16} color="#fff" />
                      <Text style={styles.verBtnText}>{cat.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View style={styles.prontoBadge}>
                  <Ionicons name="time-outline" size={14} color={COLORS.textLight} />
                  <Text style={styles.prontoText}>Próximamente</Text>
                </View>
              )}
            </View>
          ))}
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
  header: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: RADIUS.pill,
    marginBottom: 20,
  },
  backBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  headerTitulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
  },
  headerSubtitulo: {
    marginTop: 6,
    fontSize: 13,
    color: '#E4EAF5',
    maxWidth: 460,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderTopWidth: 3,
    padding: 22,
    alignItems: 'center',
    ...SHADOW.card,
  },
  logoImg: {
    width: 100,
    height: 60,
    marginBottom: 14,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  cardNombre: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 14,
  },
  verBtnGroup: {
    gap: 8,
    alignItems: 'center',
  },
  verBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: RADIUS.pill,
  },
  verBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
  },
  prontoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.background,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: RADIUS.pill,
  },
  prontoText: {
    color: COLORS.textLight,
    fontWeight: '700',
    fontSize: 12,
  },
});

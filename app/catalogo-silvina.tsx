import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, RADIUS, SHADOW } from '../constants';

const SILVINA_COLOR = '#C81E3A';

type ProductoSilvina = {
  nombre: string;
  descripcion: string;
  presentaciones: string;
  imagen: any;
};

const PRODUCTOS_SILVINA: ProductoSilvina[] = [
  {
    nombre: 'Pan rallado',
    descripcion: '0% grasas trans, 0% colesterol.',
    presentaciones: '12u x 450g · 10u x 1kg · bolsas 5/10/25kg',
    imagen: require('../assets/products/silvina/silvina-pan-rallado.png'),
  },
  {
    nombre: 'Rebozador',
    descripcion: 'Rebozador clásico para milanesas y frituras.',
    presentaciones: '12u x 450g · 10u x 1kg · bolsas 5/10/25kg',
    imagen: require('../assets/products/silvina/silvina-rebozador.png'),
  },
  {
    nombre: 'Rebozador Total',
    descripcion: 'Saborizado con queso, ajo y perejil, orégano y huevo.',
    presentaciones: '12u x 400g · bolsa 3kg',
    imagen: require('../assets/products/silvina/silvina-rebozador-total.png'),
  },
  {
    nombre: 'Horno Rebozador',
    descripcion: 'Rebozador pensado para cocción al horno.',
    presentaciones: '12u x 400g',
    imagen: require('../assets/products/silvina/silvina-horno-rebozador.png'),
  },
  {
    nombre: 'Mezcla',
    descripcion: 'Mezcla de pan rallado y rebozador.',
    presentaciones: '12u x 450g · bolsas 5/25kg',
    imagen: require('../assets/products/silvina/silvina-mezcla.png'),
  },
  {
    nombre: 'Polenta',
    descripcion: 'Polenta de cocción rápida.',
    presentaciones: '10u x 400g · bolsa 5kg',
    imagen: require('../assets/products/silvina/silvina-polenta.png'),
  },
  {
    nombre: 'Sémola',
    descripcion: 'Sémola de trigo candeal.',
    presentaciones: '10u x 400g · bolsa 5kg',
    imagen: require('../assets/products/silvina/silvina-semola.png'),
  },
  {
    nombre: 'Fécula de mandioca',
    descripcion: 'Ideal para preparar chipá.',
    presentaciones: '10u x 400g · 6u x 900g · bolsa 5kg',
    imagen: require('../assets/products/silvina/silvina-fecula-mandioca.png'),
  },
  {
    nombre: 'Fainá',
    descripcion: 'Preparado tradicional de fainá.',
    presentaciones: '12u x 250g · bolsa 5kg',
    imagen: require('../assets/products/silvina/silvina-faina.png'),
  },
  {
    nombre: 'Fainá con verdeo',
    descripcion: 'Preparado de fainá con verdeo.',
    presentaciones: '12u x 250g',
    imagen: require('../assets/products/silvina/silvina-faina-verdeo.png'),
  },
  {
    nombre: 'Sopa paraguaya',
    descripcion: 'Preparado tradicional de sopa paraguaya.',
    presentaciones: '10u x 400g · 8u x 900g · bolsa 5kg',
    imagen: require('../assets/products/silvina/silvina-sopa-paraguaya.png'),
  },
];

export default function CatalogoSilvina() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 700;
  const isDesktop = width >= 1000;
  const cardWidth = isDesktop ? '31.5%' : isTablet ? '47%' : '100%';

  return (
    <View style={styles.root}>
      <LinearGradient colors={[COLORS.ink, COLORS.inkLight]} style={[styles.header, { paddingTop: Platform.OS === 'web' ? 24 : 56 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
          <Text style={styles.backBtnText}>Catálogos</Text>
        </TouchableOpacity>
        <Image source={require('../assets/silvina-logo.png')} style={styles.headerLogo} resizeMode="contain" />
        <Text style={styles.headerTitulo}>Catálogo Silvina</Text>
        <Text style={styles.headerSubtitulo}>
          Rebozadores, pan rallado y productos para cocinar desde 1972. Distribuido por Araujo S.R.L.
        </Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {PRODUCTOS_SILVINA.map((p) => (
            <View key={p.nombre} style={[styles.card, { width: cardWidth }]}>
              <View style={styles.imgFrame}>
                <Image source={p.imagen} style={styles.img} resizeMode="contain" />
              </View>
              <Text style={styles.cardNombre}>{p.nombre}</Text>
              <Text style={styles.cardDescripcion}>{p.descripcion}</Text>
              <View style={styles.presentPill}>
                <Ionicons name="cube-outline" size={12} color={SILVINA_COLOR} />
                <Text style={styles.presentText}>{p.presentaciones}</Text>
              </View>
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
    alignItems: 'flex-start',
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
    fontFamily: FONTS.bodySemi,
    color: '#fff',
    fontSize: 13,
  },
  headerLogo: {
    width: 64,
    height: 64,
    marginBottom: 10,
  },
  headerTitulo: {
    fontFamily: FONTS.display,
    fontSize: 26,
    color: '#fff',
  },
  headerSubtitulo: {
    marginTop: 6,
    fontFamily: FONTS.body,
    fontSize: 13,
    color: 'rgba(255,255,255,0.72)',
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
    borderTopColor: SILVINA_COLOR,
    padding: 18,
    alignItems: 'center',
    ...SHADOW.card,
  },
  imgFrame: {
    width: '100%',
    height: 150,
    borderRadius: RADIUS.md,
    backgroundColor: '#FBEAEC',
    marginBottom: 12,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  cardNombre: {
    fontFamily: FONTS.displayBold,
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
  },
  cardDescripcion: {
    marginTop: 4,
    fontFamily: FONTS.body,
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  presentPill: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.background,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.pill,
  },
  presentText: {
    fontFamily: FONTS.bodySemi,
    color: SILVINA_COLOR,
    fontSize: 11,
    textAlign: 'center',
  },
});

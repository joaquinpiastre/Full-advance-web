// Pie de página compartido.
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS } from '../constants';
import { LOGO_FULL_ADVANCE, MARCAS } from '../constants/marcas';
import { Contenedor, EnlaceFlecha, useDiseno } from './ui';

export default function PieDePagina() {
  const { esTablet } = useDiseno();
  return (
    <View style={styles.pie}>
      <Contenedor>
        <View style={[styles.columnas, esTablet && styles.columnasFila]}>
          <View style={esTablet ? { flex: 1.5, paddingRight: 48 } : null}>
            <View style={styles.logoCaja}>
              <Image
                source={LOGO_FULL_ADVANCE.src}
                alt="Full Advance"
                contentFit="contain"
                style={{ height: 46, width: 46 * LOGO_FULL_ADVANCE.ratio }}
              />
            </View>
            <Text style={styles.texto}>
              Distribuidora oficial en el sur de Mendoza. Llevamos las mejores marcas a tu comercio con logística
              propia y atención personalizada.
            </Text>
          </View>

          <View style={esTablet ? { flex: 1 } : null}>
            <Text style={styles.columnaTitulo}>Marcas</Text>
            <View style={styles.marcas}>
              {MARCAS.map((m) => (
                <Text key={m.id} style={styles.item}>
                  {m.nombre}
                </Text>
              ))}
            </View>
          </View>

          <View style={esTablet ? { flex: 1.1 } : null}>
            <Text style={styles.columnaTitulo}>Dónde estamos</Text>
            <View style={styles.direccion}>
              <Ionicons name="location-outline" size={17} color={COLORS.kraft} style={{ marginTop: 3 }} />
              <Text style={styles.item}>
                Av. Sarmiento 4777, Las Paredes{'\n'}San Rafael, Mendoza
              </Text>
            </View>
            <View style={{ marginTop: 14 }}>
              <EnlaceFlecha label="Ver catálogos" color="#fff" onPress={() => router.push('/catalogos')} />
            </View>
          </View>
        </View>

        <View style={styles.linea} />
        <Text style={styles.copy}>© {new Date().getFullYear()} Full Advance. Todos los derechos reservados.</Text>
      </Contenedor>
    </View>
  );
}

const styles = StyleSheet.create({
  pie: {
    backgroundColor: COLORS.espresso,
    paddingTop: 64,
    paddingBottom: 32,
  },
  columnas: {
    gap: 40,
  },
  columnasFila: {
    flexDirection: 'row',
    gap: 24,
  },
  logoCaja: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: RADIUS.md,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 18,
  },
  texto: {
    fontFamily: FONTS.body,
    fontSize: 15.5,
    lineHeight: 25,
    color: 'rgba(255, 255, 255, 0.68)',
    maxWidth: 420,
  },
  columnaTitulo: {
    fontFamily: FONTS.label,
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: COLORS.kraft,
    marginBottom: 14,
  },
  marcas: {
    gap: 8,
  },
  item: {
    fontFamily: FONTS.body,
    fontSize: 15.5,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.82)',
  },
  direccion: {
    flexDirection: 'row',
    gap: 8,
  },
  linea: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 48,
    marginBottom: 22,
  },
  copy: {
    fontFamily: FONTS.body,
    fontSize: 13.5,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

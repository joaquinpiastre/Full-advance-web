import { View, Text, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, UBICACION_FULL_ADVANCE } from '../constants';

const { latitude, longitude, direccion } = UBICACION_FULL_ADVANCE;

export default function UbicacionMapa() {
  const abrirMapa = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${encodeURIComponent(direccion)}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${encodeURIComponent('Full Advance')})`,
      default: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
    });
    if (url) Linking.openURL(url);
  };

  return (
    <TouchableOpacity style={styles.wrap} onPress={abrirMapa} activeOpacity={0.9}>
      <MapView
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
        initialRegion={{ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
        scrollEnabled={false}
        zoomEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
      >
        <Marker coordinate={{ latitude, longitude }} pinColor={COLORS.primary} />
      </MapView>
      <View style={styles.btn} pointerEvents="none">
        <Ionicons name="navigate-outline" size={14} color={COLORS.primary} />
        <Text style={styles.btnText}>Cómo llegar</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  btn: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: RADIUS.pill,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  btnText: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 12,
  },
});

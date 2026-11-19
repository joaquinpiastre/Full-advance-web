import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
  Archivo_800ExtraBold,
  Archivo_800ExtraBold_Italic,
} from '@expo-google-fonts/archivo';
import { ArchivoNarrow_600SemiBold } from '@expo-google-fonts/archivo-narrow';
import { COLORS } from '../constants';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Archivo_800ExtraBold,
    Archivo_800ExtraBold_Italic,
    ArchivoNarrow_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: COLORS.background } }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="catalogos" />
          <Stack.Screen name="catalogo-silvina" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

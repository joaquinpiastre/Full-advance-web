import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Carousel, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { RADIUS } from '../constants';

type Props = {
  images: any[];
  height?: number;
  color?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
};

export default function ProductCarousel({ images, height = 140, color = '#E31E24', autoplay = false, autoplayInterval = 3500 }: Props) {
  const progress = useSharedValue(0);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <View style={[styles.frame, { height }]}>
        <Image source={images[0]} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} />
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <View style={[styles.frame, { height }]}>
        <Carousel
          style={{ width: '100%', height }}
          data={images}
          loop
          autoplay={autoplay}
          autoplayInterval={autoplayInterval}
          onProgressChange={(p) => {
            progress.value = p;
          }}
          renderItem={({ item }) => (
            <Image source={item} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} />
          )}
        />
      </View>
      <Pagination
        count={images.length}
        progress={progress}
        containerStyle={styles.dotsRow}
        dotStyle={{ width: 6, height: 6, borderRadius: 3, backgroundColor: `${color}33` }}
        activeDotStyle={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
  frame: {
    width: '100%',
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    backgroundColor: '#EEF2F8',
  },
  dotsRow: {
    gap: 6,
    marginTop: 8,
  },
});

import { useAssets } from "expo-asset";
import { useMemo } from "react";
import { useFonts } from "expo-font";
import type { ImageSourcePropType } from "react-native";

// images to preload
const modules = [
    require('./images/background.jpg'),
];


export function usePreloadedAssets() {
  const [assets] = useAssets(modules);
  
  // fonts to preload
  const [fontsLoaded] = useFonts({
    bender: require('./fonts/Bender.otf'),
    'bender-bold': require('./fonts/Bender-Bold.otf'),
  });

  const ready = Boolean(assets) && fontsLoaded;

    
  const images = useMemo(() => {
    if (!assets) return null;

    // Convert Assets → ImageSourcePropType for RN components
    const toSource = (idx: number): ImageSourcePropType => ({
      uri: assets[idx].localUri ?? assets[idx].uri,
    });

    return {
      background: toSource(0),
    } as const;
  }, [assets]);

  return { ready, images };
}

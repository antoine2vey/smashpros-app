import { BottomSheetBackdropProps, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated";

export const Backdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  // animated variables
  const { dismissAll } = useBottomSheetModal()
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 0.7],
      Extrapolate.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "#000"
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return <Animated.View style={containerStyle} onTouchStart={() => dismissAll()} />;
};

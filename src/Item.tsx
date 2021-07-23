import React, { ReactNode } from "react";
import { Dimensions, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COL, getOrder, getPosition, Positions, SIZE } from "./Config";

interface ItemProps {
  children: ReactNode;
  id: string;
  positions: Animated.SharedValue<Positions>;
}

const Item = ({ children, positions, id }: ItemProps) => {
  const inset = useSafeAreaInsets();
  const containerHeight =
    Dimensions.get("window").height - inset.top - inset.bottom;
  // const contentHeight = (Object.keys(positions.value).length / COL) * SIZE;
  const position = getPosition(positions.value[id]) //positions[id] is a position;
  // const position = getPosition(getOrder(p1.x, p1.y))
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  // console.log(positions.value[id], id, position)
  const style = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: SIZE,
      height: SIZE,
      margin: 2,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value }
      ],
      backgroundColor: 'red'
    }
  })
  // console.log(positions[id], id)
  return <Animated.View style={style}>{children}</Animated.View>;//Defining this view in order to translate children's parent view
};

export default Item;

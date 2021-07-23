import React, { ReactNode } from "react";
import { Dimensions, View } from "react-native";
import Animated from "react-native-reanimated";
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
  const p1 = getPosition(positions.value[id]) //positions[id] is a position;
  const position = getPosition(getOrder(p1.x, p1.y))
  console.log(positions.value[id], id, position, getOrder(p1.x, p1.y))
  const style = { 
    position: 'absolute',
    top: 0,
    left: 0,
    width: SIZE,
    height: SIZE,
    margin:2,
    transform: [
      {translateX: position.x},
      {translateY: position.y}
    ],
    backgroundColor: 'red'
  }
  // console.log(positions[id], id)
  return <View style={style}>{children}</View>;//Defining this view in order to translate children's parent view
};

export default Item;

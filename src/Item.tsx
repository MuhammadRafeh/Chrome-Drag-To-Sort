import React, { ReactNode } from "react";
import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COL, getPosition, Positions, SIZE } from "./Config";

interface ItemProps {
  children: ReactNode;
  id: string;
  positions: Positions;
}

const Item = ({ children, positions, id }: ItemProps) => {
  const inset = useSafeAreaInsets();
  const containerHeight =
    Dimensions.get("window").height - inset.top - inset.bottom;
  // const contentHeight = (Object.keys(positions.value).length / COL) * SIZE;
  const position = getPosition(positions[id]) //positions[id] is a position;
  const style = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SIZE,
    height: SIZE,
    transform: [
      {translateX: position.x},
      {translateY: position.y}
    ]
  }
  return <View style={style}>{children}</View>;
};

export default Item;

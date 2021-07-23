import React, { ReactNode } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COL, getOrder, getPosition, Positions, SIZE } from "./Config";
import { PanGestureHandler } from "react-native-gesture-handler";

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
  // const isGestureStart = useSharedValue(false);
  // console.log(positions.value[id], id, position)

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context: any) => { //we keep record of already done tranlation because gesture event always start with 0;
      console.log(111111111111111111111, translateX.value)
      context.xOffset = translateX.value
      context.yOffset = translateY.value
    },
    onActive: (event, context) => {
      // console.log(event)
      translateX.value = context.xOffset + event.translationX;
      translateY.value = context.yOffset + event.translationY;
    },
    onEnd: (event, context) => {
      const firstPosition = getPosition(positions.value[id]);
      translateX.value = withTiming(firstPosition.x)
      translateY.value = withTiming(firstPosition.y)
    }
  })


  const style = useAnimatedStyle(() => {
    return {
      transform: [
        // {scale: isGestureStart.value ? 1.2: 1},
        { translateX: translateX.value },
        { translateY: translateY.value }
      ],
      // backgroundColor: 'red'
    }
  })
  // console.log(positions[id], id)
  //Defining this view in order to translate children's parent view

  return <PanGestureHandler onGestureEvent={onGestureEvent}>
    <Animated.View style={[styles.box, style]}>{children}</Animated.View>
  </PanGestureHandler>
};

export default Item;

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SIZE,
    height: SIZE,
    margin: 2,
  }
})

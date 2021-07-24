import React, { ReactNode, RefObject } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Animated, { useAnimatedGestureHandler, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { animationConfig, COL, getOrder, getPosition, Positions, SIZE } from "./Config";
import { PanGestureHandler } from "react-native-gesture-handler";

interface ItemProps {
  children: ReactNode;
  id: string;
  positions: Animated.SharedValue<Positions>;
  scrollView: RefObject<Animated.ScrollView>;
  scrollY: Animated.SharedValue<number>
}
const Item = ({ children, positions, id, scrollView, scrollY }: ItemProps) => {
  const inset = useSafeAreaInsets();
  const containerHeight =
    Dimensions.get("window").height - inset.top - inset.bottom;
  const contentHeight = (Object.keys(positions.value).length / COL) * SIZE;
  const position = getPosition(positions.value[id]) //positions[id] is a position;
  // const position = getPosition(getOrder(p1.x, p1.y))
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  const isGestureActive = useSharedValue(false); //positions = {'chrome': 7}
  useAnimatedReaction(() => positions.value[id], (newOrder) => { // litening to value and if value change the next function called
    const newPosition = getPosition(newOrder);
    translateX.value = withTiming(newPosition.x, animationConfig);
    translateY.value = withTiming(newPosition.y, animationConfig);
  });
  // console.log(positions.value[id], id, position)

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context: any) => { //we keep record of already done tranlation because gesture event always start with 0;
      // console.log(111111111111111111111, translateX.value)
      context.xOffset = translateX.value
      context.yOffset = translateY.value
      isGestureActive.value = true;
    },
    onActive: (event, context) => {
      // console.log(event)
      translateX.value = context.xOffset + event.translationX;
      translateY.value = context.yOffset + event.translationY;
      const oldOrder = positions.value[id];
      const newOrder = getOrder(translateX.value, translateY.value);
      if (oldOrder != newOrder){ //Object.keys(positions.value) is ['chrome', 'github', ....] positions.value[key] = order
        const idToSwap = Object.keys(positions.value).find(key => positions.value[key] === newOrder)
        // const idToSwap = Object.keys(positions.value).find
        // console.log(idToSwap);
        if (idToSwap){
          const newPositions = JSON.parse(JSON.stringify(positions.value)) //BY THIS we are cloning object supported by reanimated
          newPositions[id] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions;
        }
      }
      const lowerBound = scrollY.value;
      const upperBound = scrollY.value + containerHeight - SIZE;// To move earlier we are removing the SIZE of the tab
      const maxScroll = contentHeight - containerHeight; //Kitna scroll kr sakty hm from the container to top or bottom
      const scrollLeft = maxScroll - scrollY.value// nichy ki taraf scroll kitna bacha;
    },
    onEnd: (event, context) => {
      const destination = getPosition(positions.value[id]);
      translateX.value = withTiming(destination.x, animationConfig, () => {
        isGestureActive.value = false
      })
      translateY.value = withTiming(destination.y, animationConfig)
    }
  })


  const style = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 99: 0;
    const scale = isGestureActive.value ? 1.1: 1;
    return {
      zIndex,
      transform: [
        // {scale: isGestureStart.value ? 1.2: 1},
        { translateX: translateX.value },
        { translateY: translateY.value },
        {scale}
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

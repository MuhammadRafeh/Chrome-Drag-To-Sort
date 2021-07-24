import React, { ReactElement } from "react";

import Item from "./Item";
import { COL, Positions, SIZE } from "./Config";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue,  } from "react-native-reanimated";

interface ListProps {
  children: ReactElement<{ id: string }>[];
}
//position is object{'chrome': 0, 'github': 1, .....}
//chrome: 1 // github: 0

const List = ({ children }: ListProps) => {
  const positions = useSharedValue<Positions>(
    Object.assign( // {id (str): position (number),.... }
      {},
      ...children.map((child, index) => ({ [child.props.id]: index })) // Here index is a order
    )
  );
  const scrollviewRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);
  // console.log(positions, children[0].props.uri);
  //TODO
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    }
  })
  
  return (
    <Animated.ScrollView
      ref={scrollviewRef}
      contentContainerStyle={{
        height: Math.ceil(children.length / COL) * SIZE,
        // backgroundColor: 'green'
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      onScroll={onScroll}
    >
      {children.map((child) => {
        return (
          <Item scrollView={scrollviewRef} key={child.props.id} id={child.props.id} positions={positions} scrollY={scrollY}>
            {child}
          </Item>
        );
      })}
    </Animated.ScrollView>
  );
};

export default List;

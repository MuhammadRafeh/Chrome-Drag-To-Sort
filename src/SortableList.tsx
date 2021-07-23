import React, { ReactElement } from "react";
import { ScrollView } from "react-native-gesture-handler";

import Item from "./Item";
import { COL, Positions, SIZE } from "./Config";
import { useSharedValue } from "react-native-reanimated";

interface ListProps {
  children: ReactElement<{ id: string }>[];
}

const List = ({ children }: ListProps) => {
  const positions = useSharedValue<Positions>(
    Object.assign( // {id (str): position (number),.... }
      {},
      ...children.map((child, index) => ({ [child.props.id]: index })) // Here index is a order
    )
  );
  // console.log(positions, children[0].props.uri);
  return (
    <ScrollView
      contentContainerStyle={{
        height: Math.ceil(children.length / COL) * SIZE,
        // backgroundColor: 'green'
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
    >
      {children.map((child) => {
        return (
          <Item key={child.props.id} id={child.props.id} positions={positions}>
            {child}
          </Item>
        );
      })}
    </ScrollView>
  );
};

export default List;

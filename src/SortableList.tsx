import React, { ReactElement } from "react";
import { ScrollView } from "react-native-gesture-handler";

import Item from "./Item";
import { COL, Positions, SIZE } from "./Config";

interface ListProps {
  children: ReactElement<{ id: string }>[];
}

const List = ({ children }: ListProps) => {
  const positions: Positions = Object.assign( // {id (str): position (number),.... }
    {},
    ...children.map((child, index) => ({ [child.props.id]: index })) // Here index is a position
  );
  // console.log(positions, children[0].props.uri);
  return (
    <ScrollView
      contentContainerStyle={{
        height: Math.ceil(children.length / COL) * SIZE,
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

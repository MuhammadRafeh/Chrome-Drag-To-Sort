import { Dimensions } from "react-native";
import { Easing } from "react-native-reanimated";

export interface Positions { 
  [id: string]: number;//id = 'google', number is order
}

const { width } = Dimensions.get("window");
export const MARGIN = 8;
export const SIZE = width / 2 - MARGIN;
export const COL = 2;

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};

export const getPosition = (order: number) => { //position on screen
  "worklet";
  return { //this will apply according to parent view
    x: (order % COL) * SIZE, // order % COL gives 0 | 1 //x return 0 || SIZE
    y: Math.floor(order / COL) * SIZE //Math.floor => 7.98 gives us 7 gives lower number or equal
  };
}

export const getOrder = (x: number, y: number) => {// return order of item
  "worklet";
  const col = Math.round(x / SIZE) //0 || 1
  const row = Math.round(y / SIZE)// 0, 1, ....
  return row * COL + col;
}

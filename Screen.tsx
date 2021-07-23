import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
  useAnimatedGestureHandler,
  withDelay
} from 'react-native-reanimated';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import React, {useEffect, useRef} from 'react';
import { PanGestureHandler, PinchGestureHandler } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
// export default function AnimatedStyleUpdateExample(props) {
//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);
//   const scale = useSharedValue(1);
//   const state = useSharedValue(undefined);
//   const focalX = useSharedValue(0);
//   const focalY = useSharedValue(0);
//   const originX = useSharedValue(0);
//   const originY = useSharedValue(0);
//   // const config = {
//   //   duration: 500,
//   //   easing: Easing.bezier(0.5, 0.01, 0, 1),
//   // };
//   // runOn
//   const gestureHandler = useAnimatedGestureHandler({
//     onStart: (event, context) => {
//       // context.startX = translateX.value;
//       // context.startY = translateY.value;
//       // context.scale = scale.value;
//       // scale.value = 1;
//       originX.value = focalX.value
//       originY.value = focalY.value
//     },
//     onActive: (event, context) => {
//       console.log(event)
//       scale.value = event.scale;
//       state.value = event.state;
//       focalX.value = event.focalX;
//       focalY.value = event.focalY;
//       // translateX.value = context.startX  + event.translationX;
//       // translateY.value = context.startY + event.translationY;
//     },
//     onEnd: (event, context) => {
//       scale.value = withSpring(1);
//     }
//   })

//   const style = useAnimatedStyle(() => {
//     return {
//       // width: withTiming(randomWidth.value, config),
//       transform: [
//         // {translateX: translateX.value },
//         // {translateY: translateY.value},
//         { scale: scale.value }
//       ],

//     };
//   });

//   return (
//     <View
//       style={{
//         flex: 1,
//         flexDirection: 'column',
//         zIndex: 999
//       }}>
//       <PinchGestureHandler onGestureEvent={gestureHandler}>
//         <Animated.View
//           style={[
//             styles.box,
//             style
//           ]}
//           ref
//         >
//           {/* <Animated.Image
//             source={require('./dp.jpg')} 
//             style={{ width: '100%', height: 300, zIndex: 1}} 
//             resizeMode={'contain'} /> */}
//           <Text style={{ color: 'green' }}>asd</Text>
//         </Animated.View>
//       </PinchGestureHandler>
//       <View style={{zIndex: 1}}>

//         <Button

//           title="toggle"
//           onPress={() => {
//             translateY.value = 0;
//             translateX.value = 0;
//           }}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   box: {
//     width: '100%',
//     height: 300,
//     backgroundColor: 'black',
//     marginTop: 70,
//     // transform: [
//     //   {translateX: -width/2},
//     //   // {rotateZ: '45'},
//     //   {rotateZ: `${Math.PI/1}deg`},
//     //   {translateX: width/2}
//     // ]
//     zIndex: 1
//     // transform: [{}]
//   }
// });
// --------------------------------------------------------------

export default function App(){


  
  // const styles = useAnimatedStyle(() => {
  //   return {

  //   }
  // })
  const view = useRef(null);

  useEffect(() => {
    setTimeout(view.current.measure( (fx, fy, width, height, px, py) => {
      console.log('Component width is: ' + width)
      console.log('Component height is: ' + height)
      console.log('X offset to frame: ' + fx)
      console.log('Y offset to frame: ' + fy)
      console.log('X offset to page: ' + px)
      console.log('Y offset to page: ' + py)
  }), 0)
  }, [view])
  
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', margin: 20}}>
      <View style={{height: 100, width: '40%', backgroundColor: 'black', margin: 10 }} ref={view} onLayout={(e) => console.log(e.nativeEvent)}/>
      <View style={{height: 100, width: '40%', backgroundColor: 'blue', margin: 10}}/>
      <View style={{height: 100, width: '40%', backgroundColor: 'green', margin: 10}}/>
      <View style={{height: 100, width: '40%', backgroundColor: 'red', margin: 10}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 100, 
    width: '40%', 
    backgroundColor: 'black', 
    margin: 10 
  }
});
import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { MARGIN, SIZE } from "./Config";
import Tile from "./Tile";
import SortableList from "./SortableList";
// import { SafeAreaProvider } from 'react-native-safe-area-context';

const tiles = [
  {
    id: "google",
    uri: "https://google.com",
  },

  {
    id: "expo",
    uri: "https://expo.io",
  },
  {
    id: "facebook",
    uri: "https://facebook.com",
  },
  {
    id: "reanimated",
    uri: "https://docs.swmansion.com/react-native-reanimated/",
  },
  {
    id: "github",
    uri: "https://github.com",
  },
  {
    id: "rnnavigation",
    uri: "https://reactnavigation.org/",
  },
  {
    id: "youtube",
    uri: "https://youtube.com",
  },
  {
    id: "twitter",
    uri: "https://twitter.com",
  },
];

const Chrome = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "black", paddingHorizontal: MARGIN }}
      >
        <SortableList>
          {[...tiles, ...tiles].map((tile, index) => (
            <Tile
              onLongPress={() => true}
              key={tile.id + '-' + index}
              id={tile.id + '-' + index}
              uri={tile.uri}
            />
          ))}
        </SortableList>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Chrome;

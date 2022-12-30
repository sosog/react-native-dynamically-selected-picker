# react-native-dynamically-selected-picker

React Native Picker for Android and IOS with dynamically updating selected items on scroll.
Idea was taken at [react-native-swipe-picker]( https://github.com/ninio/react-native-swipe-picker
)


![](README/android.gif)
![](README/ios.gif)

## installation

`yarn add react-native-dynamically-selected-picker react-native-linear-gradient`

or

`npm i react-native-dynamically-selected-picker react-native-linear-gradient --safe`

Then, if you didn't install `react-native-linear-gradient` before: Enter command `cd /ios` and `pod install`. Now you can run project

#Basic usage

```
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import DynamicallySelectedPicker from 'react-native-dynamically-selected-picker';

export default function App() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const initialSelectedIndex = 1;
  const windowWidth = Dimensions.get('window').width;
  const height = 300;

  return (
    <View style={styles.container}>
      <DynamicallySelectedPicker
        items={[
          {
            value: 1,
            label: 'Item 1',
          },
          {
            value: 2,
            label: 'Item 2',
          },
          {
            value: 3,
            label: 'Item 3',
          },
          {
            value: 4,
            label: 'Item 4',
            itemColor: 'blue',
          },
          {
            value: 5,
            label: 'Item 5',
          },
        ]}
        onScroll={({ index }) => setSelectedItemIndex(index)}
        onMomentumScrollBegin={({ index }) => setSelectedItemIndex(index)}
        onMomentumScrollEnd={({ index }) => setSelectedItemIndex(index)}
        onScrollBeginDrag={({ index }) => setSelectedItemIndex(index)}
        onScrollEndDrag={({ index }) => setSelectedItemIndex(index)}
        initialSelectedIndex={initialSelectedIndex}
        height={height}
        width={windowWidth}
      />
      <View style={styles.selectedItemWrapper}>
        <Text>Selected item index {selectedItemIndex}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  gradientWrapper: {
    position: 'absolute',
    width: '100%',
  },
  selectedItemWrapper: { marginTop: 50 },
});

```

## Properties

| Prop           |     Default     |   Type   | Description                                                                                                 |
| :------------- | :-------------: | :------: | :---------------------------------------------------------------------------------------------------------- |
| items     |     [{value: 0, label: 'No items', itemColor: 'black'}]       |  `Array<object>` | - |
| onScroll     |      -       |  `func` | Returns selected selected index  |
| onMomentumScrollBegin     |      -       |  `func` | Returns selected selected index  |
| onMomentumScrollEnd     |      -       |  `func` | Returns selected selected index  |
| onScrollBeginDrag     |      -       |  `func` | Returns selected selected index  |
| onScrollEndDrag     |      -       |  `func` | Returns selected selected index  |
| initialSelectedIndex          |        0        | `number` | Set index number of initial item.                                                                              |
| transparentItemRows   |     3      |  `number`  | Set number of items at top and bottom of selected index.                                                                |
| width   |     300      |  `number`  | -                                                                |
| height   |     300      |  `number`  | -                                                                |
| allItemsColor          |      #000       |  `string`  | - |
| selectedItemBorderColor          |      '#cecece'       |  `string`  | - |
| fontSize          |      -       |  `number`  | - |
| fontFamily          |     'Arial'       |  `string`  | - |
| topGradientColors | [...] |  `Array<string>`  | See default value in source.
| bottomGradientColors | [...] |  `Array<string>`  | See default value in source.                                                            |

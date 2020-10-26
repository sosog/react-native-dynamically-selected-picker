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
import React from 'react';
import {View, Text, Dimensions} from 'react-native';

import DynamicallySelectedPicker from 'react-native-dynamically-selected-picker';

export default class Example extends React.Component {
  state = {
    selectedItemIndex: 0,
  };

  updateSelectedItem(index) {
    this.setState({selectedItemIndex: index});
  }

  render() {
    const windowWidth = Dimensions.get('window').width;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
            },
            {
              value: 5,
              label: 'Item 5',
            },
          ]}
          onScroll={({index, item}) => {
            this.updateSelectedItem(index);
          }}
          height={300}
          width={windowWidth}
        />
        <View style={{marginTop: 50}}>
          <Text>Selected item index {this.state.selectedItemIndex}</Text>
        </View>
      </View>
    );
  }
}

```

## Properties

| Prop           |     Default     |   Type   | Description                                                                                                 |
| :------------- | :-------------: | :------: | :---------------------------------------------------------------------------------------------------------- |
| items     |     [{value: 0, label: 'No items', itemColor: 'red'}]       |  `Array<object>` | - |
| onScroll     |      -       |  `func` | Returns selected item object and selected index  |
| onMomentumScrollBegin     |      -       |  `func` | Returns selected item object and selected index  |
| onMomentumScrollEnd     |      -       |  `func` | Returns selected item object and selected index  |
| onScrollBeginDrag     |      -       |  `func` | Returns selected item object and selected index  |
| onScrollEndDrag     |      -       |  `func` | Returns selected item object and selected index  |
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

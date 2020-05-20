# react-native-dynamically-selected-picker

React Native Picker for Android and IOS with dynamically updating selected items on scroll.

![](src/README/android.gif)
![](src/README/ios.gif)

## installation

`yarn add react-native-dynamically-selected-picker`

or

`npm i react-native-dynamically-selected-picker`

#Basic usage

```
import DynamicallySelectedPicker from 'react-native-dynamically-selected-picker';

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
  ]}
  onScrollDynamicallyChange={({index, item}) => {
    this.setState({selectedItemIndex: index});
  }}
  height={300}
  width={300}
/>
```

## Properties

| Prop           |     Default     |   Type   | Description                                                                                                 |
| :------------- | :-------------: | :------: | :---------------------------------------------------------------------------------------------------------- |
| items     |     [{value: 0, label: 'No items'}]       |  `Array<object>` | - |
| onScrollDynamicallyChange     |      -       |  `func` | Returns selected item object and selected index  |
| onScrollBegin     |      -       |  `func` | Returns selected item object and selected index  |
| onScrollEnd     |      -       |  `func` | Returns selected item object and selected index  |
| initialSelectedIndex          |        0        | `number` | Set index number of initial item.                                                                              |
| transparentItemRows   |     3      |  `number`  | Set number of items at top and bottom of selected index.                                                                |
| width   |     200      |  `number`  | -                                                                |
| height   |     200      |  `number`  | -                                                                |
| itemsColor          |      #000       |  `string`  | - |
| selectedItemBorderColor          |      '#cecece'       |  `string`  | - |
| fontSize          |      -       |  `number`  | - |
| fontFamily          |     'Arial       |  `string`  | - |
| topGradientColors | [...] |  `Array<string>`  | See default value in source.                                                          
| bottomGradientColors | [...] |  `Array<string>`  | See default value in source.                                                            |

import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import DynamicallySelectedPicker from 'react-native-dynamically-selected-picker';
import CustomPickerListItem from './components/CustomPickerListItem';

export default function App() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [selectedCustomItemIndex, setSelectedCustomItemIndex] =
    useState<number>(0);

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

      <View style={styles.selectedItemWrapper}>
        <Text>Example of custom rendering</Text>
        <Text>(Selected item index {selectedCustomItemIndex})</Text>
      </View>

      <DynamicallySelectedPicker
        items={[
          {
            value: 1,
            label: 'Red',
            boxColour: 'red',
          },
          {
            value: 2,
            label: 'Green',
            boxColour: 'green',
          },
          {
            value: 3,
            label: 'Blue',
            boxColour: 'blue',
          },
        ]}
        renderItem={CustomPickerListItem}
        onScroll={({ index }) => setSelectedCustomItemIndex(index)}
        onMomentumScrollBegin={({ index }) => setSelectedCustomItemIndex(index)}
        onMomentumScrollEnd={({ index }) => setSelectedCustomItemIndex(index)}
        onScrollBeginDrag={({ index }) => setSelectedCustomItemIndex(index)}
        onScrollEndDrag={({ index }) => setSelectedCustomItemIndex(index)}
        height={214}
        width={windowWidth}
        transparentItemRows={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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
  selectedItemWrapper: {
    alignItems: 'center',
    marginTop: 25,
  },
});

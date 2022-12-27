import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

import { DynamicallySelectedPickerList } from 'react-native-dynamically-selected-picker';

export default function Example() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const initialSelectedIndex = 1;
  const windowWidth = Dimensions.get('window').width;
  const height = 300;

  return (
    <View style={styles.pickerWrapper}>
      <DynamicallySelectedPickerList
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
  pickerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientWrapper: {
    position: 'absolute',
    width: '100%',
  },
  selectedItemWrapper: { marginTop: 50 },
});

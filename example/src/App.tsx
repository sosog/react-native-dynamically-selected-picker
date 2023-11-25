import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import DynamicallySelectedPicker from 'react-native-dynamically-selected-picker';
import CustomPickerListItem from './components/CustomPickerListItem';

export default function App() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [selectedHorizontalItemIndex, setSelectedHorizontalItemIndex] =
    useState<number>(0);
  const [selectedCustomItemIndex, setSelectedCustomItemIndex] =
    useState<number>(0);

  const initialSelectedIndex = 1;
  const windowWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <View style={styles.selectedItemWrapper}>
        <Text>Default rendering</Text>
        <Text>Selected item index: {selectedItemIndex}</Text>
      </View>

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
        height={300}
        width={windowWidth}
      />

      <View style={styles.selectedItemWrapper}>
        <Text>Example of a Horizontal Picker</Text>
      </View>

      <View style={styles.horizontalPickerWrapper}>
        <View style={styles.container}>
          <Text>Selected Index: {selectedHorizontalItemIndex}</Text>
        </View>
        <View style={styles.horizontalPicker}>
          <DynamicallySelectedPicker
            items={[
              {
                value: 1,
                label: '1',
              },
              {
                value: 2,
                label: '2',
              },
              {
                value: 3,
                label: '3',
              },
              {
                value: 4,
                label: '4',
              },
              {
                value: 5,
                label: '5',
              },
            ]}
            onScroll={({ index }) => setSelectedHorizontalItemIndex(index)}
            onMomentumScrollBegin={({ index }) =>
              setSelectedHorizontalItemIndex(index)
            }
            onMomentumScrollEnd={({ index }) =>
              setSelectedHorizontalItemIndex(index)
            }
            onScrollBeginDrag={({ index }) =>
              setSelectedHorizontalItemIndex(index)
            }
            onScrollEndDrag={({ index }) =>
              setSelectedHorizontalItemIndex(index)
            }
            initialSelectedIndex={3}
            horizontal={true}
            height={30}
            width={windowWidth * 0.666}
            fontSize={24}
            transparentItemRows={2}
          />
        </View>
      </View>

      <View style={styles.selectedItemWrapper}>
        <Text>Example of custom rendering</Text>
        <Text>Selected item index: {selectedCustomItemIndex}</Text>
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
        height={128}
        width={windowWidth}
        transparentItemRows={1}
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
    fontSize: 16,
  },
  selectedItemWrapper: {
    alignItems: 'center',
    margin: 12,
  },
  horizontalPickerWrapper: {
    flexDirection: 'row',
  },
  horizontalPicker: {
    flex: 2,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

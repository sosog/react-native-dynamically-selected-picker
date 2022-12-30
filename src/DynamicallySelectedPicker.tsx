import React, { createRef, useState } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DynamicallySelectedPickerListItem from './DynamicallySelectedPickerListItem';
import type { ListItem, PickerProps } from './types/pickerTypes';

export default function DynamicallySelectedPicker({
  items = [{ value: 0, label: 'No items', itemColor: 'red' }],
  onScroll,
  onScrollBeginDrag,
  onScrollEndDrag,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  width = 300,
  height = 300,
  initialSelectedIndex = 0,
  transparentItemRows = 3,
  allItemsColor = '#000',
  fontFamily = 'Arial',
  fontSize,
  selectedItemBorderColor = '#cecece',
  topGradientColors = [
    'rgba( 255, 255, 255, 1 )',
    'rgba( 255, 255, 255, 0.9 )',
    'rgba( 255, 255, 255, 0.7 )',
    'rgba( 255, 255, 255, 0.5 )',
  ],
  bottomGradientColors = [
    'rgba( 255, 255, 255, 0.5 )',
    'rgba( 255, 255, 255, 0.7 )',
    'rgba( 255, 255, 255, 0.9 )',
    'rgba( 255, 255, 255, 1 )',
  ],
}: PickerProps) {
  let itemHeightInitial = height / (transparentItemRows * 2 + 1);
  if (Platform.OS === 'ios') {
    itemHeightInitial = Math.ceil(itemHeightInitial);
  }
  const [itemHeight] = useState<number>(itemHeightInitial);
  const [itemIndex, setItemIndex] = useState<number>(initialSelectedIndex);

  const scrollViewRef = createRef<ScrollView>();

  const scrollToInitialPosition = () => {
    scrollViewRef.current?.scrollTo({
      y: itemHeight * initialSelectedIndex,
    });
  };

  function fakeItems(n = 3) {
    const itemsArr = [];
    for (let i = 0; i < n; i++) {
      itemsArr[i] = {
        value: -1,
        label: '',
      };
    }
    return itemsArr;
  }

  function allItemsLength() {
    return extendedItems().length - transparentItemRows * 2;
  }

  function onScrollListener(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if(onScroll != null) {
      const index = getItemIndex(event);
      if (itemIndex !== index && index >= 0 && index < allItemsLength()) {
        setItemIndex(index);
        onScroll({ index });
      }
    }
  }

  function onMomentumScrollBeginListener(
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) {
    if (onMomentumScrollBegin != null) {
      const index = getItemIndex(event);
      if (index >= 0 && index < allItemsLength()) {
        setItemIndex(index);
        onMomentumScrollBegin({ index });
      }
    }
  }

  function onMomentumScrollEndListener(
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) {
    if (onMomentumScrollEnd != null) {
      const index = getItemIndex(event);

      if (index >= 0 && index < allItemsLength()) {
        setItemIndex(index);
        onMomentumScrollEnd({ index });
      }
    }
  }

  function onScrollBeginDragListener(
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) {
    if (onScrollBeginDrag != null) {
      const index = getItemIndex(event);

      if (index >= 0 && index < allItemsLength()) {
        setItemIndex(index);
        onScrollBeginDrag({ index });
      }
    }
  }

  function onScrollEndDragListener(
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) {
    if (onScrollEndDrag != null) {
      const index = getItemIndex(event);

      if (index >= 0 && index < allItemsLength()) {
        setItemIndex(index);
        onScrollEndDrag({ index });
      }
    }
  }

  function getItemIndex(event: NativeSyntheticEvent<NativeScrollEvent>) {
    return Math.round(event.nativeEvent.contentOffset.y / itemHeight);
  }

  function extendedItems() {
    return [
      ...fakeItems(transparentItemRows),
      ...items,
      ...fakeItems(transparentItemRows),
    ];
  }

  const position = {
    top: 0,
    bottom: 0,
  };

  const border = {
    topWidth: 1,
    bottomWidth: 1,
  };

  return (
    <View style={{ height, width }}>
      <ScrollView
        ref={scrollViewRef}
        onLayout={scrollToInitialPosition}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollBegin={onMomentumScrollBeginListener}
        onMomentumScrollEnd={onMomentumScrollEndListener}
        onScrollBeginDrag={onScrollBeginDragListener}
        onScrollEndDrag={onScrollEndDragListener}
        onScroll={onScrollListener}
        scrollEventThrottle={20}
        snapToInterval={itemHeight}
      >
        {extendedItems().map((item: ListItem, index) => {
          return (
            <DynamicallySelectedPickerListItem
              key={index}
              label={item.label}
              itemColor={item.itemColor}
              allItemsColor={allItemsColor}
              fontSize={fontSize ? fontSize : itemHeight / 2}
              fontFamily={fontFamily}
              height={itemHeight}
            />
          );
        })}
      </ScrollView>
      <View
        style={[
          styles.gradientWrapper,
          {
            top: border.topWidth,
            borderBottomWidth: border.bottomWidth,
            borderBottomColor: selectedItemBorderColor,
          },
        ]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={topGradientColors}
          style={[
            styles.pickerGradient,
            {
              height: transparentItemRows * itemHeight,
            },
          ]}
        />
      </View>
      <View
        style={[
          styles.gradientWrapper,
          {
            bottom: position.bottom,
            borderTopWidth: border.topWidth,
            borderTopColor: selectedItemBorderColor,
          },
        ]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={bottomGradientColors}
          style={[
            styles.pickerGradient,
            { height: transparentItemRows * itemHeight },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientWrapper: {
    position: 'absolute',
    width: '100%',
  },
  pickerGradient: {
    width: '100%',
  },
});

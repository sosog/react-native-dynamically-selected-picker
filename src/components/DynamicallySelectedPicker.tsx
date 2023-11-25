import React, { createRef, useState } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DynamicallySelectedPickerListItem from './DynamicallySelectedPickerListItem';
import type { ListItem, PickerProps } from '../types/pickerTypes';

const itemDefaults: Array<ListItem> = [
  {
    label: 'No items',
    value: 0,
    itemColor: 'red',
  },
];

export default function DynamicallySelectedPicker<ItemT extends ListItem>({
  items = itemDefaults as unknown as Array<ItemT>,
  onScroll,
  onScrollBeginDrag,
  onScrollEndDrag,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  renderItem = DynamicallySelectedPickerListItem,
  width = 300,
  height = 300,
  horizontal = false,
  initialSelectedIndex = 0,
  transparentItemRows = 3,
  allItemsColor = '#000',
  fontFamily = 'Arial',
  fontSize,
  selectedItemBorderColor = '#cecece',
  renderGradientOverlay = true,
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
}: PickerProps<ItemT>) {
  // work out the size of each 'slice' so it fits in the size of the view
  const itemSize = Math.ceil(
    (horizontal ? width : height) / (transparentItemRows * 2 + 1)
  );

  const [itemIndex, setItemIndex] = useState<number>(initialSelectedIndex);

  // create a reference to the scroll view so we can control it's fine scroll
  const scrollViewRef = createRef<ScrollView>();

  const scrollToInitialPosition = () => {
    scrollViewRef.current?.scrollTo(
      horizontal
        ? { x: itemSize * initialSelectedIndex, animated: false }
        : { y: itemSize * initialSelectedIndex, animated: false }
    );
  };

  function fakeItems(n = 3): Array<ItemT> {
    const itemsArr = [];
    for (let i = 0; i < n; i++) {
      itemsArr[i] = {
        value: -1,
        label: '',
        fakeItem: true,
      };
    }
    return itemsArr as Array<ItemT>;
  }

  function allItemsLength() {
    return extendedItems().length - transparentItemRows * 2;
  }

  function onScrollListener(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (onScroll != null) {
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
    const offset = horizontal
      ? event.nativeEvent.contentOffset.x
      : event.nativeEvent.contentOffset.y;

    return Math.round(offset / itemSize);
  }

  function extendedItems(): Array<ItemT> {
    return [
      ...fakeItems(transparentItemRows),
      ...items,
      ...fakeItems(transparentItemRows),
    ];
  }

  const position = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  const border = {
    width: 1,
  };

  // calculate the gradient size
  const gradientSize = Math.round(
    ((horizontal ? width : height) - itemSize) / 2
  );

  const PickerListItem = renderItem;

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
        horizontal={horizontal}
        snapToInterval={itemSize}
      >
        {extendedItems().map((item: ItemT, index) => {
          return (
            <PickerListItem
              key={index}
              item={item}
              fakeItem={item.fakeItem ? item.fakeItem : false}
              isSelected={itemIndex + transparentItemRows === index}
              allItemsColor={allItemsColor}
              fontSize={fontSize ? fontSize : itemSize / 2}
              fontFamily={fontFamily}
              horizontal={horizontal}
              height={itemSize}
            />
          );
        })}
      </ScrollView>
      {horizontal ? (
        <>
          {renderGradientOverlay && (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={topGradientColors}
              style={[
                styles.gradientHorizontalWrapper,
                {
                  left: position.left,
                  width: gradientSize,
                },
              ]}
              pointerEvents="none"
            />
          )}
          <View
            style={[
              styles.gradientHorizontalWrapper,
              {
                left: gradientSize,
                borderLeftWidth: border.width,
                borderLeftColor: selectedItemBorderColor,
              },
            ]}
            pointerEvents="none"
          />
          {renderGradientOverlay && (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={bottomGradientColors}
              style={[
                styles.gradientHorizontalWrapper,
                {
                  right: position.right,
                  width: gradientSize,
                },
              ]}
              pointerEvents="none"
            />
          )}
          <View
            style={[
              styles.gradientHorizontalWrapper,
              {
                right: gradientSize,
                borderRightWidth: border.width,
                borderRightColor: selectedItemBorderColor,
              },
            ]}
            pointerEvents="none"
          />
        </>
      ) : (
        <>
          {renderGradientOverlay && (
            <LinearGradient
              colors={topGradientColors}
              style={[
                styles.gradientVerticalWrapper,
                {
                  top: position.top,
                  height: gradientSize,
                },
              ]}
              pointerEvents="none"
            />
          )}
          <View
            style={[
              styles.gradientVerticalWrapper,
              {
                top: gradientSize,
                borderBottomWidth: border.width,
                borderBottomColor: selectedItemBorderColor,
              },
            ]}
            pointerEvents="none"
          />
          {renderGradientOverlay && (
            <LinearGradient
              colors={bottomGradientColors}
              style={[
                styles.gradientVerticalWrapper,
                {
                  bottom: position.bottom,
                  height: gradientSize,
                },
              ]}
              pointerEvents="none"
            />
          )}
          <View
            style={[
              styles.gradientVerticalWrapper,
              {
                bottom: gradientSize,
                borderTopWidth: border.width,
                borderTopColor: selectedItemBorderColor,
              },
            ]}
            pointerEvents="none"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientVerticalWrapper: {
    position: 'absolute',
    width: '100%',
  },
  gradientHorizontalWrapper: {
    position: 'absolute',
    height: '100%',
  },
});

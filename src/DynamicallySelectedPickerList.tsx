import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { DynamicallySelectedPickerListItem } from './DynamicallySelectedPickerListItem';

export function DynamicallySelectedPickerList(props) {
  let itemHeightInitial = props.height / (props.transparentItemRows * 2 + 1);
  if (Platform.OS === 'ios') {
    itemHeightInitial = Math.ceil(itemHeightInitial);
  }
  const [itemHeight] = useState<number>(itemHeightInitial);
  const [itemIndex, setItemIndex] = useState<number>(
    props.initialSelectedIndex
  );

  const scrollViewRef = createRef<ScrollView>();

  const scrollToInitialPosition = () => {
    scrollViewRef.current?.scrollTo({
      y: itemHeight * props.initialSelectedIndex,
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
    return extendedItems().length - props.transparentItemRows * 2;
  }

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = getItemIndex(event);
    if (itemIndex !== index && index >= 0 && index < allItemsLength()) {
      setItemIndex(index);
      props.onScroll({ index, item: props.items[index] });
    }
  }

  function onMomentumScrollBegin(
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) {
    const index = getItemIndex(event);

    if (index >= 0 && index < allItemsLength()) {
      setItemIndex(index);
      props.onMomentumScrollBegin({ index, item: props.items[index] });
    }
  }

  function onMomentumScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = getItemIndex(event);

    if (index >= 0 && index < allItemsLength()) {
      setItemIndex(index);
      props.onMomentumScrollEnd({ index, item: props.items[index] });
    }
  }

  function onScrollBeginDrag(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = getItemIndex(event);

    if (index >= 0 && index < allItemsLength()) {
      setItemIndex(index);
      props.onScrollBeginDrag({ index, item: props.items[index] });
    }
  }

  function onScrollEndDrag(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = getItemIndex(event);

    if (index >= 0 && index < allItemsLength()) {
      setItemIndex(index);
      props.onScrollEndDrag({ index, item: props.items[index] });
    }
  }

  function getItemIndex(event: NativeSyntheticEvent<NativeScrollEvent>) {
    return Math.round(event.nativeEvent.contentOffset.y / itemHeight);
  }

  function extendedItems() {
    const { transparentItemRows } = props;
    return [
      ...fakeItems(transparentItemRows),
      ...props.items,
      ...fakeItems(transparentItemRows),
    ];
  }

  const {
    width,
    height,
    topGradientColors,
    bottomGradientColors,
    transparentItemRows,
    allItemsColor,
    fontSize,
    fontFamily,
    selectedItemBorderColor,
  } = props;

  const position = {
    top: 0,
    bottom: 0,
  };

  const border = {
    topWidth: 1,
    bottomWidth: 1,
  };

  return (
    <View style={{ height: height, width: width }}>
      <ScrollView
        ref={scrollViewRef}
        onLayout={scrollToInitialPosition}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onScroll={onScroll}
        scrollEventThrottle={20}
        snapToInterval={itemHeight}
      >
        {extendedItems().map((item, index) => {
          return (
            <DynamicallySelectedPickerListItem
              key={index}
              label={item.label}
              itemColor={item.itemColor}
              allItemsColor={allItemsColor}
              fontSize={fontSize ? fontSize : itemHeight / 2}
              fontFamily={fontFamily}
              style={[
                styles.listItem,
                {
                  height: itemHeight,
                },
              ]}
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

DynamicallySelectedPickerList.defaultProps = {
  items: [{ value: 0, label: 'No items', itemColor: 'red' }],
  onScroll: () => {},
  onScrollBeginDrag: () => {},
  onScrollEndDrag: () => {},
  onMomentumScrollBegin: () => {},
  onMomentumScrollEnd: () => {},
  width: 300,
  height: 300,
  initialSelectedIndex: 0,
  transparentItemRows: 3,
  allItemsColor: '#000',
  fontFamily: 'Arial',
  selectedItemBorderColor: '#cecece',
  topGradientColors: [
    'rgba( 255, 255, 255, 1 )',
    'rgba( 255, 255, 255, 0.9 )',
    'rgba( 255, 255, 255, 0.7 )',
    'rgba( 255, 255, 255, 0.5 )',
  ],
  bottomGradientColors: [
    'rgba( 255, 255, 255, 0.5 )',
    'rgba( 255, 255, 255, 0.7 )',
    'rgba( 255, 255, 255, 0.9 )',
    'rgba( 255, 255, 255, 1 )',
  ],
};

DynamicallySelectedPickerList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
      itemColor: PropTypes.string,
    })
  ),
  onScroll: PropTypes.func,
  onMomentumScrollBegin: PropTypes.func,
  onMomentumScrollEnd: PropTypes.func,
  onScrollBeginDrag: PropTypes.func,
  onScrollEndDrag: PropTypes.func,
  initialSelectedIndex: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  allItemsColor: PropTypes.string,
  selectedItemBorderColor: PropTypes.string,
  fontSize: PropTypes.number,
  fontFamily: PropTypes.string,
  topGradientColors: PropTypes.array,
  bottomGradientColors: PropTypes.array,
};

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

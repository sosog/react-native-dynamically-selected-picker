import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PickerListItem from './PickerListItem';

export default class DynamicallySelectedPicker extends React.Component {
  state = {
    itemHeight: this.props.height / (this.props.transparentItemRows * 2 + 1),
    itemIndex: this.props.initialSelectedIndex,
  };

  fakeItems(n = 3) {
    const itemsArr = [];
    for (let i = 0; i < n; i++) {
      itemsArr[i] = {
        value: -1,
        label: '',
      };
    }
    return itemsArr;
  }

  allItemsLength() {
    return this.extendedItems().length - this.props.transparentItemRows * 2;
  }

  onScroll(event) {
    const {items, onScrollDynamicallyChange} = this.props;
    const tempIndex = this.getItemTemporaryIndex(event);

    if (
      this.state.itemIndex !== tempIndex &&
      tempIndex >= 0 &&
      tempIndex < this.allItemsLength()
    ) {
      this.setItemIndex(tempIndex);
      onScrollDynamicallyChange({index: tempIndex, item: items[tempIndex]});
    }
  }

  onScrollBegin(event) {
    const {items, onScrollBegin} = this.props;
    const tempIndex = this.getItemTemporaryIndex(event);

    if (tempIndex >= 0 && tempIndex < this.allItemsLength()) {
      this.setItemIndex(tempIndex);
      onScrollBegin({index: tempIndex, item: items[tempIndex]});
    }
  }

  onScrollEnd(event) {
    const {items, onScrollEnd} = this.props;
    const tempIndex = this.getItemTemporaryIndex(event);

    if (tempIndex >= 0 && tempIndex < this.allItemsLength()) {
      this.setItemIndex(tempIndex);
      onScrollEnd({index: tempIndex, item: items[tempIndex]});
    }
  }

  getItemTemporaryIndex(event) {
    return Math.round(
      event.nativeEvent.contentOffset.y / this.state.itemHeight,
    );
  }

  setItemIndex(index) {
    this.setState({
      itemIndex: index,
    });
  }

  extendedItems() {
    const {transparentItemRows} = this.props;
    return [
      ...this.fakeItems(transparentItemRows),
      ...this.props.items,
      ...this.fakeItems(transparentItemRows),
    ];
  }

  render() {
    const {itemIndex, itemHeight} = this.state;
    const {
      width,
      height,
      topGradientColors,
      bottomGradientColors,
      transparentItemRows,
      itemsColor,
      fontSize,
      fontFamily,
      selectedItemBorderColor,
    } = this.props;
    return (
      <View style={{height: height, width: width}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollBegin={(event) => {
            this.onScrollBegin(event);
          }}
          onMomentumScrollEnd={(event) => {
            this.onScrollEnd(event);
          }}
          onScroll={(event) => {
            this.onScroll(event);
          }}
          scrollEventThrottle
          initialScrollIndex={itemIndex}
          snapToInterval={itemHeight}>
          {this.extendedItems().map((item, index) => {
            return (
              <PickerListItem
                key={index}
                label={item.label}
                itemColor={item.itemColor}
                itemsColor={itemsColor}
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
              top: 0,
              borderBottomWidth: 1,
              borderBottomColor: selectedItemBorderColor,
            },
          ]}
          pointerEvents="none">
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
              bottom: 0,
              borderTopWidth: 1,
              borderTopColor: selectedItemBorderColor,
            },
          ]}
          pointerEvents="none">
          <LinearGradient
            colors={bottomGradientColors}
            style={[
              styles.pickerGradient,
              {height: transparentItemRows * itemHeight},
            ]}
          />
        </View>
      </View>
    );
  }
}

DynamicallySelectedPicker.defaultProps = {
  items: [{value: 0, label: 'No items'}],
  onScrollDynamicallyChange: () => {},
  onScrollBegin: () => {},
  onScrollEnd: () => {},
  width: 200,
  height: 200,
  initialSelectedIndex: 0,
  transparentItemRows: 3,
  itemsColor: '#000',
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

DynamicallySelectedPicker.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
      itemColor: PropTypes.string,
    }),
  ),
  onScrollDynamicallyChange: PropTypes.func,
  onScrollBegin: PropTypes.func,
  onScrollEnd: PropTypes.func,
  initialSelectedIndex: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  itemsColor: PropTypes.string,
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

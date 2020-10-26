import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ScrollView, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PickerListItem from './PickerListItem';

export default class DynamicallySelectedPicker extends React.Component {
  constructor(props) {
    super(props);

    let itemHeight =
      this.props.height / (this.props.transparentItemRows * 2 + 1);
    if (Platform.OS === 'ios') {
      itemHeight = Math.ceil(itemHeight);
    }

    this.state = {
      itemHeight: itemHeight,
      itemIndex: this.props.initialSelectedIndex,
    };
  }

  scrollToInitialPosition = () => {
    this.scrollViewRef.scrollTo({
      y: this.state.itemHeight * this.props.initialSelectedIndex,
    });
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
    const {items, onScroll} = this.props;
    const tempIndex = this.getItemTemporaryIndex(event);
    if (
      this.state.itemIndex !== tempIndex &&
      tempIndex >= 0 &&
      tempIndex < this.allItemsLength()
    ) {
      this.setItemIndex(tempIndex);
      onScroll({index: tempIndex, item: items[tempIndex]});
    }
  }

  onMomentumScrollBegin(event) {
    const {items, onMomentumScrollBegin} = this.props;
    const tempIndex = this.getItemTemporaryIndex(event);

    if (tempIndex >= 0 && tempIndex < this.allItemsLength()) {
      this.setItemIndex(tempIndex);
      onMomentumScrollBegin({index: tempIndex, item: items[tempIndex]});
    }
  }

  onMomentumScrollEnd(event) {
    const {items, onMomentumScrollEnd} = this.props;
    const tempIndex = this.getItemTemporaryIndex(event);

    if (tempIndex >= 0 && tempIndex < this.allItemsLength()) {
      this.setItemIndex(tempIndex);
      onMomentumScrollEnd({index: tempIndex, item: items[tempIndex]});
    }
  }

  onScrollBeginDrag(event) {
    const {items, onScrollBeginDrag} = this.props;
    const tempIndex = this.getItemTemporaryIndex(event);

    if (tempIndex >= 0 && tempIndex < this.allItemsLength()) {
      this.setItemIndex(tempIndex);
      onScrollBeginDrag({index: tempIndex, item: items[tempIndex]});
    }
  }

  onScrollEndDrag(event) {
    const {items, onScrollEndDrag} = this.props;
    const tempIndex = this.getItemTemporaryIndex(event);

    if (tempIndex >= 0 && tempIndex < this.allItemsLength()) {
      this.setItemIndex(tempIndex);
      onScrollEndDrag({index: tempIndex, item: items[tempIndex]});
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
      allItemsColor,
      fontSize,
      fontFamily,
      selectedItemBorderColor,
    } = this.props;
    return (
      <View style={{height: height, width: width}}>
        <ScrollView
          ref={(ref) => {
            this.scrollViewRef = ref;
          }}
          onLayout={this.scrollToInitialPosition}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollBegin={(event) => {
            this.onMomentumScrollBegin(event);
          }}
          onMomentumScrollEnd={(event) => {
            this.onMomentumScrollEnd(event);
          }}
          onScrollBeginDrag={(event) => {
            this.onScrollBeginDrag(event);
          }}
          onScrollEndDrag={(event) => {
            this.onScrollEndDrag(event);
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
  items: [{value: 0, label: 'No items', itemColor: 'red'}],
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

DynamicallySelectedPicker.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
      itemColor: PropTypes.string,
    }),
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

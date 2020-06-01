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
          // onMomentumScrollBegin={({index, item}) => {
          //   this.updateSelectedItem(index);
          // }}
          // onMomentumScrollEnd={({index, item}) => {
          //   this.updateSelectedItem(index);
          // }}
          // onScrollBeginDrag={({index, item}) => {
          //   this.updateSelectedItem(index);
          // }}
          // onScrollEndDrag={({index, item}) => {
          //   this.updateSelectedItem(index);
          // }}
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

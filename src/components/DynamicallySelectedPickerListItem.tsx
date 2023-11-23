import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ListItem, PickerListItemProps } from '../types/pickerTypes';

export default function DynamicallySelectedPickerListItem<
  ItemT extends ListItem,
>({
  item,
  allItemsColor,
  fontSize,
  horizontal,
  height,
  fontFamily = 'Arial',
}: PickerListItemProps<ItemT>) {
  return (
    <View
      style={
        horizontal
          ? { ...styles.viewWrapper, width: height }
          : { ...styles.viewWrapper, height: height }
      }
    >
      <Text
        style={{
          fontSize: fontSize,
          color: item.itemColor ? item.itemColor : allItemsColor,
          fontFamily: fontFamily,
        }}
      >
        {item.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { PickerListItemProps } from './types/pickerTypes';

export function DynamicallySelectedPickerListItem({
  label,
  itemColor,
  allItemsColor,
  fontSize,
  height,
  fontFamily = 'Arial',
}: PickerListItemProps) {
  return (
    <View
      style={{
        ...styles.viewWrapper,
        height,
      }}
    >
      <Text
        style={{
          fontSize: fontSize,
          color: itemColor ? itemColor : allItemsColor,
          fontFamily: fontFamily,
        }}
      >
        {label}
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

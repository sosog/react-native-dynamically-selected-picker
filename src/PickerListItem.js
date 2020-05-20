import React from 'react';
import {View, Text} from 'react-native';

export default function PickerListItem({
  label,
  style,
  itemColor,
  allItemsColor,
  fontSize,
  fontFamily = 'Arial',
}) {
  return (
    <View style={style}>
      <Text
        style={{
          fontSize: fontSize,
          color: itemColor ? itemColor : allItemsColor,
          fontFamily: fontFamily,
        }}>
        {label}
      </Text>
    </View>
  );
}

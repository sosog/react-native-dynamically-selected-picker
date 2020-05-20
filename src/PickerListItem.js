import React from 'react';
import {View, Text} from 'react-native';

export default function PickerListItem({
  label,
  style,
  itemColor,
  itemsColor,
  fontSize,
  fontFamily = 'Arial',
}) {
  return (
    <View style={style}>
      <Text
        style={{
          fontSize: fontSize,
          color: itemColor ? itemColor : itemsColor,
          fontFamily: fontFamily,
        }}>
        {label}
      </Text>
    </View>
  );
}

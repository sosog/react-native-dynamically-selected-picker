import React from 'react';
import { Text, View } from 'react-native';
import type { PickerListItemProps } from 'src/types/pickerTypes';

type CustomListItem = {
  label: string;
  value: number;
  boxColour: string;
};

const CustomPickerListItem = ({
  item,
  isSelected,
  allItemsColor,
  fontSize,
  height,
}: PickerListItemProps<CustomListItem>): JSX.Element => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: height,
      }}
    >
      <View
        style={{
          width: height - 12,
          height: height - 12,
          backgroundColor: item.boxColour,
          marginHorizontal: 8,
        }}
      />
      <Text
        style={{
          fontSize: fontSize,
          fontWeight: isSelected ? 'bold' : 'normal',
          color: allItemsColor,
        }}
      >
        {item.label}
      </Text>
    </View>
  );
};

export default CustomPickerListItem;

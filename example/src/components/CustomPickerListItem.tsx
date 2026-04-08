import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PickerListItemProps } from 'react-native-dynamically-selected-picker/types/pickerTypes';

type CustomListItem = {
  label: string;
  value: number;
  boxColour: string;
};


const CustomPickerListItem = ({
  item,
  fakeItem,
  isSelected,
  allItemsColor,
  fontSize,
  height,
}: PickerListItemProps<CustomListItem>): React.JSX.Element => {
  const fontWeight = isSelected ? 'bold' : 'normal';
  return (
    <View style={[styles.listItem, { height }]}>
      {!fakeItem && (
        <>
          <View
            style={[
              styles.listItemBox,
              {
                width: height - 12,
                height: height - 12,
                backgroundColor: item.boxColour,
              },
            ]}
          />
          <Text
            style={[
              styles.listItemText,
              {
                fontSize,
                fontWeight,
                color: allItemsColor,
              },
            ]}
          >
            {item.label}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listItemBox: {
    marginHorizontal: 8,
  },
  listItemText: {
    // base text styles kept here; dynamic ones applied inline above
  },
});

export default CustomPickerListItem;
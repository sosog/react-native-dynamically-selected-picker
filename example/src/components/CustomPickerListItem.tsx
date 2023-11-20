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
}: PickerListItemProps<CustomListItem>): JSX.Element => {
  const BOLD = 'bold';
  const NORMAL = 'normal';

  return (
    <View
      style={{
        ...styles.listItem,
        height: height,
      }}
    >
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
            style={{
              fontSize: fontSize,
              fontWeight: isSelected ? BOLD : NORMAL, // silly linter errors
              color: allItemsColor,
            }}
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
});

export default CustomPickerListItem;

import React from 'react';
import renderer from 'react-test-renderer';

import DynamicallySelectedPicker from '../components/DynamicallySelectedPicker';
import DynamicallySelectedPickerListItem from '../DynamicallySelectedPickerListItem';
import type { ListItem } from 'src/types/pickerTypes';

it('Components renders correctly with defaults', () => {
  const DynamicallySelectedPickerWrapper = renderer
    .create(<DynamicallySelectedPicker />)
    .toJSON();
  expect(DynamicallySelectedPickerWrapper).toMatchSnapshot();

  const item: ListItem = {
    label: 'Item',
    value: 1,
    itemColor: 'white',
  };

  const DynamicallySelectedPickerListItemWrapper = renderer
    .create(
      <DynamicallySelectedPickerListItem
        item={item}
        key={1}
        isSelected={false}
        allItemsColor={'black'}
        fontSize={14}
        height={30}
        fontFamily={'Georgia'}
      />
    )
    .toJSON();
  expect(DynamicallySelectedPickerListItemWrapper).toMatchSnapshot();
});

it('Components renders correctly with updated params', () => {
  const DynamicallySelectedPickerWrapper = renderer
    .create(
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
            itemColor: 'blue',
          },
          {
            value: 5,
            label: 'Item 5',
          },
        ]}
        initialSelectedIndex={2}
        height={400}
        width={400}
        fontSize={18}
        allItemsColor={'blue'}
        fontFamily={'Arial'}
        selectedItemBorderColor={'gray'}
        transparentItemRows={2}
      />
    )
    .toJSON();
  expect(DynamicallySelectedPickerWrapper).toMatchSnapshot();

  const item: ListItem = {
    label: 'Item label',
    value: 1,
    itemColor: 'green',
  };

  const DynamicallySelectedPickerListItemWrapper = renderer
    .create(
      <DynamicallySelectedPickerListItem
        item={item}
        key={1}
        isSelected={false}
        allItemsColor={'pink'}
        fontSize={22}
        height={40}
        fontFamily={'Arial'}
      />
    )
    .toJSON();
  expect(DynamicallySelectedPickerListItemWrapper).toMatchSnapshot();
});

it('Components renders correctly with gradient disabled', () => {
  const DynamicallySelectedPickerWrapper = renderer
    .create(<DynamicallySelectedPicker renderGradientOverlay={false} />)
    .toJSON();
  expect(DynamicallySelectedPickerWrapper).toMatchSnapshot();
});

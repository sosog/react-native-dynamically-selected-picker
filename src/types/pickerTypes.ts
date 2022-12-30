export type ListItem = {
  label: string;
  value: number;
  itemColor?: string;
};

export interface PickerProps {
  items?: Array<ListItem>;
  onScroll?: ({ index }: { index: number }) => void;
  onMomentumScrollBegin?: ({ index }: { index: number }) => void;
  onMomentumScrollEnd?: ({ index }: { index: number }) => void;
  onScrollBeginDrag?: ({ index }: { index: number }) => void;
  onScrollEndDrag?: ({ index }: { index: number }) => void;
  initialSelectedIndex?: number;
  height?: number;
  width?: number;
  allItemsColor?: string;
  selectedItemBorderColor?: string;
  fontSize?: number;
  fontFamily?: string;
  topGradientColors?: Array<string>;
  bottomGradientColors?: Array<string>;
  transparentItemRows?: number;
}

export interface PickerListItemProps {
  label: string;
  itemColor?: string;
  allItemsColor: string;
  fontSize: number;
  height: number;
  fontFamily: string;
}

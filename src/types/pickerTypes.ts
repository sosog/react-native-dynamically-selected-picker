export type ListItem = {
  label: string;
  value: number;
  itemColor?: string;
};

export interface PickerProps<ItemT extends ListItem> {
  items?: Array<ItemT>;
  onScroll?: ({ index }: { index: number }) => void;
  onMomentumScrollBegin?: ({ index }: { index: number }) => void;
  onMomentumScrollEnd?: ({ index }: { index: number }) => void;
  onScrollBeginDrag?: ({ index }: { index: number }) => void;
  onScrollEndDrag?: ({ index }: { index: number }) => void;
  renderItem?: ({}: PickerListItemProps<ItemT>) => JSX.Element;
  initialSelectedIndex?: number;
  height?: number;
  width?: number;
  allItemsColor?: string;
  selectedItemBorderColor?: string;
  fontSize?: number;
  fontFamily?: string;
  renderGradientOverlay?: boolean;
  topGradientColors?: Array<string>;
  bottomGradientColors?: Array<string>;
  transparentItemRows?: number;
}

export interface PickerListItemProps<ItemT extends ListItem> {
  key: number;
  item: ItemT;
  isSelected: boolean;
  allItemsColor: string;
  fontSize: number;
  height: number;
  fontFamily: string;
}

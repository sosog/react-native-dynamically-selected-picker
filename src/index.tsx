export { DynamicallySelectedPickerList } from './DynamicallySelectedPickerList';
export { DynamicallySelectedPickerListItem } from './DynamicallySelectedPickerListItem';
import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-dynamically-selected-picker' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

export const DynamicallySelectedPicker = NativeModules.DynamicallySelectedPicker
  ? NativeModules.DynamicallySelectedPicker
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

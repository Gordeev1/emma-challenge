declare var process: any;

import { Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const isProductionBuild = process.env.NODE_ENV === 'production';

import { ScaledSize } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import merge from 'lodash/merge';
import { THEME } from './enums';

const colors = {
	white: '#fff',
	black: '#000',
	border: 'rgb(201, 222, 244)',
};

const fonts = {
	main: 'Roboto',
	mainBold: 'Roboto Bold',
};

export const baseTheme = {
	colors,
	fonts,
};

const lightTheme = { ...baseTheme };

const darkTheme = merge({}, baseTheme, {
	// TODO: implement dark theme
});

export const themes = {
	[THEME.Light]: lightTheme,
	[THEME.Dark]: darkTheme,
};

type Theme = Readonly<typeof baseTheme>;

export type BaseTheme = Theme & {
	insets: EdgeInsets;
	windowSize: ScaledSize;
};

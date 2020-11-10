import * as React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeProvider } from '@utils/styled-components';
import { useWindowSize } from '@hooks/useWindowSize';
import { THEME } from './enums';
import { themes } from './styled';

interface IProps {
	children: React.ReactChild;
}

export const ChangeThemeContext = React.createContext((_: THEME) => {});

export default ({ children }: IProps) => {
	const [themeName, changeThemeName] = React.useState(THEME.Light);
	const insets = useSafeAreaInsets();
	const windowSize = useWindowSize();

	const theme = {
		...themes[themeName],
		insets,
		windowSize,
	};

	return (
		<ChangeThemeContext.Provider value={changeThemeName}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ChangeThemeContext.Provider>
	);
};

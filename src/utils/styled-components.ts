import { ThemedStyledProps, ThemedStyledInterface } from 'styled-components';
import * as styledComponents from 'styled-components/native';
import { BaseTheme } from '@modules/Theme/styled';

const {
	default: baseStyled,
	css,
	ThemeProvider,
	ThemeContext,
	withTheme,
} = (styledComponents as unknown) as styledComponents.ReactNativeThemedStyledComponentsModule<
	BaseTheme
>;

export type ThemeWithProps<P = {}> = ThemedStyledProps<P, BaseTheme>;

export { css, ThemeProvider, ThemeContext, withTheme };

const styled = (baseStyled as any) as ThemedStyledInterface<BaseTheme>;

export default styled;

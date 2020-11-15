import { StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from '@utils/styled-components';

interface ICommonProps {
	containerStyle?: ViewStyle;
}

interface IHorizontalListProps extends ICommonProps {
	itemWidth: number;
}

export const HorizontalList = styled(Animated.ScrollView).attrs<IHorizontalListProps>((p) => ({
	contentContainerStyle: {
		paddingHorizontal: p.theme.windowSize.width / 2 - p.itemWidth / 2,
		...(p.containerStyle || {}),
	} as StyleProp<ViewStyle>,
}))<IHorizontalListProps>`
	border-bottom-color: ${(p) => p.theme.colors.border};
	border-bottom-width: 1;
`;

interface IVerticalListProps extends ICommonProps {}

export const VerticalList = styled(Animated.ScrollView).attrs<IVerticalListProps>((p) => ({
	contentContainerStyle: p.containerStyle || {},
}))<IVerticalListProps>`
	height: 100%;
`;

export const VerticalItemContainer = styled(Animated.View)`
	overflow: hidden;
`;

export const HorizontalItemContainer = styled(Animated.View)``;

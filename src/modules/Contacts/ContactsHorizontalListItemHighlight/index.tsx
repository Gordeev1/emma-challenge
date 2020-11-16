import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { contactsHorizontalListItemSize } from '@modules/Contacts/ContactsHorizontalListItem/styled';
import { Highlight, highlightSize } from './styled';

interface IProps {
	transX: Animated.SharedValue<number>;
	windowWidth: number;
	lastIndex: number;
}

export default memo(({ transX, windowWidth, lastIndex }: IProps) => {
	const style = useAnimatedStyle<StyleProp<ViewStyle>>(() => {
		const center = windowWidth / 2 - highlightSize / 2;
		const activeIndex = Math.min(
			Math.max(Math.round(transX.value / contactsHorizontalListItemSize), 0),
			lastIndex,
		);
		return {
			transform: [
				{
					translateX: center + activeIndex * contactsHorizontalListItemSize,
				},
			],
		};
	}, [transX.value, windowWidth]);

	return <Highlight style={style} />;
});

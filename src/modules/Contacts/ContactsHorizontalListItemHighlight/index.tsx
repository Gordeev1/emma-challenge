import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { contactsHorizontalListItemSize } from '@modules/Contacts/ContactsHorizontalListItem/styled';
import { Highlight, highlightSize } from './styled';

interface IProps {
	transX: Animated.SharedValue<number>;
	windowWidth: number;
}

export default memo(({ transX, windowWidth }: IProps) => {
	const style = useAnimatedStyle<StyleProp<ViewStyle>>(() => {
		const center = windowWidth / 2 - highlightSize / 2;
		const activeIndex = Math.round(transX.value / contactsHorizontalListItemSize);
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

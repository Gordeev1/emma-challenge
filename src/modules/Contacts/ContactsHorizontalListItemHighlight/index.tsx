import React, { memo, useContext } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { contactsHorizontalListItemSize } from '@modules/Contacts/ContactsHorizontalListItem/styled';
import { ThemeContext } from '@utils/styled-components';
import { Highlight, highlightSize } from './styled';

interface IProps {
	transX: Animated.SharedValue<number>;
}

export default memo(({ transX }: IProps) => {
	const { windowSize } = useContext(ThemeContext);

	const style = useAnimatedStyle<StyleProp<ViewStyle>>(() => {
		const center = windowSize.width / 2 - highlightSize / 2;
		const activeIndex = Math.round(transX.value / contactsHorizontalListItemSize);
		return {
			transform: [
				{
					translateX: center + activeIndex * contactsHorizontalListItemSize,
				},
			],
		};
	}, [transX.value, windowSize.width]);

	return <Highlight style={style} />;
});

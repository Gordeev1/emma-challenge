import React, { memo, useCallback } from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { IContact } from '@LTypes/contact';
import { Container, Avatar, contactsHorizontalListItemSize } from './styled';

interface IProps extends IContact {
	index: number;
	transX: Animated.SharedValue<number>;
	onPress: (index: number) => void;
}

export default memo(({ avatar, transX, index, onPress }: IProps) => {
	const style = useAnimatedStyle<StyleProp<ImageStyle>>(
		() => ({
			borderWidth: withTiming(
				Math.round(transX.value / contactsHorizontalListItemSize) === index ? 5 : 0,
				{ duration: 50 },
			),
		}),
		[transX.value],
	);

	const handlePress = useCallback(() => onPress(index), [onPress, index]);

	return (
		<TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
			<Container style={style}>
				<Avatar source={avatar} />
			</Container>
		</TouchableOpacity>
	);
});

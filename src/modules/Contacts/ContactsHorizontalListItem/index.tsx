import React, { memo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableOpacityProps } from 'react-native';
import { IContact } from '@LTypes/contact';
import { Container, Avatar } from './styled';

interface IProps extends Pick<IContact, 'avatar'>, Partial<Omit<TouchableOpacityProps, 'onPress'>> {
	index: number;
	onPress: (index: number) => void;
}

export default memo(({ avatar, index, onPress, ...props }: IProps) => {
	const handlePress = useCallback(() => onPress(index), [onPress, index]);

	return (
		<TouchableOpacity activeOpacity={0.7} onPress={handlePress} {...props}>
			<Container>
				<Avatar source={avatar} />
			</Container>
		</TouchableOpacity>
	);
});

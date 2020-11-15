import React, { memo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IContact } from '@LTypes/contact';
import { Container, Avatar } from './styled';

interface IProps extends Pick<IContact, 'avatar'> {
	index: number;
	onPress: (index: number) => void;
}

export default memo(({ avatar, index, onPress }: IProps) => {
	const handlePress = useCallback(() => onPress(index), [onPress, index]);

	return (
		<TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
			<Container>
				<Avatar source={avatar} />
			</Container>
		</TouchableOpacity>
	);
});

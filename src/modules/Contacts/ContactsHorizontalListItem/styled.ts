import Animated from 'react-native-reanimated';
import styled from '@utils/styled-components';

const avatarSze = 80;
const avatarMargin = 15;
export const contactsHorizontalListItemSize = avatarSze + avatarMargin;

export const Container = styled(Animated.View)`
	width: ${avatarSze};
	height: ${avatarSze};
	border-radius: ${avatarSze};
	margin-horizontal: ${avatarMargin / 2};
	border-color: ${(p) => p.theme.colors.accent};
`;

export const Avatar = styled(Animated.Image)`
	width: 100%;
	height: 100%;
	resize-mode: contain;
	border-radius: ${avatarSze};
`;

import { Image, View } from 'react-native';
import styled from '@utils/styled-components';

export const contactAvatarSize = 75;
const avatarMargin = 15;
export const contactsHorizontalListItemSize = contactAvatarSize + avatarMargin;

export const Container = styled(View)`
	width: ${contactAvatarSize};
	height: ${contactAvatarSize};
	border-radius: ${contactAvatarSize};
	margin-horizontal: ${avatarMargin / 2};
`;

export const Avatar = styled(Image)`
	width: 100%;
	height: 100%;
	resize-mode: contain;
	border-radius: ${contactAvatarSize};
`;

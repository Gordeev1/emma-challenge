import styled from '@utils/styled-components';
import Animated from 'react-native-reanimated';
import { contactAvatarSize } from '@modules/Contacts/ContactsHorizontalListItem/styled';

const borderSize = 5;
export const highlightSize = contactAvatarSize + borderSize * 2;

export const Highlight = styled(Animated.View)`
	position: absolute;
	width: ${highlightSize};
	height: ${highlightSize};
	border-radius: ${highlightSize};
	background-color: ${(p) => p.theme.colors.accent};
`;

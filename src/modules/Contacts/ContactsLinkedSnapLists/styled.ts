import LinkedSnapLists from '@components/LinkedSnapLists';
import styled from '@utils/styled-components';

export const horizontalListVerticalPadding = 25;

export const ConfiguredLinkedSnapLists = styled(LinkedSnapLists).attrs({
	horizontalListContentContainerStyle: {
		paddingVertical: horizontalListVerticalPadding,
		alignItems: 'center',
	},
})`` as typeof LinkedSnapLists;

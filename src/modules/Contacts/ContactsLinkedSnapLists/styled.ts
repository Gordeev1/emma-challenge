import LinkedSnapLists from '@components/LinkedSnapLists';
import styled from '@utils/styled-components';

export const horizontalListVerticalPadding = 20;

export const ConfiguredLinkedSnapLists = styled(LinkedSnapLists).attrs({
	horizontalListContentContainerStyle: {
		paddingVertical: horizontalListVerticalPadding,
	},
})`` as typeof LinkedSnapLists;

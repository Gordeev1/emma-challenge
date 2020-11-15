import { ActivityIndicator } from 'react-native';
import styled from '@utils/styled-components';

interface IProps {
	padding?: number;
}

export default styled(ActivityIndicator).attrs((p) => ({
	color: p.theme.colors.accent,
}))<IProps>`
	${(p) =>
		p.padding &&
		`
		padding-horizontal: ${p.padding};
		padding-vertical: ${p.padding};
	`}
`;

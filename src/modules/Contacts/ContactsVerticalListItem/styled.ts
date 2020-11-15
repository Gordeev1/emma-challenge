import { Text, View } from 'react-native';
import styled from '@utils/styled-components';

export const Container = styled(View)`
	padding-horizontal: 30;
	padding-vertical: 30;
`;

export const Name = styled(Text)`
	font-size: 22;
	text-align: center;
	margin-bottom: 5;
	color: ${(p) => p.theme.colors.fontMain};
`;

export const NameBold = styled(Text)`
	font-weight: 700;
`;

export const Role = styled(Text)`
	font-size: 15;
	text-align: center;
	margin-bottom: 30;
	color: ${(p) => p.theme.colors.fontSecondary};
`;

export const AboutSectionTitle = styled(Text)`
	font-size: 16;
	font-weight: 700;
	margin-bottom: 5;
	color: ${(p) => p.theme.colors.fontMain};
`;

export const About = styled(Text)`
	color: ${(p) => p.theme.colors.fontSecondary};
	font-size: 15;
`;

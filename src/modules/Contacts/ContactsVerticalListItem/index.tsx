import React, { memo } from 'react';
import { ViewProps } from 'react-native';
import { IContact } from '@LTypes/contact';
import { Container, Name, NameBold, Role, AboutSectionTitle, About } from './styled';

interface IProps extends Pick<IContact, 'name' | 'role' | 'about'>, Partial<ViewProps> {}

export default memo(({ name, role, about, ...props }: IProps) => {
	const [firstName, lastName] = name.split(' ');
	return (
		<Container {...props}>
			<Name>
				<NameBold>{firstName}</NameBold> {lastName}
			</Name>
			<Role>{role}</Role>
			<AboutSectionTitle>About me</AboutSectionTitle>
			<About>{about}</About>
		</Container>
	);
});

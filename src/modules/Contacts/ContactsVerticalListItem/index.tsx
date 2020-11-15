import React, { memo } from 'react';
import { IContact } from '@LTypes/contact';
import { Container, Name, NameBold, Role, AboutSectionTitle, About } from './styled';

interface IProps extends Pick<IContact, 'name' | 'role' | 'about'> {}

export default memo(({ name, role, about }: IProps) => {
	const [firstName, lastName] = name.split(' ');
	return (
		<Container>
			<Name>
				<NameBold>{firstName}</NameBold> {lastName}
			</Name>
			<Role>{role}</Role>
			<AboutSectionTitle>About me</AboutSectionTitle>
			<About>{about}</About>
		</Container>
	);
});

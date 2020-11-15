import React, { useCallback, useContext } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { HeaderHeightContext } from '@react-navigation/stack';
import { IRenderLinkedSnapListItemPayload } from '@components/LinkedSnapLists';
import ContactsHorizontalListItem from '@modules/Contacts/ContactsHorizontalListItem';
import ContactsVerticalListItem from '@modules/Contacts/ContactsVerticalListItem';
import { contactsHorizontalListItemSize } from '@modules/Contacts/ContactsHorizontalListItem/styled';
import { ThemeContext } from '@utils/styled-components';
import { IContact } from '@LTypes/contact';
import { ConfiguredLinkedSnapLists, horizontalListVerticalPadding } from './styled';

interface IProps {
	data: IContact[];
}

const keyExtractor = (item: IContact) => item.name;

export default (props: IProps) => {
	const navigationHeaderHeight = useContext(HeaderHeightContext) || 0;
	const { windowSize } = useContext(ThemeContext);

	/**
	 * TODO: use "measure" to get vertical list height -> support horizontal layout
	 * https://docs.swmansion.com/react-native-reanimated/docs/api/nativeMethods/measure
	 */
	const verticalItemHeight = useSharedValue(
		windowSize.height -
			navigationHeaderHeight -
			contactsHorizontalListItemSize -
			horizontalListVerticalPadding,
	);
	const horizontalItemWidth = useSharedValue(contactsHorizontalListItemSize);

	const renderHorizontalListItem = useCallback(
		({ scrollToIndex, ...item }: IRenderLinkedSnapListItemPayload<IContact>, index: number) => (
			<ContactsHorizontalListItem index={index} {...item} onPress={scrollToIndex} />
		),
		[],
	);

	const renderVerticalListItem = useCallback(
		({ name, role, about }: IRenderLinkedSnapListItemPayload<IContact>) => (
			<ContactsVerticalListItem name={name} role={role} about={about} />
		),
		[],
	);

	return (
		<ConfiguredLinkedSnapLists<IContact>
			keyExtractor={keyExtractor}
			verticalItemHeight={verticalItemHeight}
			horizontalItemWidth={horizontalItemWidth}
			renderHorizontalListItem={renderHorizontalListItem}
			renderVerticalListItem={renderVerticalListItem}
			{...props}
		/>
	);
};

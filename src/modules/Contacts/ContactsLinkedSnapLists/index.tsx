import React, { useCallback, useContext } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { HeaderHeightContext } from '@react-navigation/stack';
import { IRenderLinkedSnapListItemPayload } from '@components/LinkedSnapLists';
import ContactsHorizontalListItem from '@modules/Contacts/ContactsHorizontalListItem';
import ContactsHorizontalListItemHighlight from '@modules/Contacts/ContactsHorizontalListItemHighlight';
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
		Math.round(
			windowSize.height -
				navigationHeaderHeight -
				contactsHorizontalListItemSize -
				horizontalListVerticalPadding * 2,
		),
	);
	const horizontalItemWidth = useSharedValue(contactsHorizontalListItemSize);

	const renderHorizontalListItem = useCallback(
		({ scrollToIndex, avatar }: IRenderLinkedSnapListItemPayload<IContact>, index: number) => (
			<ContactsHorizontalListItem
				testID={`contacts.horizontalListItem-${index + 1}`}
				index={index}
				avatar={avatar}
				onPress={scrollToIndex}
			/>
		),
		[],
	);

	const renderHorizontalListItemHighlight = useCallback(
		({ transX }: IRenderLinkedSnapListItemPayload) => (
			<ContactsHorizontalListItemHighlight
				windowWidth={windowSize.width}
				transX={transX}
				lastIndex={props.data.length - 1}
			/>
		),
		[windowSize.width, props.data.length],
	);

	const renderVerticalListItem = useCallback(
		({ name, role, about }: IRenderLinkedSnapListItemPayload<IContact>, index: number) => (
			<ContactsVerticalListItem
				testID={`contacts.verticalListItem-${index + 1}`}
				name={name}
				role={role}
				about={about}
			/>
		),
		[],
	);

	return (
		<ConfiguredLinkedSnapLists<IContact>
			horizontalListTestID="contacts.horizontalList"
			verticalListTestID="contacts.verticalList"
			keyExtractor={keyExtractor}
			verticalItemHeight={verticalItemHeight}
			horizontalItemWidth={horizontalItemWidth}
			renderHorizontalListItem={renderHorizontalListItem}
			UNSAFE_renderHorizontalListChildren={renderHorizontalListItemHighlight}
			renderVerticalListItem={renderVerticalListItem}
			{...props}
		/>
	);
};

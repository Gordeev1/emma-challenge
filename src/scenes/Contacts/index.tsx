import React, { useCallback, useEffect, useState } from 'react';
import ContactsLinkedSnapLists from '@modules/Contacts/ContactsLinkedSnapLists';
import ContactsService from '@services/contacts';
import { IContact } from '@LTypes/contact';
import { handleError, showErrorMessage } from '@utils/error';

export default () => {
	// TODO: handle loading state
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<IContact[]>([]);

	const load = useCallback(async () => {
		setLoading(true);
		try {
			const results = await ContactsService.getContacts();
			setData(results);
		} catch (error) {
			handleError(error);
			showErrorMessage({ message: 'Failed to load contacts', error, onRetryPress: load });
		} finally {
			setLoading(false);
		}
	}, [setLoading, setData]);

	useEffect(() => {
		load();
	}, [load]);

	return <ContactsLinkedSnapLists data={data} />;
};

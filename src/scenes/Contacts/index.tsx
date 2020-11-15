import React, { useCallback, useEffect, useState } from 'react';
import ContactsLinkedSnapLists from '@modules/Contacts/ContactsLinkedSnapLists';
import Loader from '@components/Loader';
import ContactsService from '@services/contacts';
import { IContact } from '@LTypes/contact';
import { handleError, showErrorMessage } from '@utils/error';

export default () => {
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

	if (loading) {
		return <Loader padding={50} />;
	}

	return <ContactsLinkedSnapLists data={data} />;
};

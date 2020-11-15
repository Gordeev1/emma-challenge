import { IContact } from '@LTypes/contact';
import contacts from '@assets/contacts';

class ContactsService {
	getContacts(): Promise<IContact[]> {
		return new Promise((resolve) => {
			setTimeout(() => resolve(contacts), 2000);
		});
	}
}

export default new ContactsService();

import contacts from '@assets/contacts';

class ContactsService {
	getContacts() {
		return Promise.resolve(contacts);
	}
}

export default new ContactsService();

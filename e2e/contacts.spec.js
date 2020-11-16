const { timeouts } = require('./utils');

describe('Contacts', () => {
	beforeAll(async () => {
		await device.launchApp({ newInstance: true });
	});

	const loadTimeout = timeouts.TWO_SEC + timeouts.HALF_SEC;

	it('It build layout properly', async () => {
		await waitFor(element(by.id('contacts.horizontalListItem-1')))
			.toBeVisible()
			.withTimeout(loadTimeout);

		await expect(element(by.id('contacts.verticalListItem-1'))).toBeVisible();
		await expect(element(by.id('contacts.verticalListItem-2'))).not.toBeVisible();
		await expect(element(by.id('contacts.horizontalListItem-4'))).not.toBeVisible();
	});

	it('It scroll horizontal list to target position on horizontal item tap', async () => {
		const hItem1 = element(by.id('contacts.horizontalListItem-1'));
		const hItem4 = element(by.id('contacts.horizontalListItem-4'));

		await waitFor(hItem1).toBeVisible().withTimeout(loadTimeout);
		await expect(hItem4).not.toBeVisible();

		await element(by.id('contacts.horizontalListItem-2')).tap();

		await expect(hItem4).toBeVisible();

		await hItem1.tap();

		await expect(hItem4).not.toBeVisible();
	});

	it('It scroll horizontal list to target position on vertical list scroll', async () => {
		const hItem1 = element(by.id('contacts.horizontalListItem-1'));
		const hItem4 = element(by.id('contacts.horizontalListItem-4'));
		const verticalList = element(by.id('contacts.verticalList'));

		await waitFor(hItem1).toBeVisible().withTimeout(loadTimeout);

		await verticalList.scroll(500, 'down');

		await expect(hItem4).toBeVisible();

		await verticalList.scroll(500, 'up');

		await expect(hItem4).not.toBeVisible();
	});

	it('It scroll vertical list to target position on horizontal item tap', async () => {
		const vItem1 = element(by.id('contacts.verticalListItem-1'));
		const vItem3 = element(by.id('contacts.verticalListItem-3'));

		await waitFor(vItem1).toBeVisible().withTimeout(loadTimeout);
		await expect(vItem3).not.toBeVisible();

		await element(by.id('contacts.horizontalListItem-3')).tap();

		await expect(vItem3).toBeVisible();
		await expect(vItem1).not.toBeVisible();

		await element(by.id('contacts.horizontalListItem-1')).tap();
		await expect(vItem1).toBeVisible();
	});

	it('It scroll vertical list to target position on horizontal list scroll', async () => {
		const vItem1 = element(by.id('contacts.verticalListItem-1'));
		const horizontalList = element(by.id('contacts.horizontalList'));

		await waitFor(vItem1).toBeVisible().withTimeout(loadTimeout);

		await horizontalList.scroll(250, 'right');

		await expect(vItem1).not.toBeVisible();

		await horizontalList.scroll(250, 'left');

		await expect(vItem1).toBeVisible();
	});

	describe('It make paging properly', () => {
		it('It navigate to the next item by normal swipe on vertical list', async () => {
			const vItem1 = element(by.id('contacts.verticalListItem-1'));
			const vItem2 = element(by.id('contacts.verticalListItem-2'));
			const verticalList = element(by.id('contacts.verticalList'));

			await waitFor(vItem1).toBeVisible().withTimeout(loadTimeout);

			await verticalList.swipe('up', 'fast', 0.3);

			await expect(vItem1).not.toBeVisible();
			await expect(vItem2).toBeVisible();

			await verticalList.swipe('down', 'fast', 0.3);

			await expect(vItem2).not.toBeVisible();
			await expect(vItem1).toBeVisible();
		});

		it('It navigate to the next item by normal scroll on vertical list', async () => {
			const vItem1 = element(by.id('contacts.verticalListItem-1'));
			const vItem2 = element(by.id('contacts.verticalListItem-2'));
			const verticalList = element(by.id('contacts.verticalList'));

			await waitFor(vItem1).toBeVisible().withTimeout(loadTimeout);

			await verticalList.scroll(500, 'down');

			await expect(vItem1).not.toBeVisible();
			await expect(vItem2).toBeVisible();

			await verticalList.scroll(500, 'up');

			await expect(vItem2).not.toBeVisible();
			await expect(vItem1).toBeVisible();
		});

		it('It stays on the same item by small scroll on vertical list', async () => {
			const vItem1 = element(by.id('contacts.verticalListItem-1'));
			const vItem2 = element(by.id('contacts.verticalListItem-2'));
			const verticalList = element(by.id('contacts.verticalList'));

			await waitFor(vItem1).toBeVisible().withTimeout(loadTimeout);

			await verticalList.scroll(200, 'down');

			await expect(vItem1).toBeVisible();
			await expect(vItem2).not.toBeVisible();
		});
	});
});

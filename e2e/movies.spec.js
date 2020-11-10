const { timeouts } = require('./utils');

describe('Movies', () => {
	beforeAll(async () => {
		await device.launchApp({ newInstance: true, delete: true });
	});

	describe('Movies screen', () => {
		it('Show movies as the initial screen', async () => {
			await expect(element(by.id('movies.screneTitle'))).toBeVisible();
		});

		it('Show at least one movie genre', async () => {
			await waitFor(element(by.id('movies.moviesByGenresListItemTitle')))
				.toBeVisible()
				.withTimeout(timeouts.TEN_SEC);
		});

		it('Show at least one movie', async () => {
			await waitFor(expect(element(by.id('movies.movieListItem'))))
				.toBeVisible()
				.withTimeout(timeouts.TEN_SEC);
		});

		it('Open movie details screen on tap', async () => {
			await element(by.id('movies.movieListItem')).tap();

			await waitFor(element(by.id('movies.screneTitle')))
				.toBeNotVisible()
				.withTimeout(timeouts.TEN_SEC);
		});
	});
});

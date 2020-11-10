const fs = require('fs');
const path = require('path');
const faker = require('faker');
const { promisify } = require('util');

const copyFile = promisify(fs.copyFile);
const readDir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);

const rootFolder = path.resolve(__dirname, '..');
const avatarsDataFolder = path.resolve(rootFolder, 'data/avatars');
const projectAssetsFolder = path.resolve(rootFolder, 'src/assets');
const projectAvatarsAssetsFolder = path.resolve(projectAssetsFolder, 'avatars');
const projectContactsFile = path.resolve(projectAssetsFolder, 'contacts.ts');

function cleanFilename(initialName) {
	return initialName.replace(/\s/g, '');
}

const ignore = ['@2x', '@3x', 'DS_Store'];
async function getAvatarsMeta(folder) {
	const files = await readDir(folder);
	return files
		.filter((path) => !ignore.some((suffix) => path.includes(suffix)))
		.map((path) => ({
			name: path.replace('.png', ''),
			fileName: cleanFilename(path),
		}));
}

const getEnrichedDataTemplates = (meta) =>
	meta.map(
		({ name, fileName }) => `
    {
        name: "${name}",
        avatar: require('./avatars/${fileName}'),
        role: "${faker.name.title()}",
        about: "${faker.lorem.paragraph()}",
    }`,
	);

function saveAsModule(destination, content) {
	const file = `export default [${content}]`;
	return writeFile(destination, file, 'utf8');
}

async function saveContactsInfo(avatarsFolder, infoFilePath) {
	const meta = await getAvatarsMeta(avatarsFolder);
	const preparedData = getEnrichedDataTemplates(meta);
	await saveAsModule(infoFilePath, preparedData);
}

async function moveAvatars(folder, targetFolder) {
	const files = await readDir(folder);

	const tasks = files.map((filename) => {
		const initialPath = path.resolve(folder, filename);
		const destination = path.resolve(targetFolder, cleanFilename(filename));
		return copyFile(initialPath, destination);
	});

	return Promise.all(tasks);
}

function main() {
	return Promise.all([
		saveContactsInfo(avatarsDataFolder, projectContactsFile),
		moveAvatars(avatarsDataFolder, projectAvatarsAssetsFolder),
	]);
}

main().catch(console.log);

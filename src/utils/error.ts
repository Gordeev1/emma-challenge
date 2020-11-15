import { Alert } from 'react-native';
import { isProductionBuild } from '@constants';

export function handleError(error: Error | string, label?: string) {
	if (!isProductionBuild) {
		const warnings = [label, JSON.stringify(error)].filter(Boolean);
		console.warn(...warnings);
	}

	// TODO: report error
}

interface IShowErrorMessagePayload {
	error?: Error;
	message?: string;
	onRetryPress?: () => void;
}

export function showErrorMessage({ message, error, onRetryPress }: IShowErrorMessagePayload) {
	const actions = [];

	if (onRetryPress) {
		actions.push({ text: 'Retry', onPress: onRetryPress });
	}

	return Alert.alert(
		'Error has occurred',
		message || JSON.stringify(error),
		actions.length > 0 ? actions : undefined,
	);
}

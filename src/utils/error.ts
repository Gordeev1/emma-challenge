import { Alert } from 'react-native';
import { translate } from '@i18n';
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
		actions.push({ text: translate('errorAlert.retryBtnLabel'), onPress: onRetryPress });
	}

	return Alert.alert(translate('errors.general'), message || JSON.stringify(error), actions);
}

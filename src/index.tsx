import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import Scenes from '@scenes';
import Theme from '@modules/Theme';

export default function App() {
	return (
		<>
			<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent animated />
			<SafeAreaProvider>
				<Theme>
					<Scenes />
				</Theme>
			</SafeAreaProvider>
		</>
	);
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { MAIN_SCENES } from '@scenes/scenes';

import ContactsScene from '@scenes/Contacts';
import ContactDetailsScene from '@scenes/ContactDetails';

export interface MainStackParamList extends Record<string, object | undefined> {
	[MAIN_SCENES.Contacts]: undefined;
	[MAIN_SCENES.ContactDetails]: { id: string };
}

const MainStack = createStackNavigator<MainStackParamList>();

const defaultStackScreenOptions: StackNavigationOptions = {
	cardStyle: { backgroundColor: 'white' },
};

export default () => (
	<NavigationContainer>
		<MainStack.Navigator
			screenOptions={defaultStackScreenOptions}
			initialRouteName={MAIN_SCENES.Contacts}
		>
			<MainStack.Screen name={MAIN_SCENES.Contacts} component={ContactsScene} />
			<MainStack.Screen name={MAIN_SCENES.ContactDetails} component={ContactDetailsScene} />
		</MainStack.Navigator>
	</NavigationContainer>
);

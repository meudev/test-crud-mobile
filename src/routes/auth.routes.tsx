import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

import { SignIn } from '../screens/SignIn';

export function AuthRoutes(){
    return (
        <Navigator
            screenOptions={() => ({
                headerShown: false,
            })}
            initialRouteName="SignIn"
        >
            <Screen name="SignIn" component={SignIn} />
        </Navigator>
    );
}
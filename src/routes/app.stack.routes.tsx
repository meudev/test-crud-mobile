import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from '../screens/Home';
import { NewArticle } from '../screens/NewArticle';
import { ViewArticle } from '../screens/ViewArticle';
import { EditArticle } from '../screens/EditArticle';

export function AppStackRoutes(){
    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home" >
            <Screen name="Home" component={Home} options={{ gestureEnabled: false }}/>
            <Screen name="NewArticle" component={NewArticle}/>
            <Screen name="ViewArticle" component={ViewArticle}/>
            <Screen name="EditArticle" component={EditArticle}/>
        </Navigator>
    );
}
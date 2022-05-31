import 'react-native-gesture-handler';
import React from 'react';

import { AppProvider } from './src/hook';
import { Routes } from './src/routes';

export default function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}


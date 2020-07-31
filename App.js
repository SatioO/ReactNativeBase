import * as React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import Sales from './screens/Sales';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';

const Drawer = createDrawerNavigator();
const DrawerScreens = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Dashboard" component={Dashboard} />
  </Drawer.Navigator>
);

const DashboardStack = createStackNavigator();
const DashboardStackScreens = () => (
  <DashboardStack.Navigator>
    <DashboardStack.Screen name="Dashboard" component={DrawerScreens} />
    <DashboardStack.Screen name="Sales" component={Sales} />
  </DashboardStack.Navigator>
);

const AuthStack = createStackNavigator();
const AuthStackScreens = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={Login} />
  </AuthStack.Navigator>
);

const RootStack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

function App() {
  const [isAuthorized, setAuthorized] = React.useState(false);
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : MyTheme}>
        <RootStack.Navigator headerMode="none">
          {!isAuthorized && (
            <RootStack.Screen name="Login" component={AuthStackScreens} />
          )}
          {isAuthorized && (
            <RootStack.Screen
              name="Dashboard"
              component={DashboardStackScreens}
            />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}

export default App;

import * as React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
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
const DashboardStackScreens = () => {
  const { colors } = useTheme();
  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 8,
          borderBottomWidth: 0,
        },
        headerTintColor: colors.card,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <DashboardStack.Screen name="Dashboard" component={DrawerScreens} />
      <DashboardStack.Screen name="Sales" component={Sales} />
    </DashboardStack.Navigator>
  );
};

const AuthStack = createStackNavigator();
const AuthStackScreens = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="Login" component={Login} />
  </AuthStack.Navigator>
);

const RootStack = createStackNavigator();

const fontConfig = {
  regular: {
    fontFamily: 'Gotham-Book',
    fontWeight: 'normal',
  },
  bold: {
    fontFamily: 'Gotham-Bold',
    fontWeight: 'bold',
  },
  light: {
    fontFamily: 'Gotham-Light',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'Gotham-Medium',
    fontWeight: 'normal',
  },
};

const sizeConfig = {
  // global sizes
  base: 16,
  radius: 6,
  padding: 16,
  margin: 16,

  // font sizes
  h1: 26,
  h2: 20,
  h3: 18,
  title: 18,
  header: 16,
  body: 14,
  caption: 12,
  support: 10,
};

const CustomLightTheme = {
  ...DefaultTheme,
  fonts: fontConfig,
  sizes: sizeConfig,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(141, 170, 61)',
    secondary: 'rgb(141, 170, 61)',
    tertiary: 'rgb(141, 170, 61)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    shadow: 'rgb(199, 199, 204)',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  fonts: fontConfig,
  sizes: sizeConfig,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(141, 170, 61)',
    secondary: 'rgb(141, 170, 61)',
    tertiary: 'rgb(141, 170, 61)',
  },
};

function App() {
  const [isAuthorized, setAuthorized] = React.useState(false);
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer
        theme={scheme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
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

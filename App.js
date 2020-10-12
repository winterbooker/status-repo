import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SelectScreen from './src/screens/SelectScreen';

const App = createStackNavigator({
  Select:          { screen: SelectScreen },
}, {
  defaultNavigationOptions: {
    headerTitle: 'Your Status',
    headerTintColor: '#fff',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#034078',
    },
    headerTitleStyle: {
      color: '#fff',
    },
  },
});

export default createAppContainer(App);

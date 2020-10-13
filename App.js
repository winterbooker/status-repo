import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CharacterScreen from './src/screens/CharacterScreen';
import TodoScreen from './src/screens/TodoScreen';

const App = createStackNavigator({
  Character:          { screen: CharacterScreen },
  Todo:               { screen: TodoScreen },
}, {
  defaultNavigationOptions: {
    headerTitle: 'Your Status',
    headerTintColor: '#3f3f36',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#fffbf6',
    },
    headerTitleStyle: {
      color: '#3f3f36',
    },
  },
});

export default createAppContainer(App);

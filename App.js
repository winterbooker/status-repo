import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CharacterScreen from './src/screens/CharacterScreen';
import TodoScreen1 from './src/screens/TodoScreen1';
import TodoScreen2 from './src/screens/TodoScreen2';

const App = createStackNavigator({
  Character:          { screen: CharacterScreen },
  Todo1:               { screen: TodoScreen1 },
  Todo2:               { screen: TodoScreen2 },
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

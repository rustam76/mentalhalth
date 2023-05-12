import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './screen/HomePage';
import quesTiation from './screen/quesTiation';

const Stack = createStackNavigator();

function NavigationMenu() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false}}/>
      <Stack.Screen name="quesTiation" component={quesTiation} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default  NavigationMenu;
import { createStackNavigator } from '@react-navigation/stack';
import { Header } from '../../components';
import AdminArticles from '../../screens/AdminArticles';

const Stack = createStackNavigator();

export function AdminNavStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="AdminArticles"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="AdminArticles"
        component={AdminArticles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="AdminArticles" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

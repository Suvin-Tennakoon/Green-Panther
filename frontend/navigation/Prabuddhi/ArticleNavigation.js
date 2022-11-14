import { createStackNavigator } from '@react-navigation/stack';
import { Header } from '../../components';
import createArticle from '../../screens/Prabuddhi/CreateArticle';
import ManageArticle from '../../screens/Prabuddhi/ManageArticle';
import Article from '../../screens/Prabuddhi/Articles';
import UpdateArticle from '../../screens/Prabuddhi/UpdateArticle';
import ViewArticles from '../../screens/Prabuddhi/ViewArticles';

const Stack = createStackNavigator();

export function ArticleStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Article"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Article"
        component={Article}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Article" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="Create Article"
        component={createArticle}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Create Article" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="Manage Article"
        component={ManageArticle}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Manage Article" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />

      <Stack.Screen
        name="Update Article"
        component={UpdateArticle}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Update Article" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="Article Details"
        component={ViewArticles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Article Details" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

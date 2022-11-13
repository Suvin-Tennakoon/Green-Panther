import { createStackNavigator } from '@react-navigation/stack';
import { Header } from '../../components';
import CreateOffSpringProject from '../../screens/Sankalpani/CreateOffSpringProject';
import ManageOffsettingProjects from '../../screens/Sankalpani/ManageOffsettingProjects';
import OffsettingProjects from '../../screens/Sankalpani/OffsettingProjects';
import UpdateOffSpringProject from '../../screens/Sankalpani/UpdateOffsettingProject';
import ViewOffsettingProject from '../../screens/Sankalpani/ViewOffsettingProject';

const Stack = createStackNavigator();

export function OffsettingProjectsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Offsetting Projects"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Offsetting Projects"
        component={OffsettingProjects}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Offsetting Projects" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="Create Offsetting Project"
        component={CreateOffSpringProject}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Create Offsetting Projects" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="Manage Offsetting Project"
        component={ManageOffsettingProjects}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Manage Offsetting Projects" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="Update Offsetting Project"
        component={UpdateOffSpringProject}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Update Offsetting Projects" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="Offsetting Project Details"
        component={ViewOffsettingProject}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Offsetting Project Details" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

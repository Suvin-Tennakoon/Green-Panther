import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import OFButton from '../../components/Sankalpani/OFButton';
import OFCard from '../../components/Sankalpani/OFCard';
import OffsettingProjectsService from '../../services/OffsettingProjects.service';

const ManageOffsettingProjects = ({ ...props }) => {
  const { navigation } = props;
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [offsettingProjects, setOffsettingProjects] = useState([]);
  const getAllOffsettingProjects = async () => {
    setIsLoading(true);
    OffsettingProjectsService.getAllOffsettingProjects()
      .then((data) => {
        setOffsettingProjects(data);
      })
      .catch((error) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllOffsettingProjects();
  }, [isFocused]);

  const createTwoButtonAlert = (id) =>
    Alert.alert('Delete Project?', 'Are you sure you need to delete this project?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          setIsLoading(true);
          OffsettingProjectsService.deleteOffsettingProject(id)
            .then((res) => {
              setOffsettingProjects(offsettingProjects.filter((project) => project._id !== id));
            })
            .catch((err) => {
              setIsError(true);
            })
            .finally(() => {
              setIsLoading(false);
            });
        },
      },
    ]);
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.btnsContainer}>
          <OFButton
            title="Create"
            onBtnPress={() => {
              navigation.navigate('Create Offsetting Project');
            }}
          />
          <OFButton title="View" onBtnPress={() => navigation.navigate('Offsetting Projects')} />
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : isError ? (
          <Text>Error while performing the task, please try again</Text>
        ) : offsettingProjects.length > 0 ? (
          offsettingProjects.map((project, index) => (
            <OFCard
              data={project}
              navigation={navigation}
              key={index}
              isView={false}
              onDelete={createTwoButtonAlert}
            />
          ))
        ) : (
          <View style={styles.noContainer}>
            <Text>No Offsetting Projects</Text>
            <View style={styles.btnsContainer}>
              <OFButton
                title="Create one"
                onBtnPress={() => navigation.navigate('Create Offsetting Project')}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  btnsContainer: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flex: 1,
    flexWrap: 'wrap',
  }, noContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 200,
  },
});
export default ManageOffsettingProjects;

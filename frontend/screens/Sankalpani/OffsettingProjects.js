import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import OFButton from '../../components/Sankalpani/OFButton';
import OFCard from '../../components/Sankalpani/OFCard';
import OffsettingProjectsService from '../../services/OffsettingProjects.service';

const OffsettingProjects = ({ ...props }) => {
  const { navigation } = props;
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [offsettingProjects, setOffsettingProjects] = useState([]);
  const getAllOffsettingProjects = async () => {
    setIsLoading(true);
    -OffsettingProjectsService.getAllOffsettingProjects()
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
          <OFButton
            title="Manage"
            onBtnPress={() => navigation.navigate('Manage Offsetting Project')}
          />
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : isError ? (
          <Text>Error</Text>
        ) : offsettingProjects.length > 0 ? (
          offsettingProjects.map((project, index) => (
            <OFCard data={project} navigation={navigation} key={index} />
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
  },
  noContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 200,
  },
});
export default OffsettingProjects;

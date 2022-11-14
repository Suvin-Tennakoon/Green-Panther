import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AButton from '../../components/Prabuddhi/AButton';
import ACard from '../../components/Prabuddhi/AButton';
import ArticleService from '../../services/Prabuddhi/Article.service';

const ManageArticle = ({ ...props }) => {
  const { navigation } = props;
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [Article, setArticle] = useState([]);
  const getAllArticles = async () => {
    setIsLoading(true);
    ArticleService.getAllArticles()
      .then((data) => {
        setArticle(data);
        console.log(data)
      })
      .catch((error) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllArticles();
  }, [isFocused]);

  const createTwoButtonAlert = (id) =>
    Alert.alert('Delete Article?', 'Are you sure you need to delete this Article?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          setIsLoading(true);
          ArticleService.deleteArticle(id)
            .then((res) => {
              setArticle(Article.filter((Article) => Article._id !== id));
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
          <AButton
            title="Create"
            onBtnPress={() => {
              navigation.navigate('Create Article');
            }}
          />
          <AButton title="View" onBtnPress={() => navigation.navigate('Article')} />
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : isError ? (
          <Text>Error while performing the task, please try again</Text>
        ) : Article.length > 0 ? (
          Article.map((Article, index) => (
            <ACard
              data={Article}
              navigation={navigation}
              key={index}
              isView={false}
              onDelete={createTwoButtonAlert}
            />
          ))
        ) : (
          <View style={styles.noContainer}>
            <Text>No Articles</Text>
            <View style={styles.btnsContainer}>
              <AButton
                title="Create one"
                onBtnPress={() => navigation.navigate('Create Article')}
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
export default ManageArticle;

import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AButton from '../../components/Prabuddhi/AButton';
import ACard from '../../components/Prabuddhi/ACard';
import ArticleService from '../../services/Prabuddhi/Article.service';

const Articles = ({ ...props }) => {
  const { navigation } = props;
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [articles, setArticles] = useState([]);
  const getAllArticles = async () => {
    setIsLoading(true);
    -ArticleService.getAllArticles()
      .then((data) => {
        setArticles(data);
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
          {/* <AButton
            title="Manage"
            onBtnPress={() => {
              navigation.navigate('Manage Article')
            }}
          /> */}
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : isError ? (
          <Text>Error</Text>
        ) : articles.length > 0 ? (
          articles.map((article, index) => (
            <ACard data={article} navigation={navigation} key={index} />
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
  },
  noContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 200,
  },
});
export default Articles;

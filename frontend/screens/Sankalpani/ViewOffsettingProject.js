import { Block } from 'galio-framework';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import OFButton from '../../components/Sankalpani/OFButton';

const ViewOffsettingProject = ({ route, navigation }) => {
  const { data } = route.params;

  return (
    <Block
      flex
      style={{
        backgroundColor: '#cde1e0',
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          resizMode="cover"
          style={styles.image}
          source={{
            uri: `${data.image}`,
          }}
        />
        <View style={styles.container}>
          <Text style={styles.dataTitle}>{data.location}</Text>
          <Text style={styles.textData}>{data.description}</Text>

          {/* {data.genres && (
            <View style={styles.genresContainer}>
              {data.genres.map((genre) => (
                <Text style={styles.genre} key={genre.id}>
                  {genre.name}
                </Text>
              ))}
            </View>
          )} */}

          <Text style={styles.benifits}>Benifits</Text>
          <Text style={styles.textData}>{data.benifits}</Text>

          <View style={styles.row}>
            <Text style={styles.benifits}>${data.price}/Per 100KG</Text>
            <OFButton
              title="Buy"
              onPress={() => navigation.navigate('Buy Offsetting Project', { data })}
            />
          </View>
        </View>
      </ScrollView>
    </Block>
  );
};
const height = Dimensions.get('screen').height;
var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cde1e0',
    paddingBottom: 100,
    padding: 20,
  },
  image: {
    marginTop: 10,
    width: width,
    height: height / 3.5,
    resizeMode: 'contain',
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20
  },
  dataTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 5,
    color: '#000',
    textAlign: 'left',
  },
  textData: {
    fontSize: 18,
    color: '#111',
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 10,
    marginBottom: 13,
  },
  genre: {
    marginRight: 15,
    fontWeight: 'bold',
    color: '#BDB1EB',
    borderColor: '#BDB1EB',
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  benifits: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'left',
    color: '#111',
  },
  releaseDate: {
    fontWeight: 'bold',
    color: '#BDB1EB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extra_details: {
    width: '100%',
    padding: 15,
  },
  details_item: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 'auto',
  },
});

export default ViewOffsettingProject;

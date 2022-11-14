import React, { useState } from 'react';
import { Block, Text, theme } from 'galio-framework';
import { ActivityIndicator, Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import AButton from '../../components/Prabuddhi/AButton';
import * as ImagePicker from 'expo-image-picker';
import ArticleService from '../../services/Prabuddhi/Article.service';

const createArticle = ({ ...props }) => {
  const { navigation } = props;
  const [image64, setImage64] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
  });

  const onChange = (value, name) => {
    setData({ ...data, [name]: value });
  };

  const onSubmit = async () => {
    setIsLoading(true);
    console.log(data);
    try {
      const imgResponse = await ArticleService.uploadImage(image64);
     
      if (true) {
        const imageLink = imgResponse.data.link;
        const response = await ArticleService.createArticle({
          ...data,
          image: imageLink,
        });
        console.log(response.status);
        if (true) {
          navigation.navigate('App');
        }
      }
    } catch (error) {
      setError('error while creating article');
      console.log(error)
    }
    setIsLoading(false);
  };
  return (
    <Block
      flex
      style={{
        backgroundColor: '#cde1e0',
      }}
    >
      <ScrollView howsVerticalScrollIndicator={false}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Block style={styles.container}>
            <View style={styles.inputWrapper}>
              <Text size={16} style={styles.label}>
                Title
              </Text>
              <TextInput
                name={'title'}
                value={data.title}
                onChangeText={(text) => {
                  onChange(text, 'title');
                }}
                placeholder="Enter Title"
                style={styles.input}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text size={16} style={styles.label}>
                Description
              </Text>
              <TextInput
                name={'description'}
                value={data.description}
                onChangeText={(text) => {
                  onChange(text, 'description');
                }}
                placeholder="Enter Description"
                style={styles.multinineInput}
                multiline
                numberOfLines={8}
                editable
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text size={16} style={styles.label}>
                Category
              </Text>
              <TextInput
                name={'category'}
                value={data.category}
                onChangeText={(text) => {
                  onChange(text, 'category');
                }}
                placeholder="category"
                style={styles.input}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text size={16} style={styles.label}>
                Image
              </Text>
              <AButton
                onBtnPress={async () => {
                  try {
                    let result = await ImagePicker.launchImageLibraryAsync({
                      mediaTypes: ImagePicker.MediaTypeOptions.Images,
                      base64: true,
                      quality: 1,
                    });
                    if (!result.cancelled) {
                      setImage64(result.base64);
                    }
                  } catch (err) {
                    console.log(err);
                  }
                }}
                title={`${image64 ? 'Change' : 'Add'} Image`}
              />
            </View>
            {image64 && (
              <Image
                source={{ uri: `data:image/jpg;base64,${image64}` }}
                style={styles.imagePreview}
              />
            )}

            <View style={styles.btnWrapper}>
              <AButton onBtnPress={onSubmit} title="Create Article" />
            </View>

            {error && (
              <View style={styles.inputWrapper}>
                <Text style={styles.error}>{error}</Text>
              </View>
            )}
          </Block>
        )}
      </ScrollView>
    </Block>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cde1e0',
    flex1: 1,
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontFamily: 'montserrat-bold',
  },
  input: {
    minHeight: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    width: '70%',
    borderRadius: 5,
    borderColor: '#ccc',
  },
  multinineInput: {
    borderRadius: 5,
    borderColor: '#ccc',
    minHeight: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    width: '70%',
    textAlignVertical: 'top',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 15,
  },error:{
    color:'red'
  }
});

export default createArticle;

import React, { useState } from 'react';
import { Block, Text, theme } from 'galio-framework';
import { ActivityIndicator, Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import OFButton from '../../components/Sankalpani/OFButton';
import * as ImagePicker from 'expo-image-picker';
import OffsettingProjectsService from '../../services/OffsettingProjects.service';

const CreateOffSpringProject = ({ ...props }) => {
  const { navigation } = props;
  const [image64, setImage64] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    location: '',
    description: '',
    price: null,
    benifits: '',
    image: '',
  });

  const onChange = (value, name) => {
    setData({ ...data, [name]: value });
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const imgResponse = await OffsettingProjectsService.uploadImage(image64);
      if (imgResponse.status === 200) {
        const imageLink = imgResponse.data.link;
        const response = await OffsettingProjectsService.createOffsettingProject({
          ...data,
          image: imageLink,
        });
        if (response.status === 201) {
          navigation.navigate('Offsetting Projects');
        }
      }
    } catch (error) {
      setError('error while creating project');
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
                Location
              </Text>
              <TextInput
                name={'location'}
                value={data.location}
                onChangeText={(text) => {
                  onChange(text, 'location');
                }}
                placeholder="Enter Location"
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
                Price
              </Text>
              <TextInput
                name={'price'}
                value={data.price}
                onChangeText={(text) => {
                  onChange(text, 'price');
                }}
                placeholder="Price per KG"
                style={styles.input}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text size={16} style={styles.label}>
                Benifits
              </Text>
              <TextInput
                name={'benifits'}
                value={data.benifits}
                onChangeText={(text) => {
                  onChange(text, 'benifits');
                }}
                placeholder="Benifits"
                style={styles.input}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text size={16} style={styles.label}>
                Image
              </Text>
              <OFButton
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
              <OFButton onBtnPress={onSubmit} title="Create Project" />
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

export default CreateOffSpringProject;

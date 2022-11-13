import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  StatusBar,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import CountryPicker from 'rn-country-dropdown-picker';
import { Block, Button, Text, theme } from 'galio-framework';
const { height, width } = Dimensions.get('screen');
import { HeaderHeight } from '../../constants/utils';
import { Images, nowTheme } from '../../constants';

export default function CountrySelect(props) {
  const { navigation } = props;
  const [selectedCountry, setSelectedCountry] = useState('');
  function handleSelection(e) {
    setSelectedCountry(e);
    console.log(e);
  }

  return (
    <Block flex style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={require('../../assets/imgs/6037e93c60ac082fd65e23af6cd26211.jpg')}
        style={{ flex: 1, height: height, width, zIndex: 1 }}
      />

      <Block space="between" style={styles.padded}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'padding' : 'height'}
          style={styles.container}
        >
          <Block>
            <Block middle>
              <Text
                style={{
                  fontFamily: 'montserrat-regular',
                  bottom: 50,
                  position: 'absolute',
                  letterSpacing: 2,
                  paddingHorizontal: 20,
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}
                color="white"
                size={25}
              >
                Select your country of residence
              </Text>
            </Block>
          </Block>

          <CountryPicker
            ContainerStyle={styles.CountryContainer}
            InputFieldStyle={styles.ContainerStyle}
            DropdownContainerStyle={styles.myDropdownContainerStyle}
            DropdownRowStyle={styles.myDropdownRowStyle}
            Placeholder="Choose Country ..."
            DropdownCountryTextStyle={styles.myDropdownCountryTextStyle}
            countryNameStyle={styles.mycountryNameStyle}
            flagSize={24}
            selectedItem={handleSelection}
          />
          <View style={{ alignItems: 'center', marginTop: 80 }}>
            <Image source={require('./assets/bulb.png')} />
            <Text color="white" style={{ textAlign: 'center' }} size={17}>
              This information will be used to determine the right values for calculating your
              carbon footprint.
            </Text>
          </View>
        </KeyboardAvoidingView>
      </Block>
      <View style={styles.Button}>
        <Button
          disabled={selectedCountry === '' ? true : false}
          round
          color={selectedCountry === '' ? nowTheme.COLORS.MUTED : nowTheme.COLORS.SUCCESS}
          onPress={() =>
            navigation.navigate('Instructions', {
              country: selectedCountry.country,
              ccode: selectedCountry.code,
            })
          }
        >
          Next
        </Button>
      </View>
    </Block>
  );
}

const styles = StyleSheet.create({
  Button: {
    alignItems: 'center',
  },
  CountryContainer: {
    borderRadius: 40,
    backgroundColor: 'white',
    borderColor: 'white',
    padding: 10,
  },
  ContainerStyle: {
    marginTop: 10,
    paddingLeft: 20,
  },
  myDropdownContainerStyle: {
    marginBottom: 10,
    borderColor: 'rgba(0,0,0,0)',
  },
  myDropdownRowStyle: {
    padding: 20,
    borderColor: 'white',
  },
  myDropdownCountryTextStyle: {
    paddingLeft: 15,
    fontFamily: 'montserrat-regular',
  },
  mycountryNameStyle: {
    paddingLeft: 15,
  },
  container: {
    flex: 1,
  },

  padded: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    marginBottom: 100,
  },
});

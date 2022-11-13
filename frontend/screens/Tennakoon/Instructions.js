import React, { Component, useEffect, useRef, useState } from 'react';
import {
  AppRegistry,
  Dimensions,
  StatusBar,
  View,
  Image,
  Animated,
  Platform,
  StyleSheet,
  Text,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { Pages } from 'react-native-pages';
import axios from 'axios';
import getCountryISO3 from 'country-iso-2-to-3';
import { Block, theme, Button } from 'galio-framework';
import { Images, nowTheme } from '../../constants';
const { height, width } = Dimensions.get('screen');

Platform.select({
  ios: () => StatusBar.setBarStyle('light-content'),
  android: () => StatusBar.setBackgroundColor('#263238'),
})();

let styles = StyleSheet.create({
  image: {
    width: null,
    height: null,
    resizeMode: 'cover',
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#263238',
  },

  textContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  text: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 15,
  },

  index: {
    fontSize: 10,
    color: 'rgba(000, 000, 000, .63)',
  },

  padded: {
    zIndex: 3,
    position: 'absolute',
    paddingHorizontal: theme.SIZES.BASE * 1.5,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },

  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
  },
});

/* eslint-disable react/prop-types */

let Label = ({
  color,
  backgroundColor,
  text,
  effect,
  navigation,
  avgCbn,
  country,
  index,
  pages,
  progress,
}) => {
  let style = { color };

  switch (effect) {
    case 'skew':
      style.transform = [
        {
          skewX: progress.interpolate({
            inputRange: [-0.75, 0, 0.75],
            outputRange: ['45deg', '0deg', '-45deg'],
          }),
        },
      ];
      break;

    case 'rise':
      style.transform = [
        {
          translateY: progress.interpolate({
            inputRange: [-0.5, 0, 0.5],
            outputRange: [50, 0, -50],
          }),
        },
      ];

      style.opacity = progress.interpolate({
        inputRange: [-0.5, 0, 0.5],
        outputRange: [0, 1, 0],
      });
      break;

    case 'zoom':
      style.transform = [
        {
          scale: progress.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [4, 1, 0],
          }),
        },
      ];

      style.opacity = progress.interpolate({
        inputRange: [-0.25, 0, 1],
        outputRange: [0, 1, 1],
      });
      break;

    case 'flip':
      style.transform = [
        {
          rotate: progress.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: ['360deg', '0deg', '-360deg'],
          }),
        },
      ];
      break;

    case 'slide':
      style.transform = [
        {
          translateX: progress.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [-100, 0, 100],
          }),
        },
      ];
      break;
  }

  return (
    <SafeAreaView style={[styles.textContainer, { backgroundColor }]}>
      <View
        style={{
          borderWidth: 2,
          padding: 15,
          borderRadius: 40,
          borderBottomLeftRadius: 0,
          backgroundColor: 'white',
        }}
      >
        <Animated.Text style={[styles.text, style]}>
          {text}
          {'\n'}
          <Animated.Text style={styles.index}>{`[${index + 1} / ${pages}]`}</Animated.Text>
        </Animated.Text>
      </View>
      {index === 2 ? (
        <Button
          round
          color={nowTheme.COLORS.SUCCESS}
          onPress={() =>
            navigation.navigate('CalculatorForm', {
              average: avgCbn,
              country: country,
            })
          }
        >
          Next
        </Button>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

/* eslint-enable */

export default function Instructions({ route, navigation }) {
  const { country, ccode } = route.params;

  const [avgCbn, setAvgCbn] = useState(0);
  const [arrowOpacity, setArrowOpacity] = useState(useRef(new Animated.Value(0)).current);

  useEffect(() => {
    axios
      .get(
        'https://www.climatewatchdata.org/api/v1/country_profile/indicators?indicator=emissions_capita&location=' +
          getCountryISO3(ccode)
      )
      .then((res) => {
        console.log(res.data.data[0].values[0].value);
        setAvgCbn(res.data.data[0].values[0].value);

        Animated.timing(arrowOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <ImageBackground
            source={require('../../assets/imgs/bg15.jpg')}
            style={{ flex: 1, height: height, width, zIndex: 1 }}
          />
          <Block space="between" style={styles.padded}>
            <Block>
              <Block middle style={styles.button}>
                <Animated.Text
                  style={{
                    fontFamily: 'serif',
                    top: 20,
                    position: 'absolute',
                    letterSpacing: 2,
                    paddingHorizontal: 20,
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 60,
                    fontWeight: 'bold',
                    opacity: arrowOpacity,
                  }}
                >
                  {avgCbn}
                </Animated.Text>
                <Text
                  style={{
                    fontFamily: 'montserrat-regular',
                    top: 100,
                    position: 'absolute',
                    letterSpacing: 2,
                    paddingHorizontal: 20,
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                >
                  (tCO2e/person)
                </Text>
                <Animated.Image
                  source={require('./assets/arrow.png')}
                  style={{
                    marginTop: theme.SIZES.BASE * 23,
                    height: 150,
                    width: 100,
                    opacity: arrowOpacity,
                  }}
                />
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
      <View style={{ flex: 0.3 }}>
        <Pages indicatorColor={nowTheme.COLORS.BLACK}>
          <Label
            color="#000"
            backgroundColor="rgba(255, 255, 255, 0.5)"
            text="Okay, let's figure out what your personal carbon footprint looks like !"
            effect="rise"
          />
          <Label
            color="#000"
            backgroundColor="rgba(255, 255, 255, 0.5)"
            text={`On the top you see the average, annual ${JSON.stringify(country)} footprint.`}
            effect="zoom"
          />
          <Label
            navigation={navigation}
            avgCbn={avgCbn}
            country={country}
            color="#000"
            backgroundColor="rgba(255, 255, 255, 0.5)"
            text="Keep an eye on it. It will turn into your personal footprint as you answer questions !"
            effect="rise"
          />
        </Pages>
      </View>
    </SafeAreaView>
  );
}

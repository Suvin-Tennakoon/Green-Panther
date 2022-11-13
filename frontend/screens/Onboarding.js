import React, { useEffect, useState } from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function Onboarding({ navigation }) {
  const isFocused = useIsFocused();

  const [average, setAverage] = useState('');
  const [country, setCountry] = useState('');
  const [results, setResults] = useState([]);
  const [savedData, setSavedData] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('UserFootprint');

        if (jsonValue == null) {
          setSavedData(false);
        } else if (jsonValue != null) {
          setSavedData(true);
          let val = JSON.parse(jsonValue);

          setAverage(val.average);
          setCountry(val.country);
          setResults(val.results);

          console.log(val);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, [isFocused]);

  return (
    <Block flex style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Block flex>
        <ImageBackground
          source={Images.Onboarding}
          style={{ flex: 1, height: height, width, zIndex: 1 }}
        />
        <Block space="between" style={styles.padded}>
          <Block>
            <Block middle>
              <Image
                source={Images.NowLogo}
                style={{ width: 115, height: 124, bottom: 200, position: 'absolute' }}
              />
            </Block>
            <Block>
              <Block middle>
                <Text
                  style={{
                    fontFamily: 'montserrat-regular',
                    fontWeight: 'bold',
                    bottom: 50,
                    position: 'absolute',
                    letterSpacing: 2,
                    paddingHorizontal: 20,
                    textAlign: 'center',
                  }}
                  color="white"
                  size={50}
                >
                  Green Panther
                </Text>
              </Block>
            </Block>
            <Block middle row>
              <Text color="white" size={16} style={{ fontFamily: 'montserrat-regular' }}>
                Designed for
              </Text>
              <Image
                source={Images.InvisionLogo}
                style={{
                  height: 28,
                  width: 91,
                  marginLeft: theme.SIZES.BASE,
                }}
              />
            </Block>

            <Block
              row
              style={{
                marginTop: theme.SIZES.BASE * 2.5,
                marginBottom: theme.SIZES.BASE * 2,
              }}
            >
              <Button
                shadowless
                style={styles.button}
                color={nowTheme.COLORS.CARBON}
                onPress={() => {
                  if (savedData) {
                    navigation.navigate('Barchart', {
                      average: average,
                      country: country,
                      results: results,
                    });
                  } else {
                    navigation.navigate('Footprint');
                  }
                }}
              >
                <Text
                  style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                  color={theme.COLORS.WHITE}
                >
                  {savedData ? 'Complete Your Setup' : 'Calculate Carbon Footprint'}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 1.5,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
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

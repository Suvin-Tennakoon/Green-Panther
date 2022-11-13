import { BarChart } from 'react-native-chart-kit';
import React, { useEffect, useState } from 'react';
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
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Block, theme, Button } from 'galio-framework';
import { Images, nowTheme } from '../../constants';
const { height, width } = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    flexDirection: 'column',
  },

  text: {
    backgroundColor: 'transparent',
    fontFamily: 'montserrat-regular',
    fontSize: 15,
    fontWeight: 'bold',
  },

  padded: {
    zIndex: 3,
    position: 'absolute',
    paddingHorizontal: theme.SIZES.BASE * 2,
    top: 100,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});

export default function Barchart({ route, navigation }) {
  const { average, country, results } = route.params;

  const [headCarbon, setHeadCarbon] = useState('0');

  const [youLength, setYouLength] = useState(22);
  const [avgLength, setAvgLength] = useState(22);
  const [worldLenght, setWorldLength] = useState(22);

  useEffect(() => {
    let temp = 0;

    for (var i = 0; i < results.length; i++) {
      temp = temp + Number.parseFloat(results[i]);
    }

    setHeadCarbon(temp + Number.parseFloat(average));
    setBarLength(temp + Number.parseFloat(average));

    // save in storage
    const val = {
      average: average,
      country: country,
      results: results,
    };
    storeData(val);
  }, [results]);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('UserFootprint', jsonValue);
      console.log(await AsyncStorage.getItem('UserFootprint'));
    } catch (e) {
      console.log(e);
    }
  };

  const setBarLength = (headC) => {
    let you = Number.parseFloat(headC);
    let avg = Number.parseFloat(average);
    let world = 4.5;

    if (you >= avg && you >= world) {
      setYouLength(22);
      setAvgLength((avg * 22) / you);
      setWorldLength((world * 22) / you);
    } else if (avg >= you && avg >= world) {
      setAvgLength(22);
      setYouLength((you * 22) / avg);
      setWorldLength((world * 22) / avg);
    } else if (world >= you && world >= avg) {
      setWorldLength(22);
      setYouLength((you * 22) / world);
      setAvgLength((avg * 22) / world);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Block flex style={styles.container}>
          <Block flex>
            <ImageBackground
              source={require('./assets/b-2.png')}
              style={{ flex: 1, height: height * 1.5, width, zIndex: 1 }}
            />
            <Block space="between" style={styles.padded}>
              <Block>
                <Block middle style={styles.button}>
                  <Text
                    style={{
                      fontFamily: 'montserrat-regular',
                      letterSpacing: 2,
                      color: 'white',
                      fontSize: 14,
                      textAlign: 'center',
                    }}
                  >
                    This is your annual Carbon footprint:
                  </Text>
                  <Animated.Text
                    style={{
                      fontFamily: 'serif',
                      top: 50,
                      position: 'absolute',
                      letterSpacing: 2,
                      paddingHorizontal: 20,
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 60,
                      fontWeight: 'bold',
                    }}
                  >
                    {Number.parseFloat(headCarbon).toFixed(2)}
                  </Animated.Text>
                  <Text
                    style={{
                      fontFamily: 'montserrat-regular',
                      top: 120,
                      position: 'absolute',
                      letterSpacing: 2,
                      paddingHorizontal: 20,
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 15,
                    }}
                  >
                    (Tons CO2e)
                  </Text>
                </Block>
              </Block>

              <View style={{ top: 160 }}>
                <View>
                  <View
                    style={{
                      backgroundColor: nowTheme.COLORS.WARNING,
                      width: theme.SIZES.BASE * youLength,
                      padding: 5,
                      borderRadius: 50,
                    }}
                  ></View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                      style={{
                        marginTop: theme.SIZES.BASE / 2,
                        fontFamily: 'montserrat-regular',
                        letterSpacing: 2,
                        paddingLeft: theme.SIZES.BASE / 2,
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 12,
                      }}
                    >
                      You
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        letterSpacing: 2,
                        paddingRight: theme.SIZES.BASE / 2,
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 12,
                        marginTop: theme.SIZES.BASE / 2,
                      }}
                    >
                      {Number.parseFloat(headCarbon).toFixed(2)} tons
                    </Text>
                  </View>
                </View>

                <View style={{ marginTop: 20 }}>
                  <View
                    style={{
                      backgroundColor: nowTheme.COLORS.SUCCESS,
                      width: theme.SIZES.BASE * avgLength,
                      padding: 5,
                      borderRadius: 50,
                    }}
                  ></View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                      style={{
                        marginTop: theme.SIZES.BASE / 2,
                        fontFamily: 'montserrat-regular',
                        letterSpacing: 2,
                        paddingLeft: theme.SIZES.BASE / 2,
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 12,
                      }}
                    >
                      Avg {country}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        letterSpacing: 2,
                        paddingRight: theme.SIZES.BASE / 2,
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 12,
                        marginTop: theme.SIZES.BASE / 2,
                      }}
                    >
                      {average} tons
                    </Text>
                  </View>
                </View>

                <View style={{ marginTop: 20 }}>
                  <View
                    style={{
                      backgroundColor: nowTheme.COLORS.SUCCESS,
                      width: theme.SIZES.BASE * worldLenght,
                      padding: 5,
                      borderRadius: 50,
                    }}
                  ></View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                      style={{
                        marginTop: theme.SIZES.BASE / 2,
                        fontFamily: 'montserrat-regular',
                        letterSpacing: 2,
                        paddingLeft: theme.SIZES.BASE / 2,
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 12,
                      }}
                    >
                      World
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        letterSpacing: 2,
                        paddingRight: theme.SIZES.BASE / 2,
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 12,
                        marginTop: theme.SIZES.BASE / 2,
                      }}
                    >
                      4.50 tons
                    </Text>
                  </View>
                </View>
              </View>
            </Block>
          </Block>
        </Block>

        <View style={{ position: 'absolute', top: 520 }}>
          <Text
            style={{
              fontFamily: 'montserrat-regular',
              letterSpacing: 2,
              paddingLeft: theme.SIZES.BASE,
              fontWeight: 'bold',
              color: 'white',
              fontSize: 15,
            }}
          >
            Understand Your Footprint
          </Text>
          <BarChart
            data={{
              labels: [`Flying`, 'Mobility', 'Energy', 'Housing', 'Diet', 'Spending'],

              datasets: [
                {
                  data: [
                    results[0] + Number.parseFloat(average) / 6,
                    results[2] + Number.parseFloat(average) / 6,
                    results[3] + results[7] + Number.parseFloat(average) / 6,
                    results[5] + results[6] + Number.parseFloat(average) / 6,
                    results[1] + Number.parseFloat(average) / 6,
                    results[4] + Number.parseFloat(average) / 6,
                  ],
                  colors: [
                    () => '#2b8f80',
                    () => '#2b8f80',
                    () => '#2b8f80',
                    () => '#2b8f80',
                    () => '#2b8f80',
                    () => '#2b8f80',
                  ],
                },
              ],
            }}
            withCustomBarColorFromData={true}
            flatColor={true}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisSuffix={' t'}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFromOpacity: 100,
              backgroundGradientToOpacity: 0,
              decimalPlaces: 1, // optional, defaults to 2dp
              color: () => `rgba(255, 255, 255, 1)`,
              labelColor: () => `rgba(255, 255, 255, 1)`,
              barPercentage: 0.4,
              barRadius: 8,
            }}
            fromZero={true}
            showBarTops={false}
            withInnerLines={false}
            style={{
              marginVertical: 30,
              borderRadius: 16,
            }}
          />

          <Text
            style={{
              fontFamily: 'montserrat-regular',
              letterSpacing: 2,
              paddingLeft: theme.SIZES.BASE,
              fontWeight: 'bold',
              color: 'white',
              fontSize: 15,
              marginTop: 30,
            }}
          >
            More options
          </Text>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('Finetune', {
                headCarbon: headCarbon,
                average: average,
                country: country,
                results: results,
              })
            }
          >
            <View
              style={{
                backgroundColor: 'rgba(40,40,40, 0.95)',
                padding: 30,
                borderRadius: 20,
                marginVertical: 30,
                flexDirection: 'row',
                width: width - theme.SIZES.BASE * 2,
                justifyContent: 'space-evenly',
                alignSelf: 'center',
                alignItems: 'center',
              }}
            >
              <Icon name="sound-mix" size={25} color="#2b8f80" />
              <Text style={{ color: 'white', marginHorizontal: 20 }}>
                Needs fine tuning? Edit your footprint in greater detail.
              </Text>
              <Icon name="align-right" size={25} color="#fff" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              Alert.alert(
                'Reset',
                'Do you really want to reset the calculator? This will remove current results !',
                [
                  {
                    text: 'No',
                    onPress: () => {},
                  },
                  {
                    text: 'Yes',
                    onPress: async () => {
                      try {
                        await AsyncStorage.removeItem('UserFootprint');
                      } catch (e) {
                        console.log(e);
                      }
                      navigation.pop(3);
                    },
                  },
                ]
              )
            }
          >
            <View
              style={{
                backgroundColor: 'rgba(40,40,40, 0.95)',
                padding: 30,
                borderRadius: 20,
                flexDirection: 'row',
                width: width - theme.SIZES.BASE * 2,
                justifyContent: 'space-evenly',
                alignSelf: 'center',
                alignItems: 'center',
              }}
            >
              <Icon name="cw" size={25} color="#2b8f80" />
              <Text style={{ color: 'white', marginHorizontal: 20 }}>
                Reset all questions and restart the calculator.
              </Text>
              <Icon name="align-right" size={25} color="#fff" />
            </View>
          </TouchableOpacity>

          <View
            style={{ alignItems: 'center', marginTop: 100, marginHorizontal: theme.SIZES.BASE * 3 }}
          >
            <Text
              style={{ color: 'white', fontSize: 15, textAlign: 'center', fontStyle: 'italic' }}
            >
              Footprint calculation powered by and based on data from
            </Text>
            <Text style={{ color: 'white', fontSize: 20 }}>CAIT</Text>
          </View>
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center' }}>
        <Button round color={nowTheme.COLORS.SUCCESS} onPress={() => navigation.navigate('App')}>
          Next
        </Button>
      </View>
    </View>
  );
}

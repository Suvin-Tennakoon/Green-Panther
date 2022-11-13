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
  BackHandler,
} from 'react-native';
import { Block, theme, Button } from 'galio-framework';
import { Images, nowTheme } from '../../constants';
const { height, width } = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/Entypo';
import IconFW from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

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
    top: 30,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  viewgrp: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    width: width - theme.SIZES.BASE * 2,
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default function Finetune({ route, navigation }) {
  const { headCarbon, average, results, country } = route.params;

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       navigation.navigate('Barchart', { average: average, country: country, results: results });
  //     };

  //     const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //     return () => subscription.remove();
  //   }, [])
  // );

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       { text: 'YES', onPress: () => navigation.pop(1) },
  //     ]);
  //     return true;
  //     navigation.navigate('Barchart', { average: average, country: country, results: results });
  //   };

  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

  //   return () => backHandler.remove();
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: 20, alignSelf: 'flex-start' }}>
        <Button
          onPress={() =>
            navigation.navigate('Barchart', {
              average: average,
              country: country,
              results: results,
            })
          }
          onlyIcon
          icon="arrowleft"
          iconFamily="antdesign"
          iconSize={25}
          color="white"
          iconColor="#2b8f80"
          style={{ width: 40, height: 40 }}
        ></Button>
      </View>
      <ScrollView style={styles.container}>
        <Block flex style={styles.container}>
          <Block flex>
            <ImageBackground
              source={require('./assets/b-4.jpg')}
              style={{ flex: 1, height: height, width, zIndex: 1 }}
            />
            <Block space="between" style={styles.padded}>
              <Block>
                <Block middle style={styles.button}>
                  <Animated.Text
                    style={{
                      fontFamily: 'serif',
                      position: 'absolute',
                      letterSpacing: 2,
                      paddingHorizontal: 20,
                      textAlign: 'center',
                      color: '#fff',
                      fontSize: 60,
                      fontWeight: 'bold',
                    }}
                  >
                    {Number.parseFloat(headCarbon).toFixed(2)}
                  </Animated.Text>
                  <Text
                    style={{
                      fontFamily: 'montserrat-regular',
                      top: 50,
                      position: 'absolute',
                      letterSpacing: 2,
                      paddingHorizontal: 20,
                      textAlign: 'center',
                      color: '#fff',
                      fontSize: 15,
                    }}
                  >
                    (Tons CO2e)
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>

        <View style={{ position: 'absolute', top: 120, width: width }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('UpdateForm', {
                average: average,
                headCarbon: headCarbon,
                questionSet: [0],
                results: results,
              })
            }
          >
            <View style={[styles.viewgrp, { marginVertical: 30 }]}>
              <Image source={require('./assets/plane.png')} style={{ height: 50, width: 50 }} />
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    color: '#2b8f80',
                    marginHorizontal: 20,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  FLYING
                </Text>
                <Text style={{ color: '#2b8f80', marginHorizontal: 20 }}>
                  {(results[0] + Number.parseFloat(average) / 6).toFixed(2)} tons
                </Text>
              </View>
              <IconFW name="edit" size={30} color="#2b8f80" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('UpdateForm', {
                average: average,
                headCarbon: headCarbon,
                questionSet: [2],
                results: results,
              })
            }
          >
            <View style={styles.viewgrp}>
              <Image source={require('./assets/car.png')} style={{ height: 50, width: 50 }} />
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    color: '#2b8f80',
                    marginHorizontal: 20,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  MOBILITY
                </Text>
                <Text style={{ color: '#2b8f80', marginHorizontal: 20 }}>
                  {(results[2] + Number.parseFloat(average) / 6).toFixed(2)} tons
                </Text>
              </View>
              <IconFW name="edit" size={30} color="#2b8f80" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('UpdateForm', {
                average: average,
                headCarbon: headCarbon,
                questionSet: [3, 7],
                results: results,
              })
            }
          >
            <View style={[styles.viewgrp, { marginVertical: 30 }]}>
              <Image source={require('./assets/energy.png')} style={{ height: 50, width: 50 }} />
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    color: '#2b8f80',
                    marginHorizontal: 20,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  ENERGY
                </Text>
                <Text style={{ color: '#2b8f80', marginHorizontal: 20 }}>
                  {(results[3] + results[7] + Number.parseFloat(average) / 6).toFixed(2)} tons
                </Text>
              </View>
              <IconFW name="edit" size={30} color="#2b8f80" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('UpdateForm', {
                average: average,
                headCarbon: headCarbon,
                questionSet: [5, 6],
                results: results,
              })
            }
          >
            <View style={styles.viewgrp}>
              <Image source={require('./assets/housing.png')} style={{ height: 50, width: 50 }} />

              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    color: '#2b8f80',
                    marginHorizontal: 20,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  HOUSING
                </Text>
                <Text style={{ color: '#2b8f80', marginHorizontal: 20 }}>
                  {(results[5] + results[6] + Number.parseFloat(average) / 6).toFixed(2)} tons
                </Text>
              </View>
              <IconFW name="edit" size={30} color="#2b8f80" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('UpdateForm', {
                average: average,
                headCarbon: headCarbon,
                questionSet: [1],
                results: results,
              })
            }
          >
            <View style={[styles.viewgrp, { marginVertical: 30 }]}>
              <Image source={require('./assets/diet.png')} style={{ height: 50, width: 50 }} />

              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    color: '#2b8f80',
                    marginHorizontal: 20,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  DIET
                </Text>
                <Text style={{ color: '#2b8f80', marginHorizontal: 20 }}>
                  {(results[1] + Number.parseFloat(average) / 6).toFixed(2)} tons
                </Text>
              </View>
              <IconFW name="edit" size={30} color="#2b8f80" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('UpdateForm', {
                average: average,
                headCarbon: headCarbon,
                questionSet: [4],
                results: results,
              })
            }
          >
            <View style={styles.viewgrp}>
              <Image source={require('./assets/shopping.png')} style={{ height: 50, width: 50 }} />

              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    color: '#2b8f80',
                    marginHorizontal: 20,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  SPENDING
                </Text>
                <Text style={{ color: '#2b8f80', marginHorizontal: 20 }}>
                  {(results[4] + Number.parseFloat(average) / 6).toFixed(2)} tons
                </Text>
              </View>
              <IconFW name="edit" size={30} color="#2b8f80" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

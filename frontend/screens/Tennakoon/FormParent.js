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
import { Block, theme, Button, Radio } from 'galio-framework';
import { Images, nowTheme } from '../../constants';
const { height, width } = Dimensions.get('screen');
import { RadioButton, Divider } from 'react-native-paper';
import ModalAns from './ModalAns';

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
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});

function FormChildQuestion({ questionNo, setInfoshow, openModal }) {
  return (
    <View style={{ zIndex: 1, flexDirection: 'row' }}>
      <View
        style={{
          padding: 15,
          borderRadius: 40,
          borderBottomLeftRadius: 0,
          paddingVertical: 25,
          zIndex: 1,
          backgroundColor: 'white',
        }}
      >
        <Animated.Text style={[styles.text, { opacity: openModal ? 0 : 1 }]}>
          {QandA[questionNo].QES}
        </Animated.Text>
      </View>
      <View>
        <Button
          onPressIn={() => setInfoshow(true)}
          onPressOut={() => setInfoshow(false)}
          round
          onlyIcon
          shadowless
          icon="question"
          iconFamily="Font-Awesome"
          iconColor={theme.COLORS.WHITE}
          iconSize={theme.SIZES.BASE * 0.7}
          color={nowTheme.COLORS.SUCCESS}
        />
      </View>
    </View>
  );
}

function FormChildAnswers({ questionNo, infoshow, answerSelect }) {
  const [checked, setChecked] = useState('');

  return (
    <View
      style={{
        width: theme.SIZES.BASE * 20,
        padding: 15,
        borderRadius: 20,
        borderBottomRightRadius: 0,
        zIndex: 1,
        backgroundColor: 'white',
      }}
    >
      {infoshow === false ? (
        <RadioButton.Group
          onValueChange={(value) => {
            setChecked(value);
            answerSelect(value);
          }}
          value={checked}
        >
          {QandA[questionNo].ANS.map((ans, i) => {
            return (
              <View key={i}>
                <RadioButton.Item label={ans} value={ans} color={theme.COLORS.SUCCESS} />
                {i + 1 === QandA[questionNo].ANS.length ? <></> : <Divider bold />}
              </View>
            );
          })}
        </RadioButton.Group>
      ) : (
        <Animated.Text>{QandA[questionNo].INFO}</Animated.Text>
      )}
    </View>
  );
}

export default function FormParent({ route, navigation }) {
  const { average, country } = route.params;
  const arrow = {
    greendown: require('./assets/Green-animated-arrow-down.gif'),
    redup: require('./assets/Red-animated-arrow-up.gif'),
  };

  const [questionNo, setQuestionNo] = useState(0);
  const [infoshow, setInfoshow] = useState(false);
  const [nextEnable, setNextEnable] = useState(false);
  const [arrowType, setArrowType] = useState({});
  const [headCarbon, setHeadCarbon] = useState('0');

  const [results, setResults] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [customValue, setCustomValue] = useState('');

  useEffect(() => {
    let temp = 0;

    for (var i = 0; i < results.length; i++) {
      temp = temp + Number.parseFloat(results[i]);
    }

    setHeadCarbon(temp + Number.parseFloat(average));
  }, [results]);

  const getCustomVal = (carbonForAnswer) => {
    if (carbonForAnswer < 0) {
      setArrowType(arrow.greendown);
    } else if (carbonForAnswer > 0) {
      setArrowType(arrow.redup);
    } else if (carbonForAnswer === 0) {
      setArrowType({});
    }

    let modRes = results.map((rs, i) => {
      if (i === questionNo) return carbonForAnswer;
      else return results[i];
    });
    setResults(modRes);
    setNextEnable(true);
  };

  const answerSelect = (ans) => {
    if (
      ans === 'Enter custom amount' ||
      ans === 'Enter kilometers' ||
      ans === 'Enter square meters'
    ) {
      setOpenModal(true);
      setModalType(ans);
    }
    let carbonForAnswer =
      (average * QandA[questionNo].IMPACT[QandA[questionNo].ANS.indexOf(ans)]) / 100;

    if (carbonForAnswer < 0) {
      setArrowType(arrow.greendown);
    } else if (carbonForAnswer > 0) {
      setArrowType(arrow.redup);
    } else if (carbonForAnswer === 0) {
      setArrowType({});
    }

    let modRes = results.map((rs, i) => {
      if (i === questionNo) return carbonForAnswer;
      else return results[i];
    });
    setResults(modRes);
    setNextEnable(true);
  };

  const backQues = () => {
    if (questionNo === 0) {
      navigation.pop(1);
    } else {
      setArrowType({});
      setNextEnable(false);
      setQuestionNo(questionNo - 1);
    }
  };

  const nextQues = () => {
    if (questionNo === 7) {
      navigation.navigate('Barchart', { average: average, country: country, results: results });
      console.log(results);
    } else {
      setCustomValue('');
      setArrowType({});
      setNextEnable(false);
      setQuestionNo(questionNo + 1);
    }
  };

  const skipQues = () => {
    if (questionNo === 7) {
      navigation.navigate('Barchart', { average: average, country: country, results: results });
    } else {
      setCustomValue('');
      setArrowType({});
      setNextEnable(false);
      setQuestionNo(questionNo + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ModalAns
        modalVisible={openModal}
        setModalVisible={setOpenModal}
        modalType={modalType}
        setCustomValue={setCustomValue}
        customValue={customValue}
        getCustomVal={getCustomVal}
        average={average}
      />
      <Block flex style={{ opacity: openModal ? 0.1 : 1 }}>
        <ImageBackground
          source={QandA[questionNo].BKIMG}
          style={{ flex: 1, height: height, width, zIndex: 1 }}
        />

        <Block space="between" style={styles.padded}>
          <Block middle style={styles.button}>
            <Image
              source={arrowType}
              style={{ position: 'absolute', top: 150, width: 40, height: 40 }}
            />
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
              }}
            >
              {Number.parseFloat(headCarbon).toFixed(2)}
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
          </Block>
        </Block>
      </Block>
      <View
        style={{
          flex: 0.3,
          alignSelf: 'flex-start',
          marginLeft: theme.SIZES.BASE,
          marginBottom: 20,
          opacity: openModal ? 0.1 : 1,
        }}
      >
        <FormChildQuestion
          questionNo={questionNo}
          setInfoshow={setInfoshow}
          openModal={openModal}
        />
      </View>
      <View
        style={{
          flex: 0.9,
          alignSelf: 'flex-end',
          marginRight: theme.SIZES.BASE,
          opacity: openModal ? 0.1 : 1,
        }}
      >
        <FormChildAnswers questionNo={questionNo} infoshow={infoshow} answerSelect={answerSelect} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button
          onPress={backQues}
          round
          style={{ alignSelf: 'flex-end', width: theme.SIZES.BASE * 5 }}
          color={'rgba(0 0 0  0)'}
        >
          Back
        </Button>
        <Button
          onPress={nextQues}
          round
          disabled={!nextEnable}
          style={{
            alignSelf: 'center',
            width: theme.SIZES.BASE * 5,
            opacity: nextEnable ? 1 : 0.4,
          }}
          color={nowTheme.COLORS.SUCCESS}
        >
          Next
        </Button>
        <Button
          round
          style={{ alignSelf: 'flex-end', width: theme.SIZES.BASE * 5 }}
          color={'rgba(0 0 0  0)'}
          onPress={skipQues}
        >
          Skip
        </Button>
      </View>
    </SafeAreaView>
  );
}

const QandA = [
  {
    QES: 'How would you describe your flying habits in a typical, average year ?',
    INFO: `Airplanes emit around 100 times more CO2 per hour than a shared bus or train ride, and the emissions of global aviation are around 1 billion tons of CO2 per year — more than the emissions of most countries`,
    BKIMG: require('./assets/1plane.jpg'),
    ANS: ['I fly rarely or never', 'Occasionally', 'Regularly', 'Enter custom amount'],
    IMPACT: [-10, 0, 80, 0],
  },

  {
    QES: 'Which best describes your diet ?',
    INFO: `About 40 percent of greenhouse gases come from agriculture, deforestation and other land-use changes. Meat—particularly beef—drives climate change in two ways: first, through cow's emission of methane, a potent greenhouse gas, and second, by destroying forests as they are converted to grazing land.`,
    BKIMG: require('./assets/2food.jpg'),
    ANS: ['Vegan', 'Vegitarian', 'Pescetarian', 'I try to eat less meat', 'I eat everything'],
    IMPACT: [-18, -14, 10, 25, 40],
  },

  {
    QES: 'How much do you get around by car annually ?',
    INFO: `Vehicles release about 1.4 billion tons of greenhouse gases into the atmosphere each year—mostly in the form of carbon dioxide —contributing to global climate change. Each gallon of gasoline you burn creates roughly 5 to 9 tons of GHG each year for a typical vehicle.`,
    BKIMG: require('./assets/3car.jpg'),
    ANS: [
      "I don't drive or ride",
      'Up to 5,000 km',
      '5,000 - 10,000 km',
      '10,000 - 15,000 km',
      'Enter kilometers',
    ],
    IMPACT: [-15, -10, 0, 35, 0],
  },

  {
    QES: 'What kind of fuel does your car use ?',
    INFO: `Different fuels emit different amounts of carbon dioxide in relation to the energy they produce when burned. To analyze emissions across fuels, compare the amount of CO2 emitted per unit of energy output or heat content. Diesel fuel, gasoline, aviation/jet fuel, and ethanol have the four highest carbon footprints of all fuel sources.`,
    BKIMG: require('./assets/4fuel.jpg'),
    ANS: [
      'Electric (green energy)',
      'Electric',
      'Natural gas',
      'Gasolinen, diesel, or hybrid',
      "I don't know",
    ],
    IMPACT: [-15, -10, -5, 40, 0],
  },

  {
    QES: 'How much do you shop ?',
    INFO: `Products’ packaging contributes in large part to CO2 emissions from producing plastics, polluting ecosystems as well as adding enormous amounts of waste to our landfills. 3 billion trees are pulped yearly to produce 241 million tons of shipping cartons, and of the 86 million tons of plastic packaging produced globally each year, not even 14% is recycled.`,
    BKIMG: require('./assets/5shopping.jpg'),
    ANS: ['Rarely', 'Average', 'Shopper', 'Luxury shopper'],
    IMPACT: [-10, 0, 30, 40],
  },

  {
    QES: 'How big is your home ?',
    INFO: `As house size increases, so too do the environmental impacts associated with buildings and development: resource consumption increases, the land area affected by development grows, stormwater runoff increases as impermeable surface area increases, and energy use rises.`,
    BKIMG: require('./assets/6house.jpg'),
    ANS: ['Studio', 'One-bedroom', 'Two-bedroom', 'Three-bedroom', 'Enter square meters'],
    IMPACT: [-10, -7, 0, 20, 0],
  },

  {
    QES: 'How many people live in your home ?',
    INFO: `Household size is relevant for these additional final demand sources through the infrastructures and services serving households beyond household purchases: the more household sizes decline, leading to an increase in the number of households, the greater are the resources required to provide services to households, for instance for the provision of energy, water, communication, etc.`,
    BKIMG: require('./assets/7living.jpg'),
    ANS: ['Just me', 'Two people', 'Three people', 'four to six people', 'Seven to more people'],
    IMPACT: [35, 30, 0, -5, -10],
  },

  {
    QES: 'Do you have renewable electricity at home ?',
    INFO: `Renewables generate more energy than is used in their production, and produce fewer emissions than other power sources over their lifetime. While all sources of electricity result in some GHG emissions over their lifetime, renewable energy sources have substantially fewer emissions than fossil fuel-fired power plants.`,
    BKIMG: require('./assets/8homenergy.jpg'),
    ANS: ['Yes', 'Not yet', 'Not sure'],
    IMPACT: [-10, 20, 0],
  },
];

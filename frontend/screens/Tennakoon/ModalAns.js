import { Block, Input, theme } from 'galio-framework';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { Icon } from '../../components';
import { nowTheme } from '../../constants';
import IIcon from 'react-native-vector-icons/Ionicons';
import FWIcon from 'react-native-vector-icons/FontAwesome5';

const { height, width } = Dimensions.get('screen');

export default function ModalAns({
  modalVisible,
  setModalVisible,
  modalType,
  setCustomValue,
  customValue,
  getCustomVal,
  average,
}) {
  return (
    <KeyboardAvoidingView style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {(modalType === 'Enter custom amount' &&
                'Enter custom number of mid-ranged roundtrip flights you take in a year') ||
                (modalType === 'Enter kilometers' &&
                  'Enter custom number of kilometers you travel by a car annually') ||
                (modalType === 'Enter square meters' &&
                  'Enter custom number of squre meters of your residence')}
            </Text>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                value={customValue}
                onChangeText={(text) => {
                  setCustomValue(text);
                }}
                type="numeric"
                placeholder="amount"
                shadowless
                iconContent={
                  (modalType === 'Enter custom amount' && (
                    <Icon
                      size={25}
                      color={nowTheme.COLORS.ICON}
                      name="paper-plane"
                      family="Entypo"
                    />
                  )) ||
                  (modalType === 'Enter kilometers' && (
                    <IIcon size={25} color={nowTheme.COLORS.ICON} name="car-sport" />
                  )) ||
                  (modalType === 'Enter square meters' && (
                    <FWIcon size={25} color={nowTheme.COLORS.ICON} name="house-user" />
                  ))
                }
              />
            </Block>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              disabled={
                customValue === '' || customValue === null || customValue === 0 ? true : false
              }
              onPress={() => {
                setModalVisible(!modalVisible);

                if (modalType === 'Enter custom amount') {
                  // 15 flights = 100%
                  let x = (average * (customValue * 100)) / 15 / 100;
                  getCustomVal(x);
                } else if (modalType === 'Enter kilometers') {
                  // 35000km = 100%
                  let x = (average * (customValue * 100)) / 35000 / 100;
                  getCustomVal(x);
                } else if (modalType === 'Enter square meters') {
                  // 925m2 = 100%
                  let x = (average * (customValue * 100)) / 925 / 100;
                  getCustomVal(x);
                }
              }}
            >
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    width: width,
    position: 'absolute',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

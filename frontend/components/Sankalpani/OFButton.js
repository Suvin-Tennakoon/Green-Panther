import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const OFButton = ({ title, onBtnPress }) => {
  return (
    <TouchableOpacity
      style={styles.btnContainer}
      onPress={() => {
        onBtnPress();
      }}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 40,
    width: 140,
    borderRadius: 20,
    flexBasis: 1,
    flexGrow: 1,
    backgroundColor: '#59A167',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    margin: 'auto',
    fontWeight: 'bold',
  },
});

export default OFButton;

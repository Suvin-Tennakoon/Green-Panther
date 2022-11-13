import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View, Button } from 'react-native';
import placeholderImage from '../../assets/imgs/header.jpg';

const OFCard = ({ data, isView = true, onDelete, ...props }) => {
  const { navigation } = props;

  return (
    <TouchableOpacity
      style={styles.container}
      
    >
      <Image
        resizMode="cover"
        style={styles.image}
        source={
          data.image
            ? {
                uri: `${data.image}`,
              }
            : placeholderImage
        }
      />
      <View style={styles.projectDetails}>
        <Text style={styles.location}>{data.location}</Text>
        <Text numberOfLines={9} style={styles.description}>
          {data.description}
        </Text>
        <View style={styles.btnContainer}>
          {isView ? (
            <Button
              title="More details"
              color="#59A167"
              onPress={() => navigation.navigate('Offsetting Project Details', { data: data})}
            />
          ) : (
            <View style={styles.btnContainerInside}>
              <Button
                title="Update"
                color="#59A167"
                onPress={() => navigation.navigate('Update Offsetting Project', {data: data })}
              />
              <Button
                title="Delete"
                color="#111"
                onPress={() => onDelete(data._id)}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    position: 'relative',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 200,
    marginBottom: 8,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#cde1e0',
  },
  image: {
    height: 180,
    width: '40%',
    borderRadius: 20,
    marginEnd: 10,
    backgroundColor: '#11f',
  },
  projectDetails: {
    width: '50%',
    height: 180,
    display: 'flex',
    flexDirection: 'column',
  },
  location: {
    fontSize: 20,
    fontWeight: 'bold',

    textAlign: 'left',
  },
  description: {
    color: '#121212',
    fontSize: 15,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 0,
    right: -20,
    width: '100%',
  },
  btnContainerInside: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default OFCard;

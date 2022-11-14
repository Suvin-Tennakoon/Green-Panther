import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';

import {nowTheme } from '../constants/'; 
import {articles } from '../constants/Prabuddhi/articles'; 
import { Card } from '../components/';

class AdminArticles extends React.Component {
  renderCards = () => {
    return (
      <Block style={styles.container}>
      <Text size={16} style={styles.title}>
        Cards
      </Text>
        <Card item={articles[0]} horizontal />
        <Card item={articles[1]} horizontal />
        <Card item={articles[2]} horizontal />
        <Card item={articles[3]} horizontal />
        <Card item={articles[4]} horizontal />
        <Card item={articles[5]} horizontal />
      </Block>
    );
  };

  render() {
    return (
      <Block flex>
        <ScrollView showsVerticalScrollIndicator={false}>{this.renderCards()}</ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  }
});

export default AdminArticles;

import React from 'react';
import { Image, StyleSheet } from 'react-native';
import logo from '../assets/code.png';

export default function Logo(props) {
const birlesikStyle= StyleSheet.flatten([styles.logo, props.style]);
  return <Image style={birlesikStyle} source={logo} />;
}
const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

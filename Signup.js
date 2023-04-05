import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  AsyncStorage,
} from 'react-native';
import Logo from './components/Logo';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setrePassword] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    return emailRegex.test(email);
  };
  const kayit = async () => {
    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Lütfen geçerli bir email giriniz.');
      return;
    }
    try {
      if (password == rePassword) {
        await AsyncStorage.setItem(
          'yeniKayit',
          JSON.stringify({ email, password })
        );
        Alert.alert('Kayıt Başarılı', 'Şimdi giriş yapabilirsiniz.');
        navigation.navigate('Login');
        console.log(JSON.parse(await AsyncStorage.getItem('yeniKayit')));
      } else {
        Alert.alert('Hata', 'Şifreler birbiriyle eşleşmiyor.');
      }
    } catch (error) {
      Alert.alert('Hata', 'Kayıt oluştururken hata oluştu');
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Kayıt Ol</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Mail Adresiniz"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Şifreniz"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={rePassword}
        onChangeText={setrePassword}
        placeholder="Şifrenizi tekrar giriniz"
        secureTextEntry
      />
      <Button color="#9F4712" title="Kayıt ol" onPress={kayit} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor:'#A5BFB5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
     height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:10,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor:'#fff',
    width:250,
  },


});

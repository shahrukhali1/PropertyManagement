import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { connect } from 'react-redux';
import { loginRequest } from '../../redux/actions/loginActions';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

  const handleLoginPress = () => {
    // Validate email
    if (email.trim() === '') {
      setEmailError('Please enter your email');
      setPasswordError('');
      setError('');
      return;
    }

    // Validate password
    if (password.trim() === '') {
      setPasswordError('Please enter your password');
      setEmailError('');
      setError('');
      return;
    }

    // Reset any existing errors
    setEmailError('');
    setPasswordError('');
    setError('');
    // loginRequest(email, password);
    // Perform login logic
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: email, password: password}),
    };

    fetch('http://127.0.0.1:8000/api/login', requestOptions)
      .then(response => {
        console.log(response); // Log the response object
        return response.data;
      })
      .then(data => {
        console.log(data);
        navigation.navigate('Home', {userdata: data});
      })
      .catch(error => {
        console.log(error);
        setError('Login failed');
      });
  };

  const handleForgotPassword = () => {
    // Handle forgot password functionality
  };

  const handleSignUp = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/image/Vector.png')}
            style={styles.image}
          />
          <View style={styles.logoTextContainer}>
            <Image
              source={require('../../assets/image/Vector-2.png')}
              style={styles.logoText}
            />
            <Image
              source={require('../../assets/image/Vector-3.png')}
              style={styles.logoText}
            />
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        {emailError !== '' && (
          <Text style={styles.errorText}>{emailError}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        {passwordError !== '' && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.linkButton}
          onPress={handleForgotPassword}>
          <Text style={styles.linkButtonText}>Forgot Password?</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.linkButton} onPress={handleSignUp}>
          <Text style={styles.buttonSignup}>
            Don't have an account?
            <Text style={styles.linkButtonSignup}> Sign Up</Text>
          </Text>
        </TouchableOpacity>

        {error !== '' && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    height: '50%',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 55,
  },
  image: {
    width: '20%',
    height: '20%',
    resizeMode: 'contain',
    marginBottom: 16,
  },
  logoTextContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom:10
  },
  logoText: {
    resizeMode: 'contain',
  },
  input: {
    height:50,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#0DB3FF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 40,
    marginBottom:20
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkButton: {
    marginTop: 10,
  },
  linkButtonText: {
    color: '#0DB3FF',
    fontSize: 14,
    marginLeft: 150,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkButtonSignup: {
    color: '#0DB3FF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonSignup: {
    color: 'grey',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default LoginScreen;

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
import {connect} from 'react-redux';
import {loginRequest} from '../../redux/actions/loginActions';
import Emailimg from '../../assets/icons/Emailimg.png';
import passwordimg from '../../assets/icons/passwordimg.png';
import usernameimg from '../../assets/icons/usernameimg.png';
import Icon from 'react-native-vector-icons/FontAwesome';
const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const handleLoginPress = () => {
    // Validate email
    if (email.trim() === '') {
      setEmailError('Please enter your email');
      setPasswordError('');
      setConfirmPasswordError('');
      setError('');
      return;
    }

    if (username.trim() === '') {
      setUsernameError('Please enter your username');
      setEmailError('');
      setPasswordError('');
      setConfirmPasswordError('');
      setError('');
      return;
    }

    // Validate password
    if (password.trim() === '') {
      setPasswordError('Please enter your password');
      setEmailError('');
      setConfirmPasswordError('');
      setError('');
      return;
    }

    // Validate confirm password
    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Please confirm your password');
      setEmailError('');
      setPasswordError('');
      setError('');
      return;
    }

    // Validate password and confirm password match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      setEmailError('');
      setConfirmPasswordError('');
      setError('');
      return;
    }

    // Reset any existing errors
    setEmailError('');
    setUsernameError('');
    setPasswordError('');
    setConfirmPasswordError('');
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
    navigation.navigate('Login');
    // Handle sign up functionality
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/image/Vector.png')}
            style={{ width: '30%',
              height: '30%',
              resizeMode: 'contain',
              marginBottom: 16,}}
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
        <View style={{flex: 1, flexDirection: 'row', marginBottom:-20}}>
          <Image
            source={Emailimg}
            style={{
              marginTop: 16,
              width: 20,
              height: 20,
              resizeMode: 'contain',
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Email ID"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          {emailError !== '' && (
            <Text style={styles.errorText}>{emailError}</Text>
          )}
        </View>
        <View style={{flex: 1, flexDirection: 'row',marginBottom:-20}}>
          <Image
            source={usernameimg}
            style={{
              marginTop: 16,
              width: 20,
              height: 20,
              resizeMode: 'contain',
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          {usernameError !== '' && (
            <Text style={styles.errorText}>{usernameError}</Text>
          )}
        </View>
        <View style={{flex: 1, flexDirection: 'row',marginBottom:-20}}>
          <Image
            source={passwordimg}
            style={{
              marginTop: 16,
              width: 20,
              height: 20,
              resizeMode: 'contain',
            }}
          />
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
        </View>

        <View style={{flex: 1, flexDirection: 'row', marginBottom:20}}>
          <Image
            source={passwordimg}
            style={{
              marginTop: 16,
              width: 20,
              height: 20,
              resizeMode: 'contain',
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
          />
          {confirmPasswordError !== '' && (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.linkButton}
          onPress={handleForgotPassword}>
          <Text style={styles.linkButtonText}>Forgot Password?</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.linkButton} onPress={handleSignUp}>
          <Text style={styles.buttonSignup}>
            Already have an account?
            <Text style={styles.linkButtonSignup}> Sign In</Text>
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
    height: '60%',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
  },
  image: {
    marginRight:10,
    width: '20%',
    height: '20%',
    resizeMode: 'contain',
    marginBottom: 16,
  },
  logoTextContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
    marginRight:10
  },
  logoText: {
    resizeMode: 'contain',
  },
  input: {
    height: 50,
    width: '80%',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#0DB3FF',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
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

export default SignupScreen;

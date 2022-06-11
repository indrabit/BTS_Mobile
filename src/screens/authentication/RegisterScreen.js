import React,{useState} from 'react';

import {  
	View,
    Text,
    TextInput,
    SafeAreaView,
    StyleSheet,
    Image,
    ScrollView,
    Alert,
    TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../../components/Card';

//Import URL
import { REGISTER_URL } from '../../service/Connect';
import axios, {Axios} from 'axios';


const RegisterScreen = ({ navigation }) => {
  // The Name of the User.
	// const [name, setName] = useState('');
	// The Email Adress of the User.
	const [email, setEmail] = useState('');
	// The Password of the User.
	const [password, setPassword] = useState('');
	// The Confirm Password of the User.
	// const [confirmPassword, setConfirmPassword] = useState('');
  const [fistname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const  ValidateForm=()=>{
		// Validate the Form Data.
		// if(name.length == 0){Alert.alert("Error", "Please enter your name.");return;}
		if(email.length == 0){Alert.alert("Error", "Please enter your email.");return;}
		if(!email.includes('@') || !email.includes('.com')){Alert.alert("Error", "Please enter a valid email.");return;}
		if(password.length == 0){Alert.alert("Error", "Please enter your password.");return;}
		if(password.length < 4){Alert.alert("Error", "Password must be atleast 6 characters long.");return;}
		// if(confirmPassword.length == 0){Alert.alert("Error", "Please confirm your password.");return;}
		// if(password !== confirmPassword){Alert.alert("Error", "Passwords don't match!");return;}
    if(fistname.length == 0){Alert.alert("Error", "Please enter your fist name.");return;}
		if(lastname.length == 0){Alert.alert("Error", "Please enter your last name.");return;}
		
		// TODO: Hash User Password.
		// TODO: Send Form Data to Server.
		
	}
  const loginHandle=()=>{
   ValidateForm();
   userSignUp();

  }
	const userSignUp=()=>{
		const user = {
            email: email,
            username:email,
            password: password,
            first_name:fistname,
            last_name:lastname
          };
		//   console.log(LOGIN_URL);
		  axios
		  .post(REGISTER_URL, user)
		  .then(res => {
			  console.log(res.status);
			if (res.status === 201) {
				// console.log(res);
				Alert.alert(
                    'User created successfully',
                    'Now go login',
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: true},
                  );

				navigation.navigate('Login');
			}
		  })
		  .catch(err => {
			console.log(err);
			Alert.alert(
                    'Error',
                    'Please make sure you fill everything',
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: true},
                  );
		  });  
	}

  return (
	<View style={styles.container}>
	<LinearGradient    colors={['#2bb673', '#3b5998', '#63c694']} style={styles.linerview}>
	  <View style={styles.header}>
		<Image  source={require('../../assets/splash.png')} style={{width:100,height:100}} />
		<Text style={styles.text_header}>Register</Text>
	  </View>

	  <Card style={styles.footer}>
		<Image  source={require('../../assets/BTS_1.png')} style={{width:500,height:70}} />
		<ScrollView>
			{/* Input Form */}
			<View style={styles.action}>
				<TextInput placeholder='Your email'  onChangeText={(val)=>{setEmail(val)}} style={styles.textInput} autoCapitalize="none" />
			</View>
			<View style={styles.action}>          
				<TextInput placeholder='Password'  onChangeText={(val)=>{setPassword(val)}} style={styles.textInput} autoCapitalize="none" secureTextEntry />
			</View>
			<View style={styles.action}>          
				<TextInput placeholder='First Name'  onChangeText={(val)=>{setFirstname(val)}} style={styles.textInput} autoCapitalize="none" secureTextEntry />
			</View>
			<View style={styles.action}>          
				<TextInput placeholder='Last Name'  onChangeText={(val)=>{setLastname(val)}} style={styles.textInput} autoCapitalize="none" secureTextEntry />
			</View>

			 {/*Button  */}
			<View style={{width:'90%'}}>      
				<TouchableOpacity onPress={()=>{loginHandle()}}>
					<LinearGradient colors={['#08d4c4','#01ab9d']} style={styles.signIn}>              
						<Text style={[styles.textSign,{color:'#fff'}]}>Submit</Text>                        
					</LinearGradient>
				</TouchableOpacity>      
			</View>
			<View style={{flexDirection:'row',marginTop:20}}>
				<View style = {styles.viewStyleForLine} />
				<Text>OR</Text>
				<View style = {styles.viewStyleForLine} />
			</View>
			<View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>      
				<Text style={styles.forgottext}>Already have an account? </Text>
				<TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
						<Text style={styles.singuptext}>Log In</Text>                        
				</TouchableOpacity>      
			</View>
	  </ScrollView>
  </Card>
  </LinearGradient>
</View>

  )
}

export default RegisterScreen;

// Style the Components.
const styles=StyleSheet.create({
    container:{
      flex:1,
    },
    viewStyleForLine: {
      borderBottomColor: "black", 
      borderBottomWidth: 1, 
      width: 100,
    },
    linerview: {
      flex: 1,
      alignItems:'center' 
    },
  header:{
    flex:2,       
     justifyContent:'center',
     alignItems:'center',
     alignContent:'center',
  },
  text_header:{
    color:'#c9ead8',
    fontWeight:'bold',
    fontSize:20
  },
  footer:{
      flex:5,
      // backgroundColor:'#f999ff',
      width:'96%',
      overflow:'hidden'
  },
  action:{
    flexDirection:'row',
    marginTop:20,
    borderBottomWidth:1,
    borderBottomColor:'#2bb473',
    paddingBottom:1
  },
  textInput:{
    flex:1,
    paddingLeft:20,
    color:'#55397b',
    fontSize:18

  },
  
  signIn:{
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    marginTop:30
  },

  textSign:{
    fontSize:22,
    fontWeight:'bold'
  },
  forgottext:{
    fontSize:18,
    fontWeight:'400',
  },
  singuptext:{
    fontSize:18,
    fontWeight:'bold',
    color:'#92a8d3'
  }

  });
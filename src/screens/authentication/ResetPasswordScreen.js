import React,{useState} from 'react';
import {  
	View,
    Text,
    TextInput,
    SafeAreaView,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../../components/Card';
//
import axios, {Axios} from 'axios';
import { PSSWORD_RESET_URL } from '../../service/Connect';

const ResetPasswordScreen = ({ navigation }) => {
  // The Email Adress of the User.
	const [email, setEmail] = useState('');

	//
	// Alert.alert("Error", "Please enter your email.")
	const ResetPassword=()=>{

		if(email.length == 0){Alert.alert("Error", "Please enter your email.");return;}
		sendEmail();
	}

	const sendEmail=()=>{
		const user = {
            email: email,
	     };
		 console.log(PSSWORD_RESET_URL);
		  axios
		  .post(PSSWORD_RESET_URL, user)
		  .then(res => {
			  console.log(res.status);
			if (res.status === 205) {
				//  console.log(res.status);

				Alert.alert(
                    'Email sent successfully',
                    'Please check your email',
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
                    'Please enter your valid email',
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: true},
                  );
		  });  
	}
  
  
  return (
        <View style={styles.container}>
            <LinearGradient  colors={['#2bb673', '#3b5998', '#63c694']} style={styles.linerview}>

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
        
                    {/*Button  */}
                    <View style={{width:'90%'}}>      
                        <TouchableOpacity onPress={()=>ResetPassword()}>
                            <LinearGradient colors={['#08d4c4','#01ab9d']} style={styles.signIn}>              
                                <Text style={[styles.textSign,{color:'#fff'}]}>Submit</Text>                        
                            </LinearGradient>
                        </TouchableOpacity>      
                    </View>
                    {/* Seperator */}
                    <View style={{flexDirection:'row',marginTop:20}}>
                        <View style = {styles.viewStyleForLine} />
                        <Text>OR</Text>
                        <View style = {styles.viewStyleForLine} />
                    </View>

                    <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>      
                        <Text style={styles.forgottext}>Remember your account? </Text>
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

export default ResetPasswordScreen;

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
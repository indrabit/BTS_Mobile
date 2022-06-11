import React,{useState,useContext} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { 
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert
  } from 'react-native';

import Card from '../../components/Card';

import axios from 'axios';
import { LOGIN_URL } from '../../service/Connect';
import { AuthContext } from '../../service/context';

const LogInScreen = ({navigation}) => {
  //use context
	const {signIn} = useContext(AuthContext);

    const [data,setData]=useState({
        email:'',
        password:'',
        isValidEmail:true,
        isValidPassword:true
      });

    const textInputChange=(val)=>{      
        setData({
          ...data,
          email:val          
        })
      }
    const handlePasswordChange=(val)=>{      
      setData({
        ...data,
        password:val          
      })
    }
        
    const handleValidUser=(val)=>{
      if(data.email.length==0){
        Alert.alert("Error", "Please enter your email.");
        
        setData({
          ...data,
          isValidEmail:false,
        })
			return;
      }

      if(!data.email.includes('@') || !data.email.includes('.com')){
        Alert.alert("Error", "Please enter a valid email.");
         
        setData({
          ...data,
          isValidEmail:false,
        })
        return;
      }
      if(data.password.length == 0){
        Alert.alert("Error", "Please enter your password.");
        setData({
          ...data,
          isValidPassword:false,
        }) 
        return;
      }

      if(data.password.length < 4){
        Alert.alert("Error", "Password must be atleast 6 characters long.");
        
        setData({
          ...data,
          isValidPassword:false,
        })        
        
        return;
      }

    }
    
    const loginHandle=(email,password)=>{
      // navigation.navigate('TabScreen');
      handleValidUser();
      if(!data.email.isValidEmail && !data.isValidPassword.isValidEmail){
        // Alert.alert("Hi " + email + " Password "+password)
        loginUser();
      }
      // console.log(email);    
    }

    const loginUser=()=>{
      const user = {
              email: data.email,
              password: data.password,
            };
      //   console.log(LOGIN_URL);
        axios
        .post(LOGIN_URL, user)
        .then(res => {
          
        if (res.status === 200) {
          const foundData=res.data;

          //  console.log(`Name = ${res.data.username}`);
          //   console.log(`Token = ${res.data.token[0]}`);
          // const userToken=`${res.data.token[0]}`;
          // console.log(userToken);
          signIn(foundData);
          navigation.navigate('TabScreen');
        }
      })
        .catch(err => {
        // console.log(err);
        
        const errorCode = parseInt(err.response.status,10);
        if(errorCode === 423){
          Alert.alert(
            'Account locked:','Many login attempts. Please try again later.',
            [{text: 'OK'}],
            {cancelable: true},
            );
        }
        else{
          Alert.alert(
            'Invalid Credentials',
            'Please check your email and password',
            [{text: 'OK'}],
            {cancelable: true},
            );
  
        }
        
        });  
    }
  
  
  
    return (
        <View style={styles.container}>
          <LinearGradient    colors={['#2bb673', '#3b5998', '#63c694']} style={styles.linerview}>
            <View style={styles.header}>
              <Image  source={require('../../assets/splash.png')} style={{width:100,height:100}} />
              <Text style={styles.text_header}>Log In to View</Text>
            </View>
      
            <Card style={styles.footer}>
              <Image  source={require('../../assets/BTS_1.png')} style={{width:500,height:70}} />
          
              <View style={styles.action}>
                  <TextInput placeholder='Your Email'  onChangeText={(val)=>{textInputChange(val)}} style={styles.textInput} autoCapitalize="none" />
              </View>
                <View style={styles.action}>          
                    <TextInput placeholder='Password'  onChangeText={(val)=>{handlePasswordChange(val)}} style={styles.textInput} autoCapitalize="none" secureTextEntry />
                </View> 
            <View style={{width:'90%'}}>      
                 <TouchableOpacity onPress={()=> loginHandle(data.email,data.password)}>
                    <LinearGradient colors={['#08d4c4','#01ab9d']} style={styles.signIn}>              
                        <Text style={[styles.textSign,{color:'#fff'}]}>Sign In</Text>                        
                    </LinearGradient>
                </TouchableOpacity>      
            </View>
            <View style={{flexDirection:'row',marginTop:20}}>
              <View style = {styles.viewStyleForLine} />
                <Text>OR</Text>
              <View style = {styles.viewStyleForLine} />
            </View>

            <View style={{width:'90%',marginTop:20, alignItems:'center'}}>      
                 <TouchableOpacity onPress={() => navigation.navigate('Reset')}>
                    <Text style={{fontSize:18,fontWeight:'400',color:'#D2691E'}}>Forgotten your password?</Text>                        
                </TouchableOpacity>      
            </View>

            <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>      
                 <Text style={{fontSize:18,fontWeight:'400'}}>Don't have an account? </Text>
                 <TouchableOpacity onPress={()=>{navigation.navigate('Register')}}>
                        <Text style={styles.singuptext}>Sign up</Text>                        
                </TouchableOpacity>      
            </View>
        </Card>
        </LinearGradient>
    </View>
  );
}

export default LogInScreen;

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
    marginTop:30,
    borderBottomWidth:1,
    borderBottomColor:'#2bb473',
    paddingBottom:10
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
  singuptext:{
    fontSize:18,
    fontWeight:'bold',
    color:'#92a8d3'
  }
  });
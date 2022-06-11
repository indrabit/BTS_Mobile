import React ,{useState,useEffect,useContext} from 'react'
import { View,Text,TouchableOpacity,StyleSheet } from 'react-native';
//use context
import { AuthContext,USER_KEY,TOKEN_KEY } from '../../service/context';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


const MoreScreen = ({ navigation}) => {

  const isFocused = useIsFocused();
	const [useauth,setUseauth]=useState(false);
	const [username,setUsername]=useState('');
	const {signOut}=useContext(AuthContext);
	
	
	useEffect(()=>{
		if(isFocused){
			getAuthState();
		}
	},[isFocused]);

	 // Get Auth state
	const getAuthState = async () => {
        try {
				//GET TOKEN
				let token = await AsyncStorage.getItem(TOKEN_KEY);
				let userValue=await AsyncStorage.getItem(USER_KEY);
				if (token !== null){
					setUseauth(true);
					const v='Hello '+ userValue + ', SignOut'
					setUsername(v);
				}
			} catch (error) {
            throw new Error(error)
        }
    };
	
	const logOut=()=>{
		signOut('');
		setUseauth(false);
		setUsername('');
    navigation.navigate('Login')
	}

  return (
    <View>
      <Text>More</Text>
      <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>      
        <Text style={{fontSize:18,fontWeight:'400'}}>Back to Login </Text>
        
              <TouchableOpacity onPress={()=>logOut()}>
             <Text style={styles.singuptext}>Logout</Text>                        
            </TouchableOpacity>
          
               
      </View>
    </View>
  )
}

export default MoreScreen;

// Style the Components.
const styles = StyleSheet.create({
singuptext:{
  fontSize:18,
  fontWeight:'bold',
  color:'#92a8d3'
}
});
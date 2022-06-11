import React,{useReducer,useMemo} from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Import the application screens
import LogInScreen from '../screens/authentication/LogInScreen';
import RegisterScreen from '../screens/authentication/RegisterScreen';
import ResetPasswordScreen from '../screens/authentication/ResetPasswordScreen';

//
import TabNavigation from './TabNavigation';
//
import { AuthContext } from '../service/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_KEY,USER_KEY } from '../service/context';

//  Create a Native Stack Navigator.
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
	
  const initialLoginState={
		isLoading:true,
		userToken:null,
		userKey:null
	  };

  // Define loign Reducer
	const loginReducer=(preState,action)=>{
		switch(action.type){
		case 'RETRIEVE_TOKEN':
			return{
				...preState,
				userToken:action.token,
				userKey:action.userKey,
				isLoading:false
			};
		case 'LOGIN':
			return{
				...preState,
				userToken:action.token,
				userKey:action.userKey,
				isLoading:false
			};
		case 'LOGOUT':
			return{
					...preState,
				userToken:null,
				userKey:null,
				isLoading:false
			};
		case 'RETRIEVE_INFO':
			return{
			...preState,                     
			};
		}
	};
  const[loginState,dispatch]=useReducer(loginReducer,initialLoginState);
  
  const authContext=useMemo(()=>({
		signIn:async(foundUser)=>{
			const userToken=`${foundUser.token[0]}`;
			const userKey=`${foundUser.username[0]}`;
			console.log(userToken)
		  try{
			await AsyncStorage.setItem(TOKEN_KEY,userToken);
			await AsyncStorage.setItem(USER_KEY,userKey);   
			console.log("Login success");     
		  }
		  catch(e){
			console.log(e);
		  }
		  dispatch({type:'LOGIN',token:userToken,userKey:userKey});            
		},
		signOut:async()=>{
		  try{
			await AsyncStorage.removeItem(TOKEN_KEY);
			await AsyncStorage.removeItem(USER_KEY);
			console.log("SignOut success");
		  }
		  catch(e){
			console.log(e);
		  }
		dispatch({ type: 'LOGOUT' });
		},

		retrieve:async()=>{
			let userToken='';
			let userKey='';
			try{
				 userToken= await AsyncStorage.getItem(TOKEN_KEY);
				userKey=await AsyncStorage.getItem(USER_KEY);
			  console.log("retrive success" + userKey);
			}
			catch(e){
			  console.log(e);
			}
		  dispatch({ type: 'RETRIEVE_TOKEN',token:userToken,userKey:userKey });
		  },
			   
	  }),[]);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
          <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            headerBackVisible: false,
            headerTitle: '',
            animation: 'slide_from_bottom',
          }}>
              <Stack.Screen name="Login" component={LogInScreen}/>
              <Stack.Screen name="Register" component={RegisterScreen}/>
              <Stack.Screen name="Reset" component={ResetPasswordScreen}/>
              <Stack.Screen name="TabScreen" component={TabNavigation}/>
          </Stack.Navigator>
    </NavigationContainer>
  </AuthContext.Provider>
  );
}

export default AuthNavigator;
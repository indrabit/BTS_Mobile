import React,{useEffect,useState,useContext} from 'react'
import {Alert, View,Text,TextInput,TouchableOpacity,StyleSheet,ScrollView } from 'react-native';
import { API_URL } from '../../service/Connect';
import Mybutton from '../../components/Mybutton';
import ButtonStatus from '../../components/ButtonStatus';
import axios from 'axios';
import { AuthContext } from '../../service/context';

// import Person from '../../api/Person';
import ListCard from '../../components/ListCard';
const PersonScreen = ({navigation,route}) => { 
  // 
  const {signOut}=useContext(AuthContext);
  //Set data fields
  const [data,setData]=useState({
    email:'',
    firstname:'',
    lastname:'',
    mobile:''
  });
  const[firstname,setFirstname]=useState('');
  const[lastname,setLasttname]=useState('');
  const[email,setEmail]=useState('');
  const[mobile,setMobile]=useState('');
  
  const [edit,setEdit]=useState(false);
  // Change password
  const [passwordOld,setPasswordOld]=useState('');
  const [passwordNew,setPasswordNew]=useState('');
  const [editpassword,setEditpassword]=useState(false);
  
  //Access user id
  const id=route.params.userId;
  const token=route.params.token;
  //console.log(token)  
  useEffect(()=>{
    fetchData();       
  },[]);

// Get user data
const fetchData = async () => {
  const access_url=API_URL+"/enrolment/users_list/"+id
  // console.log(access_url)
  fetch(access_url)
  .then((res) => res.json())
  .then((response) => {     
    setData({       
      email:response.email,
      firstname:response.first_name,
      lastname:response.last_name,
      mobile:response.mobile
    })   
  })
};

  const firstnameChange=(val)=>{
    setData({
      ...data,
      firstname:val
    })
  }
  const lastnameChange=(val)=>{
    setData({
      ...data,
      lastname:val
    })
  }
  const emailChange=(val)=>{
    setData({
      ...data,
      email:val
    })
  }
  const mobileChange=(val)=>{
    setData({
      ...data,
      mobile:val
    })
  }
  const  ValidateForm=()=>{		
    
    if(data.firstname.length == 0){Alert.alert("Error", "Please enter your fist name.");return false;}
		if(data.lastname.length == 0){Alert.alert("Error", "Please enter your last name.");return false;}	
		if(data.email.length == 0){Alert.alert("Error", "Please enter your email.");return false;}		
    if (validate(data.email)===false){  Alert.alert("Error", "Please enter a valid email."); return false;}
    if(data.mobile.length == 0){Alert.alert("Error", "Please enter your mobile.");return false
    ;}
    
    return true;
	}
  
  //Email Validation
  const validate = (text) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;    
    if (reg.test(text) === false) {        
      return false;
    }
    else{ 
      return true;
    }
  }
  
  // Save user profile
  const handleUpdate=(email,firstname,lastname,mobile)=>{
    if(ValidateForm() !==false){
       profileUpdate(email,firstname,lastname,mobile);
    }    
  }
// API connection
  const profileUpdate=(email,firstname,lastname,mobile)=>{
    const updateprofile_url=`${API_URL}/enrolment/updateProfile/${id}`;
		const user = {
      email: email,
      first_name: firstname,
      last_name: lastname,
      mobile: mobile        
    };                
		  axios.post(updateprofile_url, user)
		  .then(res => {        
			if (res.status === 200) {				
				Alert.alert(
            'Update ',
            'update successfully',
            [{text: 'OK'}],
            {cancelable: true},
          );          
			}
		  })
		  .catch(err => {
					Alert.alert(
        'Error',
        'Please make sure you fill everything',
        [{text: 'OK'}],
        {cancelable: true},
      );
		  });      
    }
    const handlePassword=()=>{
      const updateprofile_url=`${API_URL}/api/passwordupdate/`;
      const password = {
        userid: id,
        password_old: passwordOld,
        password_new: passwordNew,        
      };

      axios.put(updateprofile_url, password)
      .then(response => {
        if (response.status===200){
          Alert.alert(
            'Update ',
            'update successfully',
            [{text: 'OK'}],
            {cancelable: true}
          );
        }
      }).catch(error => {
        Alert.alert(
          'Error',
          'Please enter valid password',
          [{text: 'OK'}],
          {cancelable: true})
      })
    }

  return (
    <ScrollView style={{flex:1}}>
      {/* Edit profile */}
        {edit?(
           <ListCard>
            <ButtonStatus onPress={()=>{setEdit(false)}} title="Cancel"/>                       
           <View>
              <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>
                <TextInput value={data.firstname} style={styles.inputbox} placeholder="First Name" onChangeText={(val)=>{firstnameChange(val)}} />
              </View>
              <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>
                  <TextInput  defaultValue={data.lastname} style={styles.inputbox} placeholder="Last Name" onChangeText={(val)=>{lastnameChange(val)}} />
              </View>             
             <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>
                <TextInput  defaultValue={data.email} style={styles.inputbox} placeholder="Your Email" onChangeText={(val)=>{emailChange(val)}} keyboardType={'email-address'}/>
            </View>
            <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>
                <TextInput  defaultValue={data.mobile} style={styles.inputbox} placeholder="Your Mobile" onChangeText={(val)=>{mobileChange(val)}}  keyboardType='numeric' />
            </View>
          </View>
              <Mybutton onPress={()=>handleUpdate(data.email,data.firstname,data.lastname,data.mobile)} title="Submit"  />
         </ListCard>
         
         ):(
          //  view profile
          <ListCard>
          <ButtonStatus onPress={()=> setEdit(true)} title="Update Profile"/>           
          <View>
            <Text style={styles.label}>Name: {data.firstname + ' '+data.lastname}</Text>
            <Text style={styles.label}>Email: {data.email}</Text>
            <Text style={styles.label}>Mobile: {data.mobile} </Text>
          </View>
       </ListCard>
         )
        }
         {/* Edit view */}
         {editpassword?(
            <ListCard>                 
              <ButtonStatus onPress={()=>setEditpassword(false)} title="Cancel"/>                      
              <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>
                    <TextInput  style={styles.inputbox} placeholder="Old Password" onChangeText={(val)=>{setPasswordOld(val)}} secureTextEntry />
              </View>

              <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>
                    <TextInput style={styles.inputbox} placeholder="New Password" onChangeText={(val)=>{setPasswordNew(val)}}  secureTextEntry />
              </View>
                <Mybutton onPress={()=> handlePassword()} title="Update"  />          
        </ListCard>          
         ):(
          <ListCard>
              <ButtonStatus onPress={()=>setEditpassword(true)} title="Change Password"/>                                                          
        </ListCard>
         )
      }            
    </ScrollView>
  )
}

export default PersonScreen;
const styles=StyleSheet.create({
  container:{
    flex:1,
  },
  
text_header:{
  color:'#c9ead8',
  fontWeight:'bold',
  fontSize:20
},
textInput:{
  flex:1,
  paddingLeft:20,
  color:'#55397b',
  fontSize:18
  },

label:{
  // height:50,
  justifyContent:'center',
  alignItems:'center',
  borderRadius:10,
  marginTop:30
},

inputbox: {
  height: 40,
  margin: 12,
  borderWidth: 1,
  padding: 10,
  width:200},
});
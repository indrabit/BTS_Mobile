import React,{useEffect,useContext,useState} from 'react'
import { View,Text,TextInput,TouchableOpacity,StyleSheet } from 'react-native';
import { TOKEN_KEY,USER_KEY } from '../../service/context';
import { AuthContext } from '../../service/context';
import { useIsFocused } from '@react-navigation/native';
import { API_URL } from '../../service/Connect';
import Mybutton from '../../components/Mybutton';

// import Person from '../../api/Person';
import Card from '../../components/Card';

const PersonScreen = ({navigation,route}) => {
  const isFocused = useIsFocused();
  const [data,setData]=useState([]);
  const [load,setLoad]=useState();
  const [edit,setEdit]=useState(false);
  const id=route.params.userId;
  // console.log(id)
  
  useEffect(()=>{
    if(isFocused){
        fetchData();
    }
  },[isFocused]);


  const fetchData = async () => {
    const access_url=API_URL+"/enrolment/users_list/"+id
    console.log(access_url)
    fetch(access_url)
    .then((res) => res.json())
    .then((response) => {
      // console.log(response.first_name)
        setData(response)
    })
  };
  const handleEdit=()=>{
    setEdit(true);
  }
  const handleCancel=()=>{
    setEdit(false);
  }
  
  return (
    <View style={{flex:1}}>
      {/* Edit profile */}
        {edit?(
           <Card>
           <View style={{flexDirection:'row',marginTop:20,}}>
               <View style = {styles.viewStyleForLine} />
                 <TouchableOpacity onPress={()=>{handleCancel()}}>
                     <Text style={[styles.label, { borderWidth:1, fontSize:20,color:'#D2691E'}]}>Cancel</Text>                        
                 </TouchableOpacity>    
                 <View style = {styles.viewStyleForLine} />
            </View>
           <View>
              <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>
                <TextInput value={data.first_name} style={styles.inputbox} placeholder="First Name"/>
              </View>
              <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>
                  <TextInput  value={data.last_name} style={styles.inputbox} placeholder="Last Name"/>
              </View>             
             <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>
                <TextInput  value={data.email} style={styles.inputbox} placeholder="Your Email"/>
            </View>
            <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>
                <TextInput  value={""} style={styles.inputbox} placeholder="Your Mobile"/>
            </View>
          </View>
              <Mybutton onPress={()=>handleCancel() } title="Submit"  />
         </Card>
         
         ):(
          //  view profile
          <Card>
          <View style={{flexDirection:'row',marginTop:20,}}>
              <View style = {styles.viewStyleForLine} />
                <TouchableOpacity onPress={()=>{handleEdit();}}>
                    <Text style={[styles.label, { borderWidth:1, fontSize:20,color:'#D2691E'}]}>Edit</Text>                        
                </TouchableOpacity>      
                <View style = {styles.viewStyleForLine} />
            </View>
          <View>
            <Text style={styles.label}>Name: {data.first_name + ' '+data.last_name}</Text>
            <Text style={styles.label}>Email: {data.email}</Text>
            <Text style={styles.label}>Mobile: </Text>
          </View>
      </Card>

         )
        }
         {/* Edit view */}
          
      
    </View>
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

label:{
  // height:50,
  justifyContent:'center',
  alignItems:'center',
  borderRadius:10,
  marginTop:30
},
viewStyleForLine: {
  borderBottomColor: "black", 
  borderBottomWidth: 1, 
  width: '46%',
},
inputbox: {
  height: 40,
  margin: 12,
  borderWidth: 1,
  padding: 10,
  width:200

},
});
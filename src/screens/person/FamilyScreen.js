import React,{useState} from 'react'
import { View,Text,StyleSheet,TouchableOpacity,TextInput,ScrollView } from 'react-native';
import Card from '../../components/Card';
import { useIsFocused } from '@react-navigation/native';
import Mybutton from '../../components/Mybutton';
const FamilyScreen = ({navigation,route}) => {
const isFocused = useIsFocused();
  const [data,setData]=useState([]);
  const [load,setLoad]=useState();
  const [edit,setEdit]=useState(false);
  
  const id=route.params.userId;
  return (
    <ScrollView style={styles.container}>
        <Card>
            <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>
            <TextInput value={data.first_name} style={styles.inputbox} placeholder="Family Member Type"/>
            </View>

            <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>
            <TextInput value={data.first_name} style={styles.inputbox} placeholder="First Name"/>
            </View>
            <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>
                <TextInput  value={data.last_name} style={styles.inputbox} placeholder="Last Name"/>
            </View>             
            <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>
            <TextInput  value={data.email} style={styles.inputbox} placeholder="Email"/>
            </View>
            <View style={{marginTop:20,alignContent:'flex-end',flexDirection:'row'}}>
                <TextInput  value={""} style={styles.inputbox} placeholder="Mobile"/>
            </View>
            <Mybutton onPress={()=>handleCancel() } title="Submit"  />

        </Card>
    </ScrollView>
  )
}
export default FamilyScreen;
const styles=StyleSheet.create({
    container:{
      flex:1,
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
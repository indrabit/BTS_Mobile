import React from 'react'
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';

const ButtonStatus = (props) => {
  return (
    <View style={{flexDirection:'row',marginTop:5}}>
    <View style = {styles.viewStyleForLine} />
      <TouchableOpacity onPress={props.onPress}>
          <Text style={[styles.label, { borderWidth:1, fontSize:20,color:'#D2691E'}]}>{props.title}</Text>                        
      </TouchableOpacity>    
      <View style = {styles.viewStyleForLine} />
    </View>
  )
}

export default ButtonStatus;

const styles=StyleSheet.create({
    viewStyleForLine: {
        borderBottomColor: "black", 
        borderBottomWidth: 3, 
        width: '25%',        
      },

    label:{
    // height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
   
    },
    
    })

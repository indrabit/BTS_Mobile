import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    
  } from 'react-native';
const Mybutton = (props) => {
  return (
    <View style={{width:'90%'}}>      
        <TouchableOpacity onPress={()=>props.onPress}>
            <LinearGradient colors={['#08d4c4','#01ab9d']} style={styles.signIn}>              
                <Text style={[styles.textSign,{color:'#fff'}]}>{props.title}</Text>                        
            </LinearGradient>
        </TouchableOpacity>      
    </View>
    )
}
export default Mybutton;

const styles=StyleSheet.create({
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
});
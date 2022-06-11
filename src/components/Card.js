import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
    return (
      <View style={{...styles.card,...props.style}}>
          {props.children}
      </View>
    )
  }
  
export default Card;
const styles=StyleSheet.create({
    card:{        
        alignItems:'center',
        shadowColor:'black',
        shadowOffset:{width:0,height:12},
        shadowRadius:10,
        shadowOpacity:0.26,
        backgroundColor:'#ffffff',
        elevation:5,        
        borderTopLeftRadius:25
        // borderRadius:24
    },
    
});
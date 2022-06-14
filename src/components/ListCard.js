import React from 'react';
import { View, StyleSheet } from 'react-native';

const ListCard = (props) => {
    return (
      <View style={{...styles.card,...props.style}}>
          {props.children}
      </View>
    )
  }
  
export default ListCard;
const styles=StyleSheet.create({
    card:{        
        alignItems:'center',
        shadowColor:'black',
        shadowOffset:{width:0,height:10},
        shadowRadius:10,
        shadowOpacity:0.26,
        backgroundColor:'#ffffff',
        elevation:5,        
        borderTopLeftRadius:2,
        margin:5
        // borderRadius:24
    },
    
});
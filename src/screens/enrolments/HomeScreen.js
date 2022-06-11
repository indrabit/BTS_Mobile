import React,{useState,useEffect} from 'react'
import { StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,} from 'react-native';
import { SafeAreaView } from 'react-native';
import Card from '../../components/Card';
import { USER_KEY,TOKEN_KEY } from '../../service/context';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({ navigation }) => {
  // Generating Dummy Data
  const DATA = [
    {id:1, title: "You",      color:"#FF4500", members:1,  image:"https://img.icons8.com/color/70/000000/name.png"},
    {id:2, title: "Family",   color:"#6A5ACD", members:2,  image:"https://img.icons8.com/color/70/000000/family.png"} ,
    {id:8, title: "Family Dotctor",    color:"#20B2AA", members:2, image:"https://img.icons8.com/doodle/344/doctor-male.png"} ,
    {id:3, title: "School",   color:"#00BFFF", members:2,  image:"https://img.icons8.com/color/70/000000/classroom.png"} ,
    {id:4, title: "Student",     color:"#87CEEB", members:2,  image:"https://img.icons8.com/office/70/000000/home-page.png"},
    {id:9, title: "Enrolment", color:"#191970", members:1, image:"https://img.icons8.com/color/70/000000/to-do.png"} ,
  
  ]
  const isFocused = useIsFocused();
  const [user,setUser]=useState();
  const [data, setData] = useState([]);

  // Use effect to acces user id
  useEffect(()=>{
    if(isFocused){
        useraccess();
      }
    },[isFocused]);


  const useraccess=async()=>{
    let userToken=null
    let userKey=null

    try{
        userToken= await AsyncStorage.getItem(TOKEN_KEY);
         userKey=await AsyncStorage.getItem(USER_KEY);
        console.log("retrive success" + userKey);
        setUser(userKey)
        }
        catch(e){
      console.log(e);
     }
  }

  const ItemRender=({item}) => {
    return (
      <TouchableOpacity style={[styles.card, {backgroundColor:item.color}]} onPress={() => clickEventListener(item)}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.icon} source={{uri:"https://img.icons8.com/ios/40/000000/settings.png"}}/>
      </View>
      <Image style={styles.cardImage} source={{uri:item.image}}/>
      <View style={styles.cardFooter}>
        <Text style={styles.subTitle}>{item.members} members</Text>
      </View>
    </TouchableOpacity>
    )
  }
  const clickEventListener=(item)=>
   {

     if(item.id==1){
       navigation.navigate("Person",{userId:user})   
     } 
     else if (item.id==2){
      navigation.navigate("Family",{userId:user})
     }
    
    // Alert.alert(item.title);
  }
    return (
    <SafeAreaView style={styles.container}>
      <Card style={{marginTop:50}}>
        <FlatList
        data={DATA}
        contentContainerStyle={styles.listContainer}
        horizontal={false}
        numColumns={2} 
        keyExtractor= {(item) => {
            return item.id;
          }} 
        renderItem={(itemData) => <ItemRender item={itemData.item} />}
      />
      </Card>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    //paddingHorizontal: 5,
    backgroundColor:"#E6E6E6",
  },
  listContainer:{
    alignItems:'center'
  },
  /******** card **************/
  card:{
    marginHorizontal:2,
    marginVertical:2,
    flexBasis: '48%',
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    height: 70,
    width: 70,
    alignSelf:'center'
  },
  title:{
    fontSize:16,
    flex:1,
    color:"#FFFFFF",
    fontWeight:'bold'
  },
  subTitle:{
    fontSize:12,
    flex:1,
    color:"#FFFFFF",
  },
  icon:{
    height: 20,
    width: 20, 
  }
});    
import { useState } from "react";
import {StyleSheet, Text, TouchableOpacity, View ,ToastAndroid} from 'react-native';
import { MaterialIcons, AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
 
const DisplayList=({item,deleteContactHandler,editContactPressHandler,infoClickHandler})=>{

    const [toggle,setToggle]= useState(false)
    
    const showToast = () => {
      ToastAndroid.show("long press to delete the contact", ToastAndroid.SHORT);
    };

    return(
    <>
     <View style={styles.listBar}>
        <View style={styles.itemsLeft}>
          <TouchableOpacity onPress={() => infoClickHandler(item)}>
            <View style={styles.contactImg}>
              <FontAwesome5 name="user" size={28} color="black" style={styles.firstLetter} />
          </View>
          </TouchableOpacity>
          <View style={styles.contactInfo}>        
          <View>
            <Text style={styles.infoName}>{item.firstName} {item.lastName}</Text>
            <Text style={styles.infoNo}>{item.phoneNo}</Text>
          </View>
            {item.favourite? <View>
            <View style={styles.favIcon}><MaterialIcons name="star" size={18} color="grey"/></View>
            </View>:""}
          </View> 
        </View>
        <TouchableOpacity style={styles.itemsRight} onPress={() => setToggle(!toggle)}>
        {!toggle ? <AntDesign name="downcircleo" size={24} color="grey" />:
        <AntDesign name="upcircleo" size={26} color="black" />}
        </TouchableOpacity>
      </View>
      <View>
      {toggle ? <View style={styles.buttons}>
          <View>
            <Entypo name="edit" size={24} color="black" onPress={() => editContactPressHandler(item)} style={styles.edtBtn}/>
          </View>
          <View><AntDesign name="delete" size={24} color="red" onLongPress={() => deleteContactHandler(item._id)} style={styles.delBtn} onPress={()=>showToast()} /></View>
         </View> : ""}
      </View>
    </>
    )
}
export default DisplayList;

const styles = StyleSheet.create({
    listBar: {
      marginTop: 5,
      marginLeft:5,
      height: 57,
      width: '98%',
      backgroundColor : 'white',//'#f2f2f2',
      flexWrap: 'wrap',
      borderBottomLeftRadius: 22,
      borderBottomRightRadius:20,
      borderTopLeftRadius: 22,
      borderTopColor: '#b3b3b3',
      borderTopWidth: 1,
      borderLeftColor:'#b3b3b3',
      borderLeftWidth: 1,
      elevation: 4
  
    },
    itemsLeft: {
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 3,
    },
    contactImg: {
      width: 48,
      borderRadius: 20,
      height: '85%',
      backgroundColor: 'white',
      borderColor: '#003566',
      border: 2,
      borderColor:'black',
      marginLeft:2,
      justifyContent:'center',
      elevation: 4,
    },
    contactInfo: {
      paddingLeft: 5,
      margin: 2,
      height: '97%',
      backgroundColor: 'white',
      width: '80%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
  
    },
    itemsRight: {
      marginTop: 2,
      width: 42,
      borderBottomEndRadius: 18,
      height: '93%',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      elevation:4
  
    },
    infoName: {
      fontSize: 21,
      margin: 1,
      flexWrap: 'wrap',
      fontWeight:'400',
      letterSpacing:1
  
    },
    infoNo: {
      fontSize: 15,
      margin: 2,
      flexWrap: 'wrap',
      letterSpacing: 0.5
  
    },
    contactDetails: {
      fontSize: 35,
      height: '100%',
      marginBottom: 5,
      color: '#003566'
  
    },
    firstLetter: {
      textAlign: 'center',
      marginBottom: 0,
      color: '#737373',
      marginLeft: 0,
    },
    edtBtn: {
      color: '#003566',
      paddingRight: 25
    },
    buttons: {
      flexDirection: 'row',
      backgroundColor: 'white',
      height: 32,
      borderRadius: 0,
      paddingLeft: '77%',
      margin: 2
    },
    favIcon:{
      fontSize:18,
      paddingRight:10
    }
  });
  
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons,Fontisto ,Entypo  } from '@expo/vector-icons';

export const ContactInfo = (data) => {

    const [value,setValue] = useState(data.route.params)
    console.log('data :',data.route.params)

    useEffect(() => {
        if (data?.route?.params) {
            setValue(data.route.params)
        }
    }, [])
    return (
        <SafeAreaView>
             <ScrollView style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.info}>{value.firstName} {value.lastName}</Text>
                        {(value.gender)=='male'|| (value.gender)=='' ||(value.gender)=='MALE' ? <Fontisto name="male" size={30} color="black" style={styles.info}/>:
                        <Fontisto name="female" size={24} color="black" style={styles.info}/>}
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Phone Number</Text>
                        <Text style={styles.info}>{value.phoneNo}</Text> 
                        <Ionicons name="call-sharp" size={24} color="black" style={styles.info}/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Alternate Number</Text>
                        <Text style={styles.info}>{(value.alternateNo) == 0 ? 'Empty' : (value.alternateNo)}</Text>
                        <Ionicons name="call-sharp" size={24} color="black" style={styles.info} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Email ID</Text>
                        <Text style={styles.info}><Entypo name="email" size={24} color="black" style={styles.info}/> {(value.emailId) == 0 ? 'Empty' : (value.emailId)}</Text>
                    </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
   container:{
    height: '100%',

   },
    label: {
        fontSize: 25,
        marginTop: 0,
        alignItems: 'center',
        color:'#bfbfbf'
    },
    textContainer: {
        marginTop: 15,
        height: 100,
        width: '95%',
        marginLeft: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center',
        borderWidth: 2,
        borderColor: '#ccf2ff'
    },
    info:{
        fontSize: 25,
        color: 'black',
        marginLeft:20  ,
        marginTop:8  
    },
    btn: {
        width: '98%',
        height: 49,
        marginTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
        border: 1,
        backgroundColor: '#d9d9d9',
        borderRadius: 12,
    },
    submitText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      alignItems: 'center',
    }
   
    
});

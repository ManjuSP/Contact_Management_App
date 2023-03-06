import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, ToastAndroid, RefreshControl } from 'react-native';
import axios from 'axios'
import DisplayList from '../DisplayList';

function Contacts({ route, navigation }) {
  let p = route?.params?.item;

  const [Contacts, setContacts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [phoneNo, setPhoneNo] = useState('');
  
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    navigation.navigate(('Home'), { item: Math.random() })
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    (async () => {
      await axios.get('http://192.168.1.8:9000/contacts')
        .then((data) => {
          setContacts([...data?.data?.result])
          // setPhoneNo('contacts values ',{...Contacts.map((ele)=>{
          //   return ele.phoneNo;
          // })})
          // console.log('phone numbers ', [...data?.data?.result])
          // console.log('contacts values ',{...Contacts.map((ele)=>{
          //   return ele.phoneNo;
          // })})
          // setPhoneNo({...Contacts.map((ele)=>{
          //   return ele.phoneNo;
          // })})
          // console.log(phoneNo)
          // console.log({...phoneNo})

        })
        .catch((err) => {
          console.log('error ' + err)
        })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
    })()

  }, [p])

  const showToast = () => {
    ToastAndroid.show("deleted successfully", ToastAndroid.SHORT);
  };

  function infoClickHandler(item) {
    navigation.push(('Info'), item)
  }
  function editContactPressHandler(item) {
    navigation.push(('Add-Edit'), { item, method: 'put' })
  }
  function deleteContactHandler(id) {
    axios({
      method: 'delete',
      url: 'http://192.168.1.8:9000/contacts/' + id
    })
      .then(() => {
        navigation.navigate(('Home'), { item: Math.random() })
        showToast()
      })
  }
  const renderItem = ({ item }) => (
    <View style={styles.listBar}>
      <DisplayList item={item} editContactPressHandler={editContactPressHandler} deleteContactHandler={deleteContactHandler} infoClickHandler={infoClickHandler} />
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={Contacts}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </SafeAreaView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 0,
    height: '95%'
  },
});

export default Contacts;
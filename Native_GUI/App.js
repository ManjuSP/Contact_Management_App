import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contacts from './screens/Contacts';
import AddContact from './screens/AddContact';
import {ContactInfo} from './screens/ContactInfo';
import { Ionicons,AntDesign } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
 
function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Contacts} 
          options={({navigation}) => ({
            headerTitle: () => 
            <View style={styles.HeaderConatiner}>
            <AntDesign name="contacts" size={30} color="black" style={styles.contactsIcon} />
            <Text style={styles.tittleText}>   My Contacts </Text>
            <View style={styles.icons}>
                <Ionicons name="ios-person-add" size={30} color="black" onPress={() => navigation.push(('Add-Edit'),{method:'post'},{item: Math.random()})} />
            </View>
            </View>
          })}
        />
        <Stack.Screen name="Add-Edit" component={AddContact}
          options={() => ({
            headerTitle: () => <>
            <Text style={styles.tittleText}>CONTACT</Text><AntDesign name="edit" size={24} color="black" style={styles.contactsIcon} /></>
          })} />
        <Stack.Screen name='Info' component={ContactInfo}
         options={() => ({
            headerTitle: () => <Text style={styles.infoText}>CONTACT DETAILS</Text>
          })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  HeaderConatiner:{
    width:'100%',
    height:'100%',
    flexDirection:'row',
    alignItems:'center',

  },
  tittleText: {
    width:'74%',
    fontSize: 28,
    paddingLeft: 10,
    fontWeight: 'bold'
  },
  infoText:{
    fontSize: 24,
    paddingLeft: 20,
    fontWeight: 'bold'
  },
  contactsIcon:{
    marginRight: 10,
    
  },
  icons:{
    flexDirection:'row',
  }
})
export default App;


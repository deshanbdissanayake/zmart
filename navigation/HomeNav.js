import React, {useContext} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { FontAwesome5, Ionicons } from 'react-native-vector-icons'; 

// Import your screens or components
import ProListNav from './ProListNav';
import OrdListNav from './OrdListNav';
import MyProListNav from './MyProListNav';
import AddProductScreen from '../screens/AddProductScreen';
import colors from '../assets/colors/colors';

const Drawer = createDrawerNavigator();

// Custom drawer content component
const CustomDrawerContent = ({ navigation, state, descriptors, handleLogout }) => {

  const closeDrawer = () => {
    navigation.closeDrawer();
  };

  const handleLogoutClick = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout from the app ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            console.log('logout')
            handleLogout
          },
        },
      ]
    );
    
  };

  return (
    <DrawerContentScrollView style={styles.drawerWrapper}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageWrapper}>
          <FontAwesome5 name="user" size={50} color={colors.textDark} />
        </View>
        <View style={styles.profileTextWrapper}>
          <Text style={styles.profileText}>User Profile</Text>
        </View>
        <TouchableOpacity style={styles.drawerClose} onPress={closeDrawer} >
          <Ionicons name="close" size={24} color={colors.textLight} />
        </TouchableOpacity>
      </View>

      {/* Drawer Items */}
      <DrawerItemList 
        state={state} 
        navigation={navigation} 
        descriptors={descriptors} 
      />

      {/* Other Drawer Buttons */}
      <DrawerItem label="Terms & Conditions" labelStyle={styles.drawerItem} />
      <DrawerItem label="About Us" labelStyle={styles.drawerItem} />
      <DrawerItem 
        label="Logout" 
        labelStyle={styles.drawerItem} 
        onPress={() => {
          handleLogoutClick();
        }} 
      />

    </DrawerContentScrollView>
  );
};

const HomeNav = (props) => {
  const { handleLogout } = props;

  return (
    <Drawer.Navigator
      initialRouteName="My Products"
      drawerContent={(dprops) => <CustomDrawerContent {...dprops} handleLogout={handleLogout} />}
      screenOptions={{
        drawerActiveTintColor: colors.secondary,
        drawerInactiveTintColor: colors.white,
      }}
    >
      <Drawer.Screen
        name="My Products"
        component={MyProListNav}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="My Orders"
        component={OrdListNav}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Products List"
        component={ProListNav}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Create Product"
        component={AddProductScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.bgDark,
          },
          headerTitleStyle: {
            color: colors.textLight,
          },
          headerTintColor: colors.secondary,
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeNav;

const styles = StyleSheet.create({
  drawerWrapper:{
    backgroundColor: colors.bgDark,
    color: colors.white,
  },
  profileSection:{
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  profileImageWrapper:{
    backgroundColor: colors.secondary,
    padding: 25,
    borderRadius: 50,
    margin: 10,
  },
  profileTextWrapper:{
    marginBottom: 5,
  },
  profileText:{
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.white,
  },
  drawerClose:{
    position: 'absolute',
    top: 0,
    right: 0,
  },
  drawerItem:{
    color: colors.white,
  },
})
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
import AuthContext from '../context/AuthContext';

const Drawer = createDrawerNavigator();

// Custom drawer content component
const CustomDrawerContent = ({ navigation, state, descriptors }) => {
  const { logData, logout } = useContext(AuthContext)

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
            console.log('logout');
            logout();
          },
        },
      ]
    );
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.drawerWrapper}
    >
      {/* Profile Section */}
      <View style={styles.drawerTopWrapper}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageWrapper}>
            <FontAwesome5 name="user" size={50} color={colors.textDark} />
          </View>
          <View style={styles.profileTextWrapper}>
            <Text style={styles.profileText}>{logData.log_userName}</Text>
            <Text style={styles.profilePhone}>{logData.log_userNumber}</Text>
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
      </View>
      <View style={styles.drawerBottomWrapper}>
        <DrawerItem
          label="Logout"
          labelStyle={{color: colors.white}}
          onPress={handleLogoutClick}
          icon={({ size }) => (
            <Ionicons name="log-out-outline" size={size} color={colors.white} />
          )}
        />
      </View>

    </DrawerContentScrollView>
  );
};

const HomeNav = () => {

  return (
    <Drawer.Navigator
      initialRouteName="My Products"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: colors.secondary,
        drawerInactiveTintColor: colors.white,
      }}
    >
      <Drawer.Screen
        name="My Products"
        component={MyProListNav}
        options={{
          drawerLabel: 'My Products',
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'ios-cart' : 'ios-cart-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="My Orders"
        component={OrdListNav}
        options={{
          drawerLabel: 'My Orders',
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'ios-list' : 'ios-list-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Products List"
        component={ProListNav}
        options={{
          drawerLabel: 'Products List',
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'ios-list-circle' : 'ios-list-circle-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
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
          drawerLabel: 'Create Product',
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'ios-add' : 'ios-add-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

    </Drawer.Navigator>
  );
};

export default HomeNav;

const styles = StyleSheet.create({
  drawerWrapper:{
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.bgDark,
    color: colors.white,
  },
  drawerTopWrapper:{
    flex: 11,
  },
  drawerBottomWrapper:{
    flex: 2,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    margin: 10,
  },
  profileSection:{
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    paddingVertical: 5,
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
    textAlign: 'center',
  },
  profilePhone:{
    fontSize: 12,
    color: colors.white,
    textAlign: 'center',
  },
  drawerClose:{
    position: 'absolute',
    top: 0,
    right: 0,
  },
})
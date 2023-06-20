import * as React from 'react';
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
} from 'react-native';


// Import your screens or components
import ProListNav from './ProListNav';
import MyProListNav from './MyProListNav';
import AddProductScreen from '../screens/AddProductScreen';

const Drawer = createDrawerNavigator();

// Custom drawer content component
const CustomDrawerContent = ({ navigation, state, descriptors }) => {
  const closeDrawer = () => {
    navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Text style={styles.profileText}>User Profile</Text>
        {/* Add your profile information here */}
      </View>

      {/* Drawer Items */}
      <DrawerItemList state={state} navigation={navigation} descriptors={descriptors} />

      {/* Close Drawer Button */}
      <DrawerItem label="Close" onPress={closeDrawer} />
    </DrawerContentScrollView>
  );
};

const HomeNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Product List"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Products List"
        component={ProListNav}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Create Product"
        component={AddProductScreen}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="My Products"
        component={MyProListNav}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default HomeNav;

const styles = StyleSheet.create({

})
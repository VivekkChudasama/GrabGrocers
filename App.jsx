import React, {useEffect, useRef} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon, {Icons} from './src/components/Icons';
import * as colors from './src/assets/css/Colors';
import * as Animatable from 'react-native-animatable';

/* Screens */
import Splash from './src/views/Splash';
import Intro from './src/views/Intro';
import Home from './src/views/Home';
import SelectCurrentLocation from './src/views/SelectCurrentLocation';
import CurrentLocation from './src/views/CurrentLocation';
import Search from './src/views/Search';
import Notifications from './src/views/Notifications';
import RestaurantByCategory from './src/views/RestaurantByCategory';
import Menu from './src/views/Menu';
import SearchMenu from './src/views/SearchMenu';
import Cart from './src/views/Cart';
import MyOrders from './src/views/MyOrders';
import FavouriteRestaurant from './src/views/FavouriteRestaurant';
import More from './src/views/More';
import Phone from './src/views/Phone';
import Otp from './src/views/Otp';
import Register from './src/views/Register';
import AboutUs from './src/views/AboutUs';
import PrivacyPolicies from './src/views/PrivacyPolicies';
import FaqCategories from './src/views/FaqCategories';
import FaqDetails from './src/views/FaqDetails';
import Faq from './src/views/Faq';
import AddressList from './src/views/AddressList';
import AddAddress from './src/views/AddAddress';
import Wallet from './src/views/Wallet';
import AdminChat from './src/views/AdminChat';
import Profile from './src/views/Profile';
import PaymentMethods from './src/views/PaymentMethods';
import Success from './src/views/Success';
import OrderOngoing from './src/views/OrderOngoing';
import OrderSummery from './src/views/OrderSummery';
import Ratings from './src/views/Ratings';
import PromoCode from './src/views/PromoCode';
import CreatePassword from './src/views/CreatePassword';
import LocationEnable from './src/views/LocationEnable';
import Password from './src/views/Password';

const forFade = ({current, next}) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0,
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: {opacity},
    rightButtonStyle: {opacity},
    titleStyle: {opacity},
    backgroundStyle: {opacity},
  };
};
const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    type: Icons.Feather,
    icon: 'home',
    component: Home,
    color: colors.theme_fg,
    alphaClr: colors.theme_bg_three,
  },
  {
    route: 'MyOrders',
    label: 'MyOrders',
    type: Icons.Feather,
    icon: 'file-text',
    component: MyOrders,
    color: colors.theme_fg,
    alphaClr: colors.theme_bg_three,
  },
  {
    route: 'FavouriteRestaurant',
    label: 'Favourites',
    type: Icons.Feather,
    icon: 'heart',
    component: FavouriteRestaurant,
    color: colors.theme_fg,
    alphaClr: colors.theme_bg_three,
  },
  {
    route: 'More',
    label: 'More',
    type: Icons.FontAwesome,
    icon: 'user',
    component: More,
    color: colors.theme_fg,
    alphaClr: colors.theme_bg_three,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
      viewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
      textViewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
    } else {
      viewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
      textViewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, {flex: focused ? 1 : 0.65}]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: item.color, borderRadius: 16},
          ]}
        />
        <View
          style={[
            styles.btn,
            {backgroundColor: focused ? null : item.alphaClr},
          ]}>
          <Icon
            type={item.type}
            name={item.icon}
            color={focused ? colors.theme_fg_three : colors.grey}
          />
          <Animatable.View ref={textViewRef}>
            {focused && (
              <Text
                style={{
                  color: colors.theme_fg_three,
                  paddingHorizontal: 8,
                }}>
                {item.label}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
        },
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={({route, navigation}) => ({
          ...TransitionPresets.SlideFromRightIOS,
        })}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectCurrentLocation"
          component={SelectCurrentLocation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CurrentLocation"
          component={CurrentLocation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RestaurantByCategory"
          component={RestaurantByCategory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchMenu"
          component={SearchMenu}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Phone"
          component={Phone}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrivacyPolicies"
          component={PrivacyPolicies}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FaqCategories"
          component={FaqCategories}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FaqDetails"
          component={FaqDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Faq"
          component={Faq}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddressList"
          component={AddressList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminChat"
          component={AdminChat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentMethods"
          component={PaymentMethods}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrderOngoing"
          component={OrderOngoing}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrderSummery"
          component={OrderSummery}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Ratings"
          component={Ratings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PromoCode"
          component={PromoCode}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreatePassword"
          component={CreatePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LocationEnable"
          component={LocationEnable}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Password"
          component={Password}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  },
});

export default App;

import {View,Text} from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';

const Layout = () => {
return (
  <Tabs
  screenOptions={{ tabBarActiveTintColor: Colors.primary,
    tabBarLabelStyle: { fontSize: 14, },
  }}
  >
    <Tabs.Screen 
    name="index" 
    options={{ 
      tabBarLabel: 'Explore',
      tabBarIcon: ({color,size}) =>  <FontAwesome5 name="search" color={Colors.primary} size={size} ></FontAwesome5>
      }} />

  <Tabs.Screen 
      name="wishlists" 
      options={{ 
        tabBarLabel: 'Wishlists',
        tabBarIcon: ({color,size}) =>  <Ionicons name="heart" color={Colors.primary} size={size} ></Ionicons>
        }} />

  <Tabs.Screen 
      name="trips" 
      options={{ 
        tabBarLabel: 'Trips',
        tabBarIcon: ({color,size}) =>  <FontAwesome5 name="airbnb" color={Colors.primary} size={size} ></FontAwesome5>
        }} />

<Tabs.Screen 
      name="inbox" 
      options={{ 
        tabBarLabel: 'Inbox',
        tabBarIcon: ({color,size}) =>  <MaterialCommunityIcons name="message-outline" color={Colors.primary} size={size} ></MaterialCommunityIcons>
        }} />

<Tabs.Screen 
      name="profile" 
      options={{ 
        tabBarLabel: 'Profile',
        tabBarIcon: ({color,size}) =>  <MaterialCommunityIcons name="face-man" color={Colors.primary} size={size} ></MaterialCommunityIcons>
        }} />

  </Tabs>
  )
}

export default Layout;

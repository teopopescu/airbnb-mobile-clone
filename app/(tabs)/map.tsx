import {View, Text, StyleSheet, Button} from'react-native';
import React from 'react';
import { useAuth} from '@clerk/clerk-expo';
import {Link} from 'expo-router';
import ListingsMap from '@/components/ListingsMap';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
const Page = () => {

  return (
<View style={{flex: 1, marginTop: 80}}>        
<ListingsMap listings={listingsDataGeo}></ListingsMap>
    </View>
  )

}
export default Page;

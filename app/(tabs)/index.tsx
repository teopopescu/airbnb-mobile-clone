import {View, Text, StyleSheet} from'react-native';
import React from 'react';
import  {Link,Stack} from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import { useState } from 'react';
import { useMemo } from 'react';
import listingsData from '@/assets/data/listings.json';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ListingsMap from '@/components/ListingsMap';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';
const Page = () => {
  const [category, setCategory] = useState('Tiny homes');
  const items = useMemo( () => listingsData as any, []);
  const onDataChanged = (category: string) => {
    setCategory(category);
    console.log('CHANGED_',category);
  };
  return (
    <View style={{flex: 1, marginTop: 80}}>
      <Stack.Screen options={{
        header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
      }} 
      />
      <Listings listings={items} category={category} />

    </View>
  );
}; 

export default Page;

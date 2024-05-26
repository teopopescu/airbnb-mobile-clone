import {View, Text, StyleSheet} from'react-native';
import React from 'react';
import  {Link,Stack} from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import { useState } from 'react';



const Page = () => {
  const [category, setCategory] = useState('Tiny homes');
  const onDataChanged = (category: string) => {
    setCategory(category);
    console.log('CHANGED_',category);
  };
  return (
    <View style={{flex: 1, marginTop: 200}}>
      <Stack.Screen options={{
        header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
      }} 
      />
      <Listings listings={[]} category={category} />
    </View>
  );
}; 

export default Page;

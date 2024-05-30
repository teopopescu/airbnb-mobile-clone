import {View,Text} from 'react-native';
import React from'react';
import {Link} from 'expo-router';
import ListingsMap from '@/components/ListingsMap';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';

const Page = () => {

    return (
        <View>
         <ListingsMap listings={listingsDataGeo}></ListingsMap>
        </View>
    )

}

export default Page;





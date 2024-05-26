import {View,Text} from 'react-native';
import React from'react';
import {Link, useLocalSearchParams} from 'expo-router';

const Page = () => {
    const {id} = useLocalSearchParams<{id: string}>();
    return (
        <View>
         <Text>Booking</Text>
        </View>
    )

}

export default Page;

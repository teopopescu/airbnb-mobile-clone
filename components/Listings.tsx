import { View, Text, ListRenderItem } from 'react-native'
import React, { useEffect } from 'react'
import { FlatList } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import { useState } from 'react';
import { useRef } from 'react';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { Listing } from '@/interfaces/Listing';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
interface Props {
    listings: any[];
    category: string;
}


const Listings = ({ listings : items, category }: Props ) =>{
    const [loading, setLoading] = useState(false);
    const listRef= useRef<FlatList>(null);
    useEffect(() => {
        console.log('RELOAD LISTNINGS', items.length)
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }, [category])

const renderRow: ListRenderItem<Listing> = ({item}) => (
          <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
              <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
                <Image source={{uri: item.medium_url}} style={styles.image}/>
                <TouchableOpacity style={{position: 'absolute', right: 30, top: 30}}>
                  <Ionicons name="heart-outline" size={24} color={'#000'}></Ionicons>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
                  <View style={{flexDirection: 'row', gap: 4}}>
                    <Ionicons name="star" size={16}/>
                    <Text style={{fontFamily: 'mon-sb',fontSize: 16}}>{item.review_scores_rating / 20}</Text>
                  </View>
                </View>

                  <Text style={{fontFamily: 'mon-sb',fontSize: 16}}>{item.room_type}</Text>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontFamily: 'mon-sb',fontSize: 16}}> € {item.price} / </Text>
                    <Text style={{fontFamily: 'mon',fontSize: 16}}>night </Text>

                  </View>

              </Animated.View>
              </TouchableOpacity>
          </Link>
        )
  
    return (
    <View style={defaultStyles.container}>
      <FlatList renderItem={renderRow} ref={listRef} data={items}/>

    </View>
  )
}

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 16,
    marginTop: 4,
  },
});

export default Listings;

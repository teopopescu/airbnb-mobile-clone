import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { useRef } from 'react';
import *  as Haptics from 'expo-haptics';
import { useState } from 'react';
const categories = [
    {
      name: 'Tiny homes',
      icon: 'home',
    },
    {
      name: 'Cabins',
      icon: 'house-siding',
    },
    {
      name: 'Trending',
      icon: 'local-fire-department',
    },
    {
      name: 'Play',
      icon: 'videogame-asset',
    },
    {
      name: 'City',
      icon: 'apartment',
    },
    {
      name: 'Beachfront',
      icon: 'beach-access',
    },
    {
      name: 'Countryside',
      icon: 'nature-people',
    },
  ];

interface Props {
    onCategoryChanged: (category: string) => void
}

const ExploreHeader = ({onCategoryChanged }: Props) => {
    const scrollRef=useRef<ScrollView>(null);
    const itemsRef= useRef<Array<TouchableOpacity | null>>([]);
    const [activeIndex,setActiveIndex]= useState(3);

    const selectCategory = (index:number) => {
        const selected = itemsRef.current[index];
        selected?.measure((x) => {
            scrollRef.current?.scrollTo({x: x - 16, y: 0, animated: true})
        })
        setActiveIndex(index);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onCategoryChanged(categories[index].name);
    }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}> 
      <View style={styles.container}>
        <View style={styles.actionRow}>
            <Link href={'/(modals)/booking'} asChild>
                <TouchableOpacity style={styles.searchBtn}>
                    <Ionicons name='search' size={24}/>
                    <View>
                        <Text>Where to?</Text>
                        <Text>Anywhere · Any week · Add guests</Text>
                    </View>
                </TouchableOpacity>
        </Link> 
        <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name ='options-outline' size={24}/>

        </TouchableOpacity>
        </View>
        <ScrollView horizontal
            ref={scrollRef}
            showsHorizontalScrollIndicator
            contentContainerStyle={{
                alignItems: 'center',
                gap: 20,
                paddingHorizontal: 16,
            }}>
            { categories.map((item, index) => (
            <TouchableOpacity onPress={() => selectCategory(index)} key={index}
            ref={(el) => itemsRef.current[index]=el}
            style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}> 
                <MaterialIcons name={item.icon as any}  size={24} color={activeIndex === index ? '#000' : Colors.grey} />
                <Text>{item.name}</Text>

            </TouchableOpacity>
            ))}
        </ScrollView>

    </View>
    </SafeAreaView>
  )
}

const styles= StyleSheet.create({
    container: {
      height: 130,
      backgroundColor: '#fff',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    actionRow : {
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingHorizontal: 24,
        paddingBottom: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#A2A0A2',
        borderRadius: 24,

    },
    title: {
      fontSize: 24,
      color: Colors.primary,
    },
    subtitle: {
      fontSize: 16,
      color: Colors.primary,
    },
    button: {
      marginTop: 10,
      padding: 10,
      backgroundColor: Colors.primary,
      borderColor: Colors.primary,
      borderWidth: 10,
},
    searchBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderColor: '#c2c2c2',
        padding: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 30,
        backgroundColor: '#fff',
        width: 280,
        elevation: 2, 
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
          width: 0,
          height: 8,
        }
    },
    categoryText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
        color: Colors.grey
    },
    categoryTextActive: {
        color: '#000',
        fontSize: 14,
        fontFamily: 'mon-sb',
    },
    categoriesBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8
    },
    categoriesBtnActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingBottom: 8
    }
})
export default ExploreHeader;

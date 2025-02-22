import {View,Text, Image} from 'react-native';
import React from'react';
import {BlurView} from 'expo-blur';
import { StyleSheet } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { places } from '@/assets/data/places';
import DatePicker from 'react-native-modern-datepicker';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const today = new Date().toISOString().substring(0, 10);
const guestsGropus = [
    {
      name: 'Adults',
      text: 'Ages 13 or above',
      count: 0,
    },
    {
      name: 'Children',
      text: 'Ages 2-12',
      count: 0,
    },
    {
      name: 'Infants',
      text: 'Under 2',
      count: 0,
    },
    {
      name: 'Pets',
      text: 'Pets allowed',
      count: 0,
    },
  ];

const Page = () => {
    const router= useRouter();
    const [openCard, setOpenCard] = useState(0);
    const [selectedPlace, setSelectedPlace] = useState(0);
    const [groups, setGroups] = useState(guestsGropus);
    const onClearAll = () => {
        setSelectedPlace(0);
        setOpenCard(0);
      };

    return (
        <BlurView intensity={70} style={styles.container} tint="light">
        
        {/* Where */}
        <View style={styles.card}>
            {openCard!=0 && (
                <AnimatedTouchableOpacity onPress={() => setOpenCard(0)} style={styles.cardPreview} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
                    <Text style={styles.previewText}>Where </Text>
                    <Text style={styles.previewdData}>I'm flexible </Text>

                </AnimatedTouchableOpacity>
            )}
            { openCard === 0 && (<> 
                <Animated.Text style={styles.cardHeader} entering={FadeIn}>
                    Where to?
                </Animated.Text>
                <Animated.View style={styles.cardBody}>
                    <View style={styles.searchSection}>
                        <Ionicons style={styles.searchIcon} name="search" size={20}></Ionicons>
                        <TextInput style={styles.inputField} placeholder='Search destination' placeholderTextColor={Colors.grey}></TextInput>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap: 25}}>
                        {places.map((item,index) => (
                            <TouchableOpacity onPress={()=> setSelectedPlace(index)}>
                                <Image source={item.img} style={selectedPlace === index ? styles.placeSelected: styles.place}></Image>
                                <Text style={{fontFamily: 'mon', paddingTop: 6}}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                </Animated.View>
                </>
            ) }
            </View>

            {/* When */}

            <View style={styles.card}>
            {openCard!=1 && (
                <AnimatedTouchableOpacity onPress={() => setOpenCard(1)} style={styles.cardPreview} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
                    <Text style={styles.previewText}>When </Text>
                    <Text style={styles.previewdData}>Any week </Text>

                </AnimatedTouchableOpacity>
            )}
            { openCard === 1 && (
                <Animated.View>
                <Text style={styles.cardHeader}>When is your trip?</Text>
                <DatePicker
              options={{
                defaultFont: 'mon',
                headerFont: 'mon-sb',
                mainColor: Colors.primary,
                borderColor: 'transparent',
              }}
              current={today}
              selected={today}
              mode={'calendar'}
            />
                </Animated.View>
            ) }
            </View>
            
            {/* Who */}

            <View style={styles.card}>
            {openCard!=2 && (
                <AnimatedTouchableOpacity onPress={() => setOpenCard(2)} style={styles.cardPreview} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)} >
                    <Text style={styles.previewText}>Who's coming? </Text>
                    <Text style={styles.previewdData}>Add guests </Text>

                </AnimatedTouchableOpacity>
            )}
            { openCard === 2 && (
                <Animated.View>
                <Text style={styles.cardHeader}>Who's coming?</Text>
                <Animated.View style={styles.cardBody}>
            {groups.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.guestItem,
                  index + 1 < guestsGropus.length ? styles.itemBorder : null,
                ]}>
                <View>
                  <Text style={{ fontFamily: 'mon-sb', fontSize: 14 }}>{item.name}</Text>
                  <Text style={{ fontFamily: 'mon', fontSize: 14, color: Colors.grey }}>
                    {item.text}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      const newGroups = [...groups];
                      newGroups[index].count =
                        newGroups[index].count > 0 ? newGroups[index].count - 1 : 0;

                      setGroups(newGroups);
                    }}>
                    <Ionicons
                      name="remove-circle-outline"
                      size={26}
                      color={groups[index].count > 0 ? Colors.grey : '#cdcdcd'}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: 'mon',
                      fontSize: 16,
                      minWidth: 18,
                      textAlign: 'center',
                    }}>
                    {item.count}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      const newGroups = [...groups];
                      newGroups[index].count++;
                      setGroups(newGroups);
                    }}>
                    <Ionicons name="add-circle-outline" size={26} color={Colors.grey} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </Animated.View>
                </Animated.View>
            ) }
            </View>




         {/* Footer */}
         <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>

            <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
            <TouchableOpacity onPress={onClearAll} style={{justifyContent: 'center'}}>
                <Text style={{fontSize: 18, fontFamily: 'mon-sb',textDecorationLine:'underline'}}>
                    Clear all
                </Text>
                </TouchableOpacity>



                <TouchableOpacity onPress={() => router.back} style={[defaultStyles.btn, {paddingRight: 20, paddingLeft: 50}]}>
                    <Ionicons name="search-outline" size={24} color="#fff" style={defaultStyles.btnIcon} />
                    <Text style={defaultStyles.btnText}>Search</Text>
                </TouchableOpacity>
                </View>
         </Animated.View>
        </BlurView>
    )

}

export default Page;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 100,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 14,
      margin: 10,
      elevation: 4,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 4,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      gap: 20,
    },
    cardHeader: {
      fontFamily: 'mon-b',
      fontSize: 24,
      padding: 20,
    },
    cardBody: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    cardPreview: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
    },
  
    searchSection: {
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ABABAB',
      borderRadius: 8,
      marginBottom: 16,
    },
    searchIcon: {
      padding: 10,
    },
    inputField: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
    },
    placesContainer: {
      flexDirection: 'row',
      gap: 25,
    },
    place: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
    placeSelected: {
      borderColor: Colors.grey,
      borderWidth: 2,
      borderRadius: 10,
      width: 100,
      height: 100,
    },
    previewText: {
      fontFamily: 'mon-sb',
      fontSize: 14,
      color: Colors.grey,
    },
    previewdData: {
      fontFamily: 'mon-sb',
      fontSize: 14,
      color: Colors.dark,
    },
  
    guestItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
    },
    itemBorder: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: Colors.grey,
    },
  });

import {View,Text, TextInput, TouchableOpacity} from 'react-native';
import React from'react';
import {Link} from 'expo-router';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { StyleSheet } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
enum Strategy {
    Google ='oauth_google',
    Apple= 'oauth_apple',
    Facebook = 'oauth_facebook'
}

const Page = () => {
    useWarmUpBrowser();
    const router= useRouter();
    const {startOAuthFlow:googleAuth } = useOAuth({strategy: 'oauth_google'})
    const {startOAuthFlow: appleAuth} = useOAuth({strategy: 'oauth_apple'})
    const {startOAuthFlow: facebookAuth} = useOAuth({strategy: 'oauth_facebook'})

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Facebook]: facebookAuth
        }[strategy];

        try {
            const {createdSessionId, setActive} = await selectedAuth();
            if (createdSessionId) {
                setActive!({session: createdSessionId});
                router.back();
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.container}>
            <TextInput autoCapitalize='none' 
            placeholder='Email' 
            style={[defaultStyles.inputField, {marginBottom:30}]} />
            
            <TouchableOpacity style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>Continue</Text>
                </TouchableOpacity>

<View style={styles.separatorView}>
    <View style={{flex: 1,borderBottomColor: '#000',borderBottomWidth: StyleSheet.hairlineWidth}}/>
    <Text style={styles.separator}>OR</Text>
    <View style={{flex:1, borderBottomColor: '#000',borderBottomWidth: StyleSheet.hairlineWidth}}/>

    </View>
    <View style={{gap: 20}}>
    <View>
            <TouchableOpacity style={styles.btnOutline}>
                <Ionicons name='call-outline' size={24} style={defaultStyles.btnIcon}> </Ionicons>
                <Text style={styles.btnOutlineText}>Continue with Phone</Text>
            </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity style={styles.btnOutline}>
                <Ionicons name="logo-apple" size={24} style={defaultStyles.btnIcon} onPress={() => onSelectAuth(Strategy.Apple)}> </Ionicons>
                <Text style={styles.btnOutlineText}>Continue with Apple</Text>
            </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity style={styles.btnOutline}>
                <Ionicons name='logo-google' size={24} style={defaultStyles.btnIcon}  onPress={() => onSelectAuth(Strategy.Google)}> </Ionicons>
                <Text style={styles.btnOutlineText}>Continue with Google</Text>
            </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity style={styles.btnOutline}>
                <Ionicons name='logo-facebook' size={24} style={defaultStyles.btnIcon}  onPress={() => onSelectAuth(Strategy.Facebook)}> </Ionicons>
                <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
            </TouchableOpacity>
        </View>

        </View>
        </View>
    )
    

}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26
    },
    separatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30
    },
    separator: {
        fontFamily: 'SpaceMono',
        color: Colors.grey
    },
    btnOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'SpaceMono',
    }
})
export default Page;

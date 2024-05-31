import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import ModalHeaderText from '@/components/ModalHeaderText';
import Colors from '@/constants/Colors';
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
// const CLERK_PUBLISHABLE_KEY ='pk_test_c3RlcmxpbmctcmluZ3RhaWwtMzEuY2xlcmsuYWNjb3VudHMuZGV2JA';
const tokenCache = {
 async getToken(key:string) {
  try {
    return SecureStore.getItemAsync(key)
  } catch(err) {
    return null;
  }
 },
 async saveToken(key:string, value:string) {
  try {
    return SecureStore.setItemAsync(key, value)
  } catch(err) {
    console.log(err)
    return ;
  }
 }

};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
  <RootLayoutNav />
  </ClerkProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const {isLoaded, isSignedIn} = useAuth();

  useEffect(() => {
    if(isLoaded &&!isSignedIn) {
      router.push('/(modals)/login')
    }
  }, [isLoaded])

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(modals)/login" options={{ 
          title: 'Log in or sign up', 
          headerTitleStyle: {fontFamily: 'mon-sb'},
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='close-outline' size={30}  />
            </TouchableOpacity>

          ), 
          presentation: 'modal' }} />

<Stack.Screen name="listing/[id]" options={{ headerTitle: '', headerTransparent: true }} />
<Stack.Screen name="(modals)/booking" options={{ 
  presentation: 'transparentModal',
  headerTransparent: true,
  headerTitle: () => <ModalHeaderText/>,
  animation: 'fade',
  headerLeft: () => (
    <TouchableOpacity onPress={() => router.back()} style={{backgroundColor: '#fff', borderColor: Colors.grey, borderRadius: 20, borderWidth: 1, padding: 4}}>
      <Ionicons name='close-outline' size={30}  />
    </TouchableOpacity>

  ), 
 }} />
      </Stack>
    </ThemeProvider>
  );
}

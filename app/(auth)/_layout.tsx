import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';


const Layout=() =>{
 


  return (
 
      <Stack>
        <Stack.Screen name="Welcome" options={{ headerShown: false }} />
        {/* <Stack.Screen name="Sign-up" options={{ headerShown: false }} /> */}
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
   
      </Stack>

  );
}
export default Layout;

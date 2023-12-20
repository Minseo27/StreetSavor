import { Stack } from 'expo-router';
import { useCallback, } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'

// While app is loading makes native splash screen visible
SplashScreen.preventAutoHideAsync()


//Ensuring that fonts are loaded
const Layout = () => {

    const [fontsLoaded] = useFonts({
        DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),

    })
    // Loading Fonts
    const onLayoutRootView = useCallback(async () => {
        if(fontsLoaded){
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    if(!fontsLoaded) return null;
    
    return <Stack onLayout = {onLayoutRootView} screenOptions={{headerShown: false}}/>;
}



export default Layout;

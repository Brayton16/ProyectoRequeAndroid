import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useCallback } from 'react'

const Layout = () => {
    const [fontsLoaded] = useFonts({
        SpaceGrotesk: require('../assets/fonts/SpaceGrotesk-Regular.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if(fontsLoaded){
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded])
    
    if(!fontsLoaded) return null;

    return (
        <Stack onLayout={onLayoutRootView} screenOptions={{headerShown: false}}/>
    ); 
}

export default Layout
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { SignIn} from '../screens/SignIn';
import { AppRoutes } from './app.routes';
import { useState, useEffect } from 'react';
import { Loading } from '../components/Loading';

export function Routes(){
    const [loading,setIsLoading] = useState(true);
    const [user,SetUser] = useState<FirebaseAuthTypes.User>();
    useEffect(()=> {
        const subscriber = auth()
        .onAuthStateChanged(response => {
            SetUser(response);
            setIsLoading(false);
        });
        return subscriber;
    },[]);    
    if(loading){
        return <Loading/>
    }    
    return(
        <NavigationContainer>
            {user ? <AppRoutes/> : <SignIn/>}
        </NavigationContainer>
    )
}
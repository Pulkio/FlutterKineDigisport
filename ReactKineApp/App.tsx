import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react'
import { useEffect } from 'react';
import {User, onAuthStateChanged} from 'firebase/auth'
import Login from './app/screens/Login';
import List from './app/screens/List';
import Details from './app/screens/Details';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

//A mettre dans un fichier separé
function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="My todos" component={List} />
      <InsideStack.Screen name="details" component={Details} />
    </InsideStack.Navigator>
  )
}


export default function App() {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name='Inside' component={InsideLayout} options={{headerShown: false}}/>
        ) : (
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}



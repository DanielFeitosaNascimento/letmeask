import { createContext, useEffect, useState, ReactNode } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
  id: string
  name: string
  avatar: string
  email: string | null
}

type AuthContextType = {
  user: User | undefined
  signInWithPopupGoogle: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextType);


export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unSubscription = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
          email: email,
        })
      }
    })

    return () => {
      unSubscription()
    }
  }, [])

  const signInWithPopupGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

      const result = await auth.signInWithPopup(provider)
    
      if (result.user) {
        const { displayName, email, photoURL, uid } = result.user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
          email: email,
        })

      }
  }


  return (
    <AuthContext.Provider value={{ user, signInWithPopupGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
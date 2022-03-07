import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAuth() {
    const [user, setUser] = useState<User | null>(getAuth().currentUser);
    
    useEffect(() => {
        let unsubscribe = onAuthStateChanged(getAuth(), setUser);
        return () => {
            unsubscribe();
        }
    }, [])

    return user;
}
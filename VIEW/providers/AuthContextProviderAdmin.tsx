import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

import { setCookie } from "cookies-next";
import { authValidation } from '../../BD/firebase';
import { toast } from 'react-toastify';

// User data type interface
interface UserType {
    email: string | null;
    uid: string | null;
}

// Create auth context
const AuthContext = createContext({});

// Make auth context available across the app by exporting it
export const useAuth = () => useContext<any>(AuthContext);

// Create the auth context provider
export const AuthContextProviderAdmin = ({
    children
}: {
    children: React.ReactNode;
}) => {
    // Define the constants for the user and loading state
    const [user, setUser] = useState<UserType>({ email: null, uid: null });
    const [loading, setLoading] = useState<Boolean>(true);
    const [token , setToken] = useState<string>(""); // [token, setToken
    const [isAdmin, setIsAdmin] = useState<boolean>(false); // [isAdmin, setIsAdmin

    // Update the state depending on auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authValidation, (user) => {
            if (user) {
                setUser({
                    email: user.email,
                    uid: user.uid
                });
                user.getIdToken().then((token) => {
                    setToken(token);
                    setCookie("auth-token", token);
                });
                if (user.uid === process.env.NEXT_PUBLIC_ADMIN_UID) {
                    setIsAdmin(true);
                } 
            } else {
                setUser({ email: null, uid: null });
            }
        });

        setLoading(false);

        return () => unsubscribe();
    }, []);

    // Login the user
    const logIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(authValidation, email, password);
    };

    // Logout the user
    const logOut = async () => {
        setUser({ email: null, uid: null });
        return await signOut(authValidation);
    };

    const verifyAdminAccount = async (email: string, password: string): Promise<boolean> => {
        var success: boolean = false;
        if (!email || !password) {
            console.error("Email or password is empty");
            return false;
        }

        if (email !== process.env.NEXT_ADMIN_ACCOUNT_ || password !== process.env.NEXT_ADMIN_ACCOUNT__) {
            console.error("Acceso denegado");
            toast.error("Acceso denegado");
            console.log(process.env.NEXT_ADMIN_ACCOUNT_);
            return false;
        }
        try {
            await signInWithEmailAndPassword(authValidation, email, password)
            // Signed in
            success = true;
        } catch (error) {
            // An error occurred during authentication
            console.error("Authentication error:", error);
            return false;
        }
        console.log(success);
        return success;
    };

    // Wrap the children with the context provider
    return (
        <AuthContext.Provider value={{ user, logIn, logOut, token, isAdmin, verifyAdminAccount}}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
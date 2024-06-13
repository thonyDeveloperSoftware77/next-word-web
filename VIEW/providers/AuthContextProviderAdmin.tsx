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
    role: 'admin' | 'teacher' | 'student' | null;
    
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
    const [user, setUser] = useState<UserType>({ email: null, uid: null, role: null});
    const [loading, setLoading] = useState<Boolean>(true);
    const [token , setToken] = useState<string>(""); // [token, setToken


    // Update the state depending on auth
    useEffect(() => {
        const checkTokenValidity = async () => {
            try {
                const user = authValidation.currentUser;
                if (user) {
                    const idTokenResult = await user.getIdTokenResult();
                    const role = idTokenResult.claims.role as 'admin' | 'teacher' | 'student' | null; // Type assertion
                    setUser({
                        email: user.email,
                        uid: user.uid,
                        role: role
                    });
                    const token = await user.getIdToken();
                    setToken(token);
                    setCookie("auth-token", token, {
                        sameSite: "none",
                    });
                    console.log(token);
                } else {
                    setUser({ email: null, uid: null, role: null });
                }
            } catch (error) {
                console.error("Error fetching token or user role:", error);
                setUser({ email: null, uid: null, role: null });
            }
            setLoading(false);
        };
    
        const unsubscribe = onAuthStateChanged(authValidation, async (user) => {
            setLoading(true);
            await checkTokenValidity();
        });
    
        // Verificar la validez del token periódicamente (cada 5 minutos en este ejemplo)
        const tokenValidityInterval = setInterval(() => {
            checkTokenValidity();
        }, 5 * 60 * 1000); // 5 minutos en milisegundos
    
        return () => {
            unsubscribe();
            clearInterval(tokenValidityInterval);
        };
    }, []);
    


    const getTokenRefreshed = async () => {
        const user = authValidation.currentUser;
        if (user) {
            const idTokenResult = await user.getIdTokenResult();
            return idTokenResult.token;
        } else {
            return null
        }
    }

    // Login the user
    const logIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(authValidation, email, password);
    };

    // Logout the user
    const logOut = async () => {
        setUser({ email: null, uid: null, role: null});
        return await signOut(authValidation);
    };

    const verifyUserAccount = async (email: string, password: string): Promise<'admin' | 'teacher' | 'student' | null> => {
        if (!email || !password) {
            console.error("Email or password is empty");
            toast.error("Email or password is empty");
            return null;
        }
    
        if (email === process.env.NEXT_ADMIN_ACCOUNT_ && password === process.env.NEXT_ADMIN_ACCOUNT__) {
            try {
                const userCredential = await signInWithEmailAndPassword(authValidation, email, password);
                const user = userCredential.user;
                await user.getIdToken(); // Asegúrate de obtener el token para mantener la consistencia
                toast.success("Admin access granted");
                return 'admin';
            } catch (error) {
                console.error("Authentication error:", error);
                toast.error("Acceso denegado");
                return null;
            }
        }
    
        try {
            const userCredential = await signInWithEmailAndPassword(authValidation, email, password);
            const user = userCredential.user;
            const idTokenResult = await user.getIdTokenResult();
            const role = idTokenResult.claims.role as 'admin' | 'teacher' | 'student' | null;
    
            if (!role) {
                console.error("No role assigned to the user");
                toast.error("No role assigned to the user");
            }

            setToken(idTokenResult.token);
    
            return role;
        } catch (error) {
            console.error("Authentication error:", error);
            toast.error("Acceso denegado");
            return null;
        }
    };
    

    // Wrap the children with the context provider
    return (
        <AuthContext.Provider value={{ user, logIn, logOut, token, verifyUserAccount}}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
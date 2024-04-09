import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import { authValidation } from "../BD/firebase";
import { toast } from "react-toastify";
import { getCookie, setCookie } from "cookies-next";
export default async function verifyAdminAccount(email: string, password: string): Promise<boolean> {
    var success: boolean = false;
    if (!email || !password) {
        console.error("Email or password is empty");
        return false;
    }

    if (email !== process.env.NEXT_ADMIN_ACCOUNT_ || password !== process.env.NEXT_ADMIN_ACCOUNT__) {
        console.error("Acceso denegado");
        console.log(process.env.NEXT_ADMIN_ACCOUNT_);
        toast.error("Acceso denegado");
        return false;
    }
    try {
        const userCredential = await signInWithEmailAndPassword(authValidation, email, password)
        // Signed in
        console.log("Authentication successful");
        const idToken = await getIdToken(userCredential.user);
        setCookie("auth-token", idToken);
        // Verifica que la cookie se haya guardado correctamente
        const savedToken = getCookie("auth-token");
        if (savedToken === idToken) {
            console.log("Token saved successfully");
            success = true;
        } else {
            console.error("Error saving token");
        }
    } catch (error) {
        // An error occurred during authentication
        console.error("Authentication error:", error);
        return false;
    }
    console.log(success);
    return success;
}

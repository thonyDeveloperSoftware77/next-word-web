import { signInWithEmailAndPassword } from "firebase/auth";
import { authValidation } from "../BD/firebase";
import { toast } from "react-toastify";

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
        await signInWithEmailAndPassword(authValidation, email, password);
        // Signed in
        console.log("Authentication successful");
        success = true;
    } catch (error) {
        // An error occurred during authentication
        console.error("Authentication error:", error);
        return false;
    }
    console.log(success);
    return success;
}

interface UserType {
    uid: string | null;
    role: 'admin' | 'teacher' | 'student' | null;
}

export async function verifyToken(token: string): Promise<UserType | undefined> {
    try {
        const response = await fetch(`http://localhost:3001/verify/${token}`);
        
        const result = await response.json();
        console.log('result', result);
        return result;
    } catch (error) {
        console.error(error);
    }

    return undefined;
}
export async function verifyTokenAdmin(token: string): Promise<string | undefined> {
    try {
        const response = await fetch(` https://next-word-backend-1.onrender.com/verify/${token}`);
        
        const result = await response.text();
        console.log('result', result);
        return result;
    } catch (error) {
        console.error(error);
    }

    return undefined;
}
export async function verifyTokenAdmin(token: string): Promise<string | undefined> {
    try {
        const response = await fetch(`https://08e5-179-49-52-137.ngrok-free.app/verify/${token}`);
        
        const result = await response.text();
        console.log('result', result);
        return result;
    } catch (error) {
        console.error(error);
    }

    return undefined;
}
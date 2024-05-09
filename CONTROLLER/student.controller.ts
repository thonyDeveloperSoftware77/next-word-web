import { StudentInput } from "../MODEL/Student";

export async function createStudent(  student: StudentInput) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(student);

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };

    try {
        const response = await fetch(" https://next-word-backend-1.onrender.com/student", requestOptions);
        
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}
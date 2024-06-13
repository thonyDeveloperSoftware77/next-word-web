import { getCookie } from "cookies-next";
import { StudentInput, StudentOutput } from "../MODEL/Student";
import { toast } from "react-toastify";

export async function getStudent(uid: string): Promise<StudentOutput | undefined> {
    const tokenCookie = await getCookie('auth-token')
    const token = String(tokenCookie)
    try {
        const response = await fetch(`http://localhost:3001/student/findOne`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Aquí es donde incluyes el token de Firebase
                'Content-Type': 'application/json'
            },
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }

    return undefined;
}


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
        const response = await fetch("http://localhost:3001/student", requestOptions);
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

export async function inscripcionStudent(token: string, id: number) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`); // Añade el token aquí

    const raw = JSON.stringify({ 
        course_id: id
     });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };

    try {
        const response = await fetch(`http://localhost:3001/student/course`, requestOptions);
        const result = await response.json();
        console.log(result);
        if (result.course_id === id) {
            toast.success("Inscripción exitosa");
        }else{
            toast.error(`No se pudo inscribir al curso ${result.message.message}`);
        }
        return result;
    } catch (error) {
        toast.error("No se pudo inscribir al curso");
        console.error(error);
    }
    return undefined;
}

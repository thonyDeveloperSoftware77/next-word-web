import Teacher from "../MODEL/Teacher";

import { getCookie } from "cookies-next";

export async function getTeachers(token: string): Promise<Teacher[]> {
    try {
        const response = await fetch("http://localhost:3001/teacher",{
            headers: {
              'Authorization': `Bearer ${token}`, // Aquí es donde incluyes el token de Firebase
            },
        })
        const result = await response.json();
        //transformar el resultado a un array de objetos con map y retornar el resultado
        return result.map((teacher: Teacher) => {
            return {
                uid: teacher.uid,
                name: teacher.name,
                email: teacher.email,
                state: teacher.state
            };
        });
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getTeacher(uid: string): Promise<Teacher | undefined> {
    const tokenCookie = await getCookie('auth-token')
    const token = String(tokenCookie)
    try {
        const response = await fetch(`http://localhost:3001/teacher/${uid}`,{
            headers: {
              'Authorization': `Bearer ${token}`, // Aquí es donde incluyes el token de Firebase
            },
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }

    return undefined;
}

export async function createTeacher(token:string,  teacher: Teacher) {
    console.log('token', token)
    console.log('teacher', teacher) 
    const myHeaders = new Headers();
    teacher.state = true;
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`); // Añade el token aquí

    const raw = JSON.stringify(teacher);

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };

    try {
        const response = await fetch("http://localhost:3001/teacher", requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

export async function updateTeacher(token:string,  uid: string, name: string, state: boolean) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`); // Añade el token aquí

    const raw = JSON.stringify({ name, state });

    const requestOptions: RequestInit = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };

    try {
        const response = await fetch(`http://localhost:3001/teacher/${uid}`, requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }

    return undefined;
}

export async function deleteTeacher(token:string,  uid: string) {
    const requestOptions: RequestInit = {
        method: "DELETE",
        redirect: "follow" as RequestRedirect,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
            
    };

    try {
        const response = await fetch(`http://localhost:3001/teacher/${uid}`, requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}



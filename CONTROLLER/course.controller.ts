import {Course} from "../MODEL/Course";

export async function getCourseByTeacher(token: string, uid: string): Promise<Course[]> {
    try {
        const response = await fetch(`http://localhost:3001/course/teacher/${uid}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Aquí es donde incluyes el token de Firebase
            },
        })
        const result = await response.json();
        //transformar el resultado a un array de objetos con map y retornar el resultado
        console.log(result)
        return result
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function createCourse(token: string, course: Course) {
    console.log('token', token)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`); // Añade el token aquí

   
    const raw = JSON.stringify(course);

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };

    try {
        const response = await fetch("http://localhost:3001/course", requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
    return undefined;
}

export async function updateCourse(token: string, id: number, name: string, code: string) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`); // Añade el token aquí

    const raw = JSON.stringify({name, code});

    const requestOptions: RequestInit = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };

    try {
        const response = await fetch(`http://localhost:3001/course/${id}`, requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
    return undefined;
}

export async function deleteCourse(token: string, id: number) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`); // Añade el token aquí

    const requestOptions: RequestInit = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect
    };

    try {
        const response = await fetch(`http://localhost:3001/course/${id}`, requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
    return undefined;
}
import { Course, CourseStudent } from "../MODEL/Course";

export async function getCourseByTeacher(token: string, uid: string): Promise<Course[]> {

    try {
        const response = await fetch(`http://localhost:3001/course/teacher/${uid}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`, // Aquí es donde incluyes el token de Firebase
                'Content-Type': 'application/json'
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



export async function getCourses(token: string): Promise<Course[]> {
console.log("token")
    console.log(token)

    try {
        const response = await fetch(`http://localhost:3001/course`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`, // Aquí es donde incluyes el token de Firebase
                'Content-Type': 'application/json'
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
//http://localhost:3001/course/student/13
export async function getCourseByStudent(token: string, course_id: string): Promise<CourseStudent[]> {
    console.log(course_id)
    try {
        const response = await fetch(`http://localhost:3001/course/student/${course_id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`, // Aquí es donde incluyes el token de Firebase
                'Content-Type': 'application/json'
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

    const raw = JSON.stringify({ name, code });

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



export async function changeStatusStudent(token: string, id: number, status: number) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`); // Añade el token aquí

    const raw = JSON.stringify({ status });

    const requestOptions: RequestInit = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };

    try {
        const response = await fetch(`http://localhost:3001/course/student/status/${id}`, requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
    return undefined;
}



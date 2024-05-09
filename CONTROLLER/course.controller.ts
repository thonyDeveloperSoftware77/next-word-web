import { Course, CourseStudent } from "../MODEL/Course";

export async function getCourseByTeacher(token: string, uid: string): Promise<Course[]> {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImUyYjIyZmQ0N2VkZTY4MmY2OGZhY2NmZTdjNGNmNWIxMWIxMmI1NGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmV4dC13b3JkLTQ0YTkwIiwiYXVkIjoibmV4dC13b3JkLTQ0YTkwIiwiYXV0aF90aW1lIjoxNzE1MjkxMTQyLCJ1c2VyX2lkIjoiOVlobGdFQW94alJGVGk1ZEZ0SFhGaGNiSm1GMyIsInN1YiI6IjlZaGxnRUFveGpSRlRpNWRGdEhYRmhjYkptRjMiLCJpYXQiOjE3MTUyOTExNDIsImV4cCI6MTcxNTI5NDc0MiwiZW1haWwiOiJqb3NlcF9ib2xhbmlvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJqb3NlcF9ib2xhbmlvQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.a8vRE1IUItu4FxMFiPHYkHGUvaV0DUK2_2YFpb4XrGlNdlF-wWRJ7mly03hHbkybjzbp_9P7Sh_loht6x0DNnQSmlm1SrPdkScLJx0YO29HusHLI29o-MkHeOW9PYGcNTbbjb2DNK-fCymtuHHr0vs2CbrcRmzJRuelBGKnNoGRwvqWw3lMXjPs8mRRJ95oSHMCMsW-b6cUCWm5CKAZB23hY2S7pJw8QCpXD7nl9svFTas6pc_c1Sb4lhNqELfcrIz5yNFKKGUoVOMhODHd_CYaPXn81mgJvuw5B0l_vId3Y25GgbwhkPXVVYIgpoKpP1QvMW1Qvr5TJlYOU_p-t7g");

  
    const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("https://next-word-backend-1.onrender.com/course/teacher/9YhlgEAoxjRFTi5dFtHXFhcbJmF3", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

    try {
        const response = await fetch(` https://next-word-backend-1.onrender.com/course/teacher/${uid}`, {
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

// https://next-word-backend-1.onrender.com/course/student/13
export async function getCourseByStudent(token: string, course_id: string): Promise<CourseStudent[]> {
    console.log(course_id)
    try {
        const response = await fetch(` https://next-word-backend-1.onrender.com/course/student/${course_id}`, {
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
        const response = await fetch(" https://next-word-backend-1.onrender.com/course", requestOptions);
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
        const response = await fetch(` https://next-word-backend-1.onrender.com/course/${id}`, requestOptions);
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
        const response = await fetch(` https://next-word-backend-1.onrender.com/course/student/status/${id}`, requestOptions);
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
        const response = await fetch(` https://next-word-backend-1.onrender.com/course/${id}`, requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
    return undefined;
}
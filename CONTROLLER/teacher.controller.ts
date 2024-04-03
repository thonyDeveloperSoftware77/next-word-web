import Teacher from "../MODEL/Teacher";


export async function getTeachers(): Promise<Teacher[]> {
    try {
        const response = await fetch("http://localhost:3001/teacher");
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
    try {
        const response = await fetch(`http://localhost:3001/teacher/${uid}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }

    return undefined;
}

export async function createTeacher(teacher: Teacher) {
    const myHeaders = new Headers();
    teacher.state = true;
    myHeaders.append("Content-Type", "application/json");

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


export async function updateTeacher(uid: string, name: string, state: boolean) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

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

export async function deleteTeacher(uid: string) {
    const requestOptions: RequestInit = {
        method: "DELETE",
        redirect: "follow" as RequestRedirect
    };

    try {
        const response = await fetch(`http://localhost:3001/teacher/${uid}`, requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}



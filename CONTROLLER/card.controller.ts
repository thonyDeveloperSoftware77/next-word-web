import { CardModel, CardSimilarModel, CardSimilarModelInput } from "../MODEL/Card";

export async function getCardsByCourse(token: string, course_id: number): Promise<CardModel[]> {
    try {
        const response = await fetch(`https://08e5-179-49-52-137.ngrok-free.app/card/course/${course_id}`, {
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


export async function getSimilarCard(token: string,  card_id: number): Promise<CardSimilarModel | null> {
    try {
        const response = await fetch(`https://08e5-179-49-52-137.ngrok-free.app/card_similar/${card_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Aquí es donde incluyes el token de Firebase
            },
        })
        const result = await response.json();

        if (response.ok) {
            return result;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null
    }

}



export async function createCard(token: string, course: CardModel) {
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
        const response = await fetch("https://08e5-179-49-52-137.ngrok-free.app/card", requestOptions);
        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error(error);
    }
    return undefined;
}

export async function createCards(token: string, courses: CardModel[]) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`); // Añade el token aquí

    const raw = JSON.stringify(courses);

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };

    try {
        const response = await fetch("https://08e5-179-49-52-137.ngrok-free.app/card/many", requestOptions);
        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error(error);
    }
    return undefined;
}



export async function createSimilarCard(token: string, course_id:number,  similarCardInput: CardSimilarModelInput) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`); // Añade el token aquí

    //Cambia los nombres de los atributos antes de enviarlos al servidor

    let similarCard : CardSimilarModel = {
        id: similarCardInput.id_similar,
        word_english: similarCardInput.word_english_similar,
        word_spanish: similarCardInput.word_spanish_similar,
        meaning_english: similarCardInput.meaning_english_similar,
        meaning_spanish: similarCardInput.meaning_spanish_similar,
        example_english: similarCardInput.example_english_similar,
        example_spanish: similarCardInput.example_spanish_similar,
        card_id: similarCardInput.card_id_similar
    }
    const raw = JSON.stringify(similarCard);

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };

    try {
        const response = await fetch(`https://08e5-179-49-52-137.ngrok-free.app/card_similar/${course_id}`, requestOptions);
        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error(error);
    }
    return undefined;
}



export async function updateCard(token: string, course: CardModel) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`); // Añade el token aquí


    const raw = JSON.stringify(course);

    const requestOptions: RequestInit = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };

    try {
        const response = await fetch(`https://08e5-179-49-52-137.ngrok-free.app/card/${course.id}`, requestOptions);
        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error(error);
    }
    return undefined;
}



export async function updateSimilarCard(token: string, course_id:number,  similarCardInput: CardSimilarModelInput) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`); // Añade el token aquí

    //Cambia los nombres de los atributos antes de enviarlos al servidor

    let similarCard : CardSimilarModel = {
        id: similarCardInput.id_similar,
        word_english: similarCardInput.word_english_similar,
        word_spanish: similarCardInput.word_spanish_similar,
        meaning_english: similarCardInput.meaning_english_similar,
        meaning_spanish: similarCardInput.meaning_spanish_similar,
        example_english: similarCardInput.example_english_similar,
        example_spanish: similarCardInput.example_spanish_similar,
        card_id: similarCardInput.card_id_similar
    }
    const raw = JSON.stringify(similarCard);

    const requestOptions: RequestInit = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };

    try {
        const response = await fetch(`https://08e5-179-49-52-137.ngrok-free.app/card_similar/${course_id}`, requestOptions);
        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error(error);
    }
    return undefined;
}

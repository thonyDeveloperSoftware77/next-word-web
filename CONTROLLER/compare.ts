export async function compareLearningRateBetweenStudents(token: string): Promise<[]> {
    try {
        const response = await fetch(`http://localhost:3001/learn/compareLearningRateBetweenStudents`, {
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

export async function analyzeEfficiencyByCategory(token: string): Promise<[]> {
    try {
        const response = await fetch(`http://localhost:3001/learn/analyzeEfficiencyByCategory`, {
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
    }
    catch (error) {
        console.error(error);
        return [];
    }
}


export async function identifyDifficultWordsByCourse(token: string): Promise<[]> {
    try {
        const response = await fetch(`http://localhost:3001/learn/identifyDifficultWordsByCourse`, {
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
    }
    catch (error) {
        console.error(error);
        return [];
    }
}


export async function getReporte(token: string): Promise<[]> {
    try {
        const response = await fetch(`http://localhost:3001/learn/compareLearningRateBetweenStudents`, {
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
    }
    catch (error) {
        console.error(error);
        return [];
    }
}


export async function comparationBetweenDates(date1: string, date2: string): Promise<[]> {
    try {
        const response = await fetch(`http://localhost:3001/learn/comparationBetweenDates`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date1, date2 })
        })
        const result = await response.json();
        //transformar el resultado a un array de objetos con map y retornar el resultado
        console.log(result)
        return result
    }
    catch (error) {
        console.error(error);
        return [];
    }
    
}
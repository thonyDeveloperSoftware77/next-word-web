
export interface CourseInput {
    name: string;
    description: string;
    duration: string;
    start_date: string;
    level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
    learning_objectives: string;
    course_content: string;
    teacher_uid: string;
}

export interface Course {
    id: number;
    code: string;
    name: string;
    description: string;
    duration: string;
    start_date: string;
    end_date: string;
    instructor: string;
    level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
    prerequisites: string;
    learning_objectives: string;
    course_content: string;
    type: "private" | "free"; 
    teacher_uid: string;
}

export interface CourseStudent{
    id: number;
    status: number,
    student: {
        uid: string;
        name: string;
        email: string;
    }
    
}
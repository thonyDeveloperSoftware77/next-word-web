'use client'
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../VIEW/providers/AuthContextProviderAdmin';
import  {Course}  from '../../../../MODEL/Course';
import { getCourseByTeacher } from '../../../../CONTROLLER/course.controller';
import TablePersonalizada from '../../../../VIEW/components/table/TablePersonalizada';
export default function CourseManagment() {
    const [data, setData] = useState<Course[]>([]);
    const { token, user } = useAuth();
    const [update, setUpdate] = useState(false); // Estado para forzar la actualización

    useEffect(() => {
        //Saca el token del usuario
        getCourseByTeacher(token, user.uid).then((res) => {
            console.log(res);
            setData(res);
        });
    }, [update]);

    //COLUMNAS DE LA TABLA DE EmailS
    const columns = [
        { name: "ID", uid: "id", sortable: true },
        { name: "Codigo", uid: "code", sortable: true },
        { name: "Nombre", uid: "name", sortable: true },
        { name: "Descripcion", uid: "description", sortable: true },
        { name: "Instructor", uid: "instructor", sortable: true },
        { name: "Contenido del Curso", uid: "course_content", sortable: true },
        { name: "Nivel", uid: "level", sortable: true },
        { name: "Prerequisitos", uid: "prerequisites", sortable: true },
        { name: "Objetivos de Aprendizaje", uid: "learning_objectives", sortable: true },
        { name: "Tipo", uid: "type", sortable: true },
        { name: "ACTIONS", uid: "actions" }
    ]

    //Nombre de los atributos de la tabla de Emails
    const INITIAL_VISIBLE_COLUMNS = ["code", "name",    "level","course_content", "actions"];
    return (
        <div>
            {data == undefined ? <p></p> : <TablePersonalizada setUpdate={setUpdate} columns={columns} INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS} users={data} option={"CourseManagment"} />}
        </div>
    );
}
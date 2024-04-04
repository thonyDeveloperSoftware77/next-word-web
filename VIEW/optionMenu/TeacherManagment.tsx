import dynamic from 'next/dynamic';

import TableCustom from '../components/table/tableCustom';
import { useEffect, useState } from 'react';
import { getTeachers } from '../../CONTROLLER/teacher.controller';
import Teacher from '../../MODEL/Teacher';
export default function TeacherManagment() {
    const [data, setData] = useState<Teacher[]>([]);
    const [update, setUpdate] = useState(false); // Estado para forzar la actualización

    useEffect(() => {
        getTeachers().then((res) => {
            setData(res);
        }
        );
    }, [update]);

    //COLUMNAS DE LA TABLA DE EmailS
    const columns = [
        { name: "ID", uid: "uid", sortable: true },
        { name: "Nombre", uid: "name", sortable: true },
        { name: "Email", uid: "email", sortable: true },
        { name: "ESTADO", uid: "state", sortable: true },
        { name: "ACTIONS", uid: "actions" }
    ]

    //Nombre de los atributos de la tabla de Emails
    const INITIAL_VISIBLE_COLUMNS = ["name", "email", "state", "actions"];
    return (
        <div>
            {data == undefined ? <p></p> : <TableCustom setUpdate={setUpdate} columns={columns} INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS} users={data} option={"TeacherManagment"}  />}
        </div>
    );
}
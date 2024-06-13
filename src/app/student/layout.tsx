'use client'
// components/TeacherLayout.js
import React, { useEffect, useState } from 'react';
import SideBar from '../../../VIEW/components/sidebar/SideBar';
import NavbarCustom from '../../../VIEW/components/navbar/NavbarCustom';
import { authValidation } from '../../../BD/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getStudent } from '../../../CONTROLLER/student.controller';
import { StudentOutput } from '../../../MODEL/Student';

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
    const auth = authValidation;
    const [data, setData] = useState<StudentOutput>({
        uid: '',
        name: '',
        email: '',
    });

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getStudent(user.uid).then((data: StudentOutput | undefined) => {
                    console.log(data);
                    setData(data || {
                        uid: '',
                        name: '',
                        email: '',
                    });
                });
            }
        });
    }, []); // El array vacío significa que el efecto se ejecutará solo una vez, cuando el componente se monte.

    return (
        <div className="app">
            <aside className="sideBar">
                <SideBar routes={[
                    { name: 'Explorar Cursos', path: '/student/explore'},
                    { name: 'Cursos', path: '/student/course'},
                    { name: 'Aprendizaje', path: '/student/learning'},
                    { name: 'Test', path: '/student/test'}

                ]} />
            </aside>
            <div className='navSide'>
                <NavbarCustom data={data} />
            </div>
            <main className='navSide'>
                {(React.cloneElement(children as React.ReactElement<any>, { data }))}
            </main>
        </div>
    )
};

export default TeacherLayout;


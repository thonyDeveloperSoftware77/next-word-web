'use client'
// components/TeacherLayout.js
import React, { useEffect, useState } from 'react';
import SideBar from '../../../VIEW/components/sidebar/SideBar';
import NavbarCustom from '../../../VIEW/components/navbar/NavbarCustom';
import { authValidation } from '../../../BD/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Teacher from '../../../MODEL/Teacher';
import { getTeacher } from '../../../CONTROLLER/teacher.controller';

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
    const auth = authValidation;
    const [data, setData] = useState<Teacher>({
        uid: '',
        name: '',
        email: '',
        password: '',
        state: false
    });

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getTeacher(user.uid).then((data: Teacher | undefined) => {
                    console.log(data);
                    setData(data || {
                        uid: '',
                        name: '',
                        email: '',
                        password: '',
                        state: false
                    });
                });
            }
        });
    }, []); // El array vacío significa que el efecto se ejecutará solo una vez, cuando el componente se monte.

    return (
        <div className="app">
            <aside className="sideBar">
                <SideBar routes={[
                    { name: 'Dashboard', path: '/teacher/dashboard' },
                    { name: 'Perfil', path: '/teacher/profile' },

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


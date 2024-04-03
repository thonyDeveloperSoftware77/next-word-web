// components/AdminLayout.js
import React, { useState } from 'react';
import NavbarCustom from '../../../../VIEW/components/navbar/NavbarCustom';
import SideBar from '../../../../VIEW/components/sidebar/SideBar';
import Teacher from '../../../../MODEL/Teacher';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    

    const data = {
        uid: '1',
        name: 'Admin',
        email: '',
        password: '',
        state: false
    }
    return(

    <div className = "app" >
        <aside className="sideBar">
            <SideBar routes={[
                { name: 'Perfil', path: '/admin/dashboard/profile' },
                { name: 'Teachers', path: '/admin/dashboard/teacher' },
                { name: 'Students', path: '/admin/dashboard/student' },
                { name: 'Courses', path: '/admin/dashboard/course' },
            ]} />
        </aside>
        <div className='navSide'>
            <NavbarCustom data={data} />
        </div>
        <main className='contentBox'>
            {children}
        </main>
    </div >
    )
}


export default AdminLayout;

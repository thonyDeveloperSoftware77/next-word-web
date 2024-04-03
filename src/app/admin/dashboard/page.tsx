'use client'
import withAuth from '../../../../HOCS/withAuth';
import AdminLayout from './layout';
function DashboardAdmin() {
    return (
        <div>
            <h1>Inicio de Sesión para administradores</h1>
        </div>
    );
}

export default withAuth(DashboardAdmin);
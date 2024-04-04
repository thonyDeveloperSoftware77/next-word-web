'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authValidation } from '../BD/firebase';
import Loading from '../VIEW/components/loading/Loading';

// Este es tu HOC
export default function withAuth(Component: React.ComponentType<any>) {
  return function ProtectedRoute(props: any) {
    console.log("Authenticating...");

    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const auth = authValidation;

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.push('/admin'); // Redirige al usuario a la página de inicio de sesión si no está autenticado
        } else if (user.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
          router.push('/admin'); // Redirige al usuario a la página de inicio de sesión si no está autenticado
        }else{
          setLoading(false);
        }

      });
    }, [auth, router]);

    if (loading) {
      return <div>
        <Loading />
      </div>; // Puedes reemplazar esto con tu propio componente de "cargando"
    } else {
      return <Component {...props} />;
    }
  };
}

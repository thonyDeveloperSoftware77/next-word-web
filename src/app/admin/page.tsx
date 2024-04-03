'use client'

import { Button, Input } from "@nextui-org/react";
import { getAuth, onAuthStateChanged, setPersistence } from "firebase/auth";
import { useEffect, useState } from "react";
import { authValidation } from "../../../BD/firebase";
import verifyAdminAccount from "../../../Utils/verifyAdminAccount";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function AdminPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in admin) {
      setAdmin({
        ...admin,
        [name]: value
      });
    }
  }


  async function handleAuth() {
    if (await verifyAdminAccount(admin.email, admin.password)) {
      toast.success("Inicio de sesión exitoso");
      router.push('/admin/dashboard');
    }
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authValidation, (user) => {
      if (user) {
        // El usuario está autenticado y es un usuario administrador
        if (user.uid === process.env.NEXT_PUBLIC_ADMIN_UID) {
          router.push('/admin/dashboard');
        }
      }
    });

    // Limpia la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, []);



  return (
    <div>
      <h1>Inicio de Sesión para administradores</h1>
      <Input
        label="Email"
        variant="bordered"
        placeholder="Enter your email"
        type="email"
        className="max-w-xs"
        name="email"
        value={admin.email}
        onChange={handleChange}
      />
      <Input
        label="Password"
        variant="bordered"
        placeholder="Enter your password"
        className="max-w-xs"
        name="password"
        value={admin.password}
        onChange={handleChange}
      />
      <Button color="primary" onPress={handleAuth}>
        Action
      </Button>
    </div>

  );
}

export default (AdminPage);
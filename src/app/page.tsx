'use client'
import { Card, CardBody, CardFooter, CardHeader, Divider, Link, Image, Button, ButtonGroup, Input } from "@nextui-org/react";
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { authValidation, provider } from "../../BD/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [teacher, setTeacher] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in teacher) {
      setTeacher({
        ...teacher,
        [name]: value
      });
    }
  }

  async function handleAuth() {
    try {
      await signInWithEmailAndPassword(authValidation, teacher.email, teacher.password);
      // Signed in
      console.log("Authentication successful");
      toast.success("Inicio de sesión exitoso");
      router.push('/teacher');
    } catch (error) {
      // An error occurred during authentication
      console.error("Authentication error:", error);
      toast.error("Inicio de sesión fallido");
    }

  }

  const auth = getAuth();
  const googleLogin = () => {
    return signInWithPopup(auth, provider)
  }

  const handleGoogle = () => {
    googleLogin()
      .then(result => {
        console.log(result.user);
        // toast
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ButtonGroup>
        <Button>Iniciar como Teacher</Button>
        <Button>Inicio Studen</Button>
      </ButtonGroup>
      <Button onClick={handleGoogle}>Sign in with Google</Button>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">NextUI</p>
            <p className="text-small text-default-500">nextui.org</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <Input
            label="Email"
            variant="bordered"
            placeholder="Enter your email"
            type="email"
            className="max-w-xs"
            name="email"
            value={teacher.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            className="max-w-xs"
            name="password"
            value={teacher.password}
            onChange={handleChange}
          />
          <Button color="primary" onPress={handleAuth}>
            Action
          </Button>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            Visit source code on GitHub.
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}

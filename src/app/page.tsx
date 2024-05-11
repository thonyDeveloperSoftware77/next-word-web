'use client'
import { Card, CardBody, CardFooter, CardHeader, Divider, Link, Image, Button, ButtonGroup, Input, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { getAuth, getIdToken, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { authValidation, provider } from "../../BD/firebase";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "../../VIEW/providers/AuthContextProviderAdmin";
import { useState } from "react";
import { createStudent } from "../../CONTROLLER/student.controller";
import { StudentInput } from "../../MODEL/Student";

export default function Home() {
  const router = useRouter();
  const { logIn } = useAuth();
  const [currentPage, setCurrentPage] = useState("Teacher");
  const initialState = {
    email: '',
    password: ''
  };

  const [teacher, setTeacher] = useState(initialState);
  const [studentLogin, setStudentLogin] = useState(initialState);
  const [studentRegister, setStudentRegister] = useState<StudentInput>({
    ...initialState,
    name: ''
  });

  const handleChange = (setter: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setter((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  }
  const handleCrear = async () => {
    try {
      await createStudent(studentRegister).then((res) => {
        if (res.email === studentRegister.email) {
          toast.success("Student created successfully");
          
        } else {
          toast.error(res.message.message);
        }
      });

    } catch (error) {
      toast.error("No se pudo crear el usuario");
    }



  }
  async function handleAuth() {
    try {
      // Signed in
      await logIn(teacher.email, teacher.password).then((res:any) => {
        if (res) {
          toast.success("Inicio de sesión exitoso");
          router.push("/teacher");
        } else {
          toast.error("Inicio de sesión fallido");
        }
      }
      );
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
      <Breadcrumbs
        size="sm"
        onAction={(key: any) => setCurrentPage(key)}
        classNames={{
          list: "gap-2",
        }}
        itemClasses={{
          item: [
            "px-2 py-0.5 border-small border-default-400 rounded-small",
            "data-[current=true]:border-foreground data-[current=true]:bg-foreground data-[current=true]:text-background transition-colors",
            "data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100",
          ],
          separator: "hidden",
        }}
      >
        <BreadcrumbItem key="Teacher" isCurrent={currentPage === "Teacher"}>
          Login Teacher
        </BreadcrumbItem>
        <BreadcrumbItem key="Student" isCurrent={currentPage === "Student"}>
          Login Student
        </BreadcrumbItem>
        <BreadcrumbItem key="StudentRegister" isCurrent={currentPage === "StudentRegister"}>
          Register Student
        </BreadcrumbItem>

      </Breadcrumbs>



      {currentPage === "Teacher" && (
        <>
          <h1>Login Teacher</h1>
          <br />
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
                onChange={handleChange(setTeacher)}
              />
              <Input
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                className="max-w-xs"
                name="password"
                value={teacher.password}
                onChange={handleChange(setTeacher)}
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
        </>
      )}
      {currentPage === "Student" && (
        <>
          <h1>Login Student</h1>
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
                value={studentLogin.email}
                onChange={handleChange(setStudentLogin)}
              />
              <Input
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                className="max-w-xs"
                name="password"
                value={studentLogin.password}
                onChange={handleChange(setStudentLogin)}
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
        </>
      )}
      {currentPage === "StudentRegister" && (
        <>
          <h1>Register Student</h1>
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
                label="Nombre"
                variant="bordered"
                placeholder="Enter your name"
                type="text"
                className="max-w-xs"
                name="name"
                value={studentRegister.name}
                onChange={handleChange(setStudentRegister)}
              />
              <Input
                label="Email"
                variant="bordered"
                placeholder="Enter your email"
                type="email"
                className="max-w-xs"
                name="email"
                value={studentRegister.email}
                onChange={handleChange(setStudentRegister)}
              />
              <Input
                label="Password"
                variant="bordered"
                type="password"
                placeholder="Enter your password"
                className="max-w-xs"
                name="password"
                value={studentRegister.password}
                onChange={handleChange(setStudentRegister)}
              />
              <Button color="primary" onPress={handleCrear}>
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
        </>
      )}


    </main>
  );
}

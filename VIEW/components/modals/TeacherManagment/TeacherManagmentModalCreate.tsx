import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import Teacher from "../../../../MODEL/Teacher";
import { createTeacher } from "../../../../CONTROLLER/teacher.controller";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { authCreate } from "../../../../BD/firebase";

export default function TeacherManagmentCModalreate(props: any) {
    const [teacher, setTeacher] = useState<Teacher>({
        uid: "",
        name: "",
        email: "",
        password: "",
        state: true
    });

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);


    const notifyError = (error: string) => toast.error(error);
    useEffect(() => {
        onOpen()
    }, [])



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name in teacher) {
            setTeacher({
                ...teacher,
                [name]: value
            });
        }
    }


    const handleCrear = async () => {
        try {
            await createTeacher(teacher).then((res) => {
                if (res.email === teacher.email) {
                    props.setUpdate((prevState: boolean) => !prevState);
                    toast.success("Teacher created successfully");
                    props.cerrar(true);
                } else {
                    notifyError(res.message.message);
                }
            });
        } catch (error) {
            toast.error("No se pudo crear el usuario");
        }



    }
    function handleCerrar() {
        onClose()
        setTimeout(() => { props.cerrar(true); }, 1000);
    }

    return (
        <>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={handleCerrar}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Name"
                                    variant="bordered"
                                    placeholder="Enter your name"
                                    type="text"
                                    className="max-w-xs"
                                    name="name"
                                    value={teacher.name}
                                    onChange={handleChange}
                                />
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
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={handleCerrar}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleCrear}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
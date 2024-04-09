import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import Teacher from "../../../../MODEL/Teacher";
import { createTeacher, deleteTeacher, updateTeacher } from "../../../../CONTROLLER/teacher.controller";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, deleteUser, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { authCreate, authValidation } from "../../../../BD/firebase";

export default function TeacherManagmentModalDelete(props: any) {
    const [teacher, setTeacher] = useState<Teacher>({
        uid: props.data.uid,
        name: props.data.name,
        email: props.data.email,
        password: "",
        state: props.data.state
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


    const handleDelete = async () => {
        try {
            // Una vez que tienes el UID, puedes eliminar el usuario
            onAuthStateChanged(authValidation, async (user) => {
                //Saca el token del usuario
                if (user) {
                    // El usuario está autenticado, obtenemos el token
                    const token = await user.getIdToken();
                    await deleteTeacher(token, teacher.uid).then((res) => {
                        if (res && res.email === teacher.email) {

                            props.setUpdate((prevState: boolean) => !prevState);
                            toast.success("Account deleted successfully");
                            props.cerrar(true);
                        } else {
                            notifyError(res?.message?.message);
                        }
                    });
                }
            })
        } catch (error) {
            toast.error("No se pudo eliminar el usuario");
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
                            <ModalHeader className="flex flex-col gap-1">Delete Teacher</ModalHeader>
                            <ModalBody>
                                <p>
                                    Estás seguro de eliminar la cuenta de {teacher.name}?
                                    <br />
                                    Se eliminará la cuenta {teacher.email} y no podrá recuperarse.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={handleCerrar}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleDelete}>
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
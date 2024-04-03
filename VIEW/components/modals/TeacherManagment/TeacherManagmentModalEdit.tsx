import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import Teacher from "../../../../MODEL/Teacher";
import { createTeacher, updateTeacher } from "../../../../CONTROLLER/teacher.controller";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { authCreate } from "../../../../BD/firebase";

export default function TeacherManagmentModalEdit(props: any) {
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


    const handleUpdate = async () => {
        try {
            await updateTeacher(teacher.uid, teacher.name, teacher.state).then((res) => {
                if (res && res.email === teacher.email) {
                    props.setUpdate((prevState: boolean) => !prevState);
                    toast.success("Teacher updated successfully");
                    props.cerrar(true);
                } else {
                    notifyError(res?.message?.message);
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
                                <Select
                                    label="Estado"
                                    variant="bordered"
                                    placeholder="Estado"
                                    name="state"
                                    className="max-w-xs"
                                    defaultSelectedKeys={[teacher.state.toString()]}
                                    onSelectionChange={(value) => {
                                        const valueArray = Array.from(value);
                                        setTeacher((prevSucursal) => ({
                                            ...prevSucursal,
                                            state: valueArray[0] === "true" ? true : false,
                                        }));
                                    }}

                                >
                                    <SelectItem key={"true"} value={"true"}>
                                        Activado
                                    </SelectItem>
                                    <SelectItem key={"false"} value={"false"}>
                                        Desactivado
                                    </SelectItem>
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={handleCerrar}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleUpdate}>
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
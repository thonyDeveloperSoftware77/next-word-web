import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, TableHeader, Table, TableColumn, TableCell, TableBody, TableRow } from "@nextui-org/react";
import { EyeFilledIcon } from "../TeacherManagment/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../TeacherManagment/EyeSlashFilledIcon";
import { changeStatusStudent, createCourse, getCourseByStudent } from "../../../../CONTROLLER/course.controller";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { authCreate, authValidation } from "../../../../BD/firebase";
import { useAuth } from "../../../providers/AuthContextProviderAdmin";
import { Course, CourseStudent } from "../../../../MODEL/Course";

export default function CourseManagmentModalView(props: any) {

    const { token, user } = useAuth();
    const [courseStudent, setCourseStudent] = useState<CourseStudent[]>([]);


    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    useEffect(() => {
        onOpen()
    }, [])



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, item:number) => {
        changeStatusStudent(token, item, parseInt(e.target.value)).then((res) => {
            console.log(res);
            toast.success("Se ha actualizado el estado del estudiante");
        });
    }


    const handleCrear = async () => {




    }
    function handleCerrar() {
        onClose()
        setTimeout(() => { props.cerrar(true); }, 1000);
    }


    useEffect(() => {
        getCourseByStudent(token, props.data.id).then((res) => {
            console.log(res);
            setCourseStudent(res);
        });
    }, []);


    return (
        <>
            <Modal
                size="3xl"
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
                            <ModalHeader className="flex flex-col gap-1">Estudiantes del curso {props.data.name}</ModalHeader>
                            <ModalBody>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <Table
                                        classNames={{
                                            base: "max-h-[2000px] overflow-scroll",
                                            table: "min-h-[100px]",
                                        }}
                                        aria-label="Example static collection table">
                                        <TableHeader>
                                            <TableColumn>NAME</TableColumn>
                                            <TableColumn>CORREO</TableColumn>
                                            <TableColumn>STATUS</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {courseStudent.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.student.name}</TableCell>
                                                    <TableCell>{item.student.email}</TableCell>
                                                    <TableCell>
                                                        <Select
                                                            label="State"
                                                            variant="bordered"
                                                            className="max-w-xs"

                                                            defaultSelectedKeys={
                                                                item.status === 1 ? "1" :
                                                                    item.status === 2 ? "2" :
                                                                        item.status === 3 ? "3" : "1"

                                                            }
                                                            onSelectionChange={(value) => {
                                                                let arrayValue = Array.from(value);
                                                                handleChange({ target: { name: "level", value: arrayValue[0] } } as any, item.id)
                                                            }}

                                                        >
                                                            <SelectItem key="1" value="1">
                                                                Pendiente
                                                            </SelectItem>
                                                            <SelectItem key="2" value="2">
                                                                Activo
                                                            </SelectItem>
                                                            <SelectItem key="3" value="3">
                                                                Denegado
                                                            </SelectItem>
                                                        </Select>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>



                                </div>

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
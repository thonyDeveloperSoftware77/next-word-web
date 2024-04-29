import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from "@nextui-org/react";
import { EyeFilledIcon } from "../TeacherManagment/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../TeacherManagment/EyeSlashFilledIcon";
import { createCourse } from "../../../../CONTROLLER/course.controller";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { authCreate, authValidation } from "../../../../BD/firebase";
import { useAuth } from "../../../providers/AuthContextProviderAdmin";
import {Course} from "../../../../MODEL/Course";

export default function CourseManagmentModalCreate(props: any) {

    const { token, user } = useAuth();
    console.log(user);

    const [course, setCourse] = useState<Course>({
        id: 0,
        name: "",
        description: "",
        code: "",
        duration: "",
        start_date: "",
        course_content: "",
        level: "A1",
        learning_objectives: "",
        teacher_uid: user.uid,
        end_date: "",
        instructor: "",
        prerequisites: "",
        type: "private"
    });

    const [duration, setDuration] = useState<string>("10 weeks");

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);


    const notifyError = (error: string) => toast.error(error);
    useEffect(() => {
        onOpen()
    }, [])



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name in course) {
            setCourse({
                ...course,
                [name]: value
            });
        }
    }


    const handleCrear = async () => {
        console.log(course);
        try {
            createCourse(token, course).then((res) => {
                props.setUpdate((prevState: boolean) => !prevState);
                toast.success("Course created successfully");
                props.cerrar(true);
            });
        
        } catch (error) {
            toast.error("No se pudo crear el curso");
        }



    }
    function handleCerrar() {
        onClose()
        setTimeout(() => { props.cerrar(true); }, 1000);
    }

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
                            <ModalHeader className="flex flex-col gap-1">Create a New Course</ModalHeader>
                            <ModalBody>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ display: "flex", margin: "5px" }}>
                                        <div style={{ width: "50%" }}>
                                            <Input

                                                label="Name"
                                                variant="bordered"
                                                placeholder="Enter your name"
                                                type="text"
                                                className="max-w-xs"
                                                name="name"
                                                value={course.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div style={{ marginLeft: "5px", width: "50%" }}>
                                            <Input
                                                label="Description"
                                                variant="bordered"
                                                placeholder="Enter the description"
                                                type="text"
                                                className="max-w-xs"
                                                name="description"
                                                value={course.description}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", margin: "5px" }}>
                                        <div style={{ width: "50%" }}>
                                            <Select
                                                label="Level"
                                                variant="bordered"
                                                placeholder="Seleccione el nivel"
                                                className="max-w-xs"
                                                onSelectionChange={(value) => {
                                                    let arrayValue = Array.from(value);
                                                    handleChange({ target: { name: "level", value: arrayValue[0] } } as any)
                                                }}

                                            >
                                                <SelectItem key="A1" value="A1">
                                                    A1
                                                </SelectItem>
                                                <SelectItem key="A2" value="A2">
                                                    A2
                                                </SelectItem>
                                                <SelectItem key="B1" value="B1">
                                                    B1
                                                </SelectItem>
                                                <SelectItem key="B2" value="B2">
                                                    B2
                                                </SelectItem>
                                                <SelectItem key="C1" value="C1">
                                                    C1
                                                </SelectItem>
                                                <SelectItem key="C2" value="C2">
                                                    C2
                                                </SelectItem>


                                            </Select>
                                        </div>
                                        <div style={{ marginLeft: "5px", width: "50%" }}>
                                            <Input
                                                label="Learning Objectives"
                                                variant="bordered"
                                                placeholder="Enter the learning objectives"
                                                type="text"
                                                className="max-w-xs"
                                                name="learning_objectives"
                                                value={course.learning_objectives}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>


                                    <div style={{ display: "flex", margin: "5px" }}>
                                        <div style={{ width: "50%" }}>
                                            <Select
                                                label="Course Content"
                                                variant="bordered"
                                                placeholder="Seleccione el contenido del curso"
                                                className="max-w-xs"
                                                onSelectionChange={(value) => {
                                                    let arrayValue = Array.from(value);
                                                    handleChange({ target: { name: "course_content", value: arrayValue[0] } } as any)
                                                }}

                                            >
                                                <SelectItem key="general" value="general">
                                                    General
                                                </SelectItem>
                                                <SelectItem key="psicologia" value="psicologia">
                                                    Psicología
                                                </SelectItem>
                                                <SelectItem key="medicina" value="medicina">
                                                    Medicina
                                                </SelectItem>
                                                <SelectItem key="negocios" value="negocios">
                                                    Negocios
                                                </SelectItem>
                                                <SelectItem key="arte" value="arte">
                                                    Arte
                                                </SelectItem>
                                                <SelectItem key="ciencia" value="ciencia">
                                                    Ciencia
                                                </SelectItem>
                                                <SelectItem key="tecnologia" value="tecnologia">
                                                    Tecnología
                                                </SelectItem>
                                                <SelectItem key="ingenieria_software" value="ingenieria_software">
                                                    Ingeniería de Software
                                                </SelectItem>

                                            </Select>
                                        </div>
                                        <div style={{ marginLeft: "5px", width: "50%" }}>
                                            <Input
                                                label="Start Date"
                                                variant="bordered"
                                                placeholder="Enter the start date"
                                                type="date"
                                                className="max-w-xs"
                                                name="start_date"
                                                value={course.start_date}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", margin: "5px" }}>
                                        <Select
                                            label="Duration"
                                            variant="bordered"
                                            placeholder="Seleccione la sucursal"
                                            className="max-w-xs"
                                            onSelectionChange={(value) => {
                                                let arrayValue = Array.from(value);
                                                handleChange({ target: { name: "duration", value: arrayValue[0] } } as any)
                                            }}

                                        >
                                            <SelectItem key="4 weeks" value="4 weeks">
                                                4 weeks
                                            </SelectItem>
                                            <SelectItem key="8 weeks" value="8 weeks">
                                                8 weeks
                                            </SelectItem>
                                            <SelectItem key="12 weeks" value="12 weeks">
                                                12weeks
                                            </SelectItem>
                                            <SelectItem key="16 weeks" value="16 weeks">
                                                16 weeks
                                            </SelectItem>

                                        </Select>
                                    </div>



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
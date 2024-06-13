'use client'
import { useEffect, useState } from "react";
import { getCourses } from "../../../../CONTROLLER/course.controller";
import { useAuth } from "../../../../VIEW/providers/AuthContextProviderAdmin";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Course } from "../../../../MODEL/Course";
import { inscripcionStudent } from "../../../../CONTROLLER/student.controller";
import { toast } from "react-toastify";

export default function Page() {
    const { token, user } = useAuth();
    const [data, setData] = useState<Course[]>([]);
    const [selectedCourseInsc, setSelectedCourseInsc] = useState<Course>();

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [visible, setVisible] = useState(false);
    const setSelectedCourse = (course: any) => {
        setSelectedCourseInsc(course);
        onOpen();
    }


    const handleInscription = () => {
        // inscripcionStudent(token, selectedCourseInsc?.id);
        if (selectedCourseInsc) {
            inscripcionStudent(token, selectedCourseInsc?.id).then((res) => {
                if (res) {
                    onClose();
                }
            }
            );
        }
    }

    useEffect(() => {
        getCourses(token).then((courses) => {
            setData(courses);
        });
    }
        , []);
    return (
        <div>
            <h1>A continuación se presentan los cursos disponibles:</h1>
            <div className="gallery">
                {data.length > 0 ? data.map((course) => (
                    <div onClick={() => setSelectedCourse(course)} key={course.id}>
                        <Card onClick={() => setSelectedCourse(course)} className="max-w-[400px]">
                            <CardHeader className="flex gap-3">
                                <Avatar name={course.name} />
                                <div className="flex flex-col">
                                    <p className="text-md font-semibold ">{course.name}</p>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <h2 >Descripción del Curso:</h2>
                                <p className="text-small text-default-600">{course.description}</p>
                                <h2 >Contenido del Curso:</h2>
                                <p className="text-small text-default-600">{course.course_content}</p>

                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <p className="text-small text-default-500">{course.code}</p>
                            </CardFooter>
                        </Card>
                    </div>

                )) : <h1>No hay cursos disponibles</h1>}
            </div>

            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Inscribirse a un curso</ModalHeader>
                            <ModalBody>
                                <p>
                                    Estás seguro de inscribirte al curso {selectedCourseInsc?.name}?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleInscription} >
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>

    );
}
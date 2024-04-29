'use client'
import { useEffect, useState } from "react";
import { getCourseByTeacher } from "../../../../CONTROLLER/course.controller";
import { useAuth } from "../../../../VIEW/providers/AuthContextProviderAdmin";
import { Course } from "../../../../MODEL/Course";
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";

export default function Page() {
    const [data, setData] = useState<Course[]>([]);
    const { token, user } = useAuth();
    const [update, setUpdate] = useState(false); // Estado para forzar la actualización
    const [selectedCard, setSelectedCard] = useState<Course | null>(null);

    useEffect(() => {
        //Saca el token del usuario
        getCourseByTeacher(token, user.uid).then((res) => {
            console.log(res);
            setData(res);
        });
    }, [update]);

    return (
        <div>
            <Breadcrumbs>
                <BreadcrumbItem onClick={() => setSelectedCard(null)} >
                    Cursos
                </BreadcrumbItem>
                {selectedCard && (
                    <BreadcrumbItem>
                        Words
                    </BreadcrumbItem>
                )}
            </Breadcrumbs>

            {selectedCard === null ? (
                <div className="gallery">
                    {data.map((course) => (
                        <div onClick={() => setSelectedCard(course)} key={course.id}>
                            <Card onClick={() => setSelectedCard(course)} className="max-w-[400px]">
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

                    ))}
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>

                    <div className="cardPanel">
                        <h1>Palabras del Curso</h1>
                    </div>
                    <div className="cardPanel">
                        <h1>Registrar nuevas Palabras</h1>
                    </div>
                </div>

            )}
        </div>
    );
}
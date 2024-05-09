'use client'
import { useEffect, useState } from "react";
import { getCourseByTeacher } from "../../../../CONTROLLER/course.controller";
import { useAuth } from "../../../../VIEW/providers/AuthContextProviderAdmin";
import { Course } from "../../../../MODEL/Course";
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardFooter, CardHeader, Chip, Code, Divider, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { createCard, createCards, createSimilarCard, getCardsByCourse, getSimilarCard, updateCard, updateSimilarCard } from "../../../../CONTROLLER/card.controller";
import { CardModel, CardSimilarModel, CardSimilarModelInput } from "../../../../MODEL/Card";
import { toast } from "react-toastify";

export default function Page() {
    const [data, setData] = useState<Course[]>([]);
    const [dataCard, setDataCard] = useState<CardModel[]>([]);
    const { token, user } = useAuth();
    const [update, setUpdate] = useState(false); // Estado para forzar la actualización
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [currentPage, setCurrentPage] = useState("Formulario");
    const [textareaValue, setTextareaValue] = useState('');
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [word, setWord] = useState<CardModel>({
        id: 0,
        word_english: "",
        word_spanish: "",
        meaning_english: "",
        meaning_spanish: "",
        example_english: "",
        example_spanish: "",
        course_id: selectedCourse?.id || 0
    });

    const [similarCard, setSimilarCard] = useState<CardSimilarModelInput>({
        id_similar: 0,
        word_english_similar: "",
        word_spanish_similar: "",
        meaning_english_similar: "",
        meaning_spanish_similar: "",
        example_english_similar: "",
        example_spanish_similar: "",
        card_id_similar: 0
    });

    const [isSimilarCard, setIsSimilarCard] = useState(false); // Estado para saber si la palabra tiene similar
    const [selectedCard, setSelectedCard] = useState<CardModel | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name in word) {
            setWord({
                ...word,
                [name]: value
            });
        }
    }



    const handleChangeSimilarCard = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name in similarCard) {
            setSimilarCard({
                ...similarCard,
                [name]: value
            });
        }
    }

    const handleCrear = async () => {
        console.log(word);
        try {
            createCard(token, word).then((res) => {
                if (!res) {
                    toast.error("No se pudo crear la palabra");
                    return;
                } else {
                    setUpdate((prevState: boolean) => !prevState);

                    toast.success("Word created successfully");
                    setWord({
                        id: 0,
                        word_english: "",
                        word_spanish: "",
                        meaning_english: "",
                        meaning_spanish: "",
                        example_english: "",
                        example_spanish: "",
                        course_id: selectedCourse?.id || 0
                    });
                }
            });

        } catch (error) {
            toast.error("No se pudo crear el curso");
        }
    }

    const handleActualizar = async () => {
        try {
            updateCard(token, word).then((res) => {
                if (!res) {
                    toast.error("No se pudo actualizar la palabra");
                    return;
                } else {
                    setUpdate((prevState: boolean) => !prevState);

                    toast.success("Word updated successfully");
                    setWord({
                        id: 0,
                        word_english: "",
                        word_spanish: "",
                        meaning_english: "",
                        meaning_spanish: "",
                        example_english: "",
                        example_spanish: "",
                        course_id: selectedCourse?.id || 0
                    });
                    onOpenChange();
                }
            });

        } catch (error) {
            toast.error("No se pudo actualizar la palabra");
        }
    }

    const handleSelectedCard = (card: CardModel) => {
        setSelectedCard(card);
        setWord(
            {
                id: card.id,
                word_english: card.word_english,
                word_spanish: card.word_spanish,
                meaning_english: card.meaning_english,
                meaning_spanish: card.meaning_spanish,
                example_english: card.example_english,
                example_spanish: card.example_spanish,
                course_id: card.course_id
            }

        );
        onOpen();
    }
    const validateCourse = (wordJson: any): wordJson is CardModel => {
        console.log(wordJson);
        return typeof wordJson.word_english === 'string' &&
            typeof wordJson.word_spanish === 'string' &&
            typeof wordJson.meaning_english === 'string' &&
            typeof wordJson.meaning_spanish === 'string' &&
            typeof wordJson.example_english === 'string' &&
            typeof wordJson.example_spanish === 'string' &&
            typeof wordJson.course_id === 'number';
    };


    const handleCreateMany = async () => {

        try {
            let wordsJson: any[] = JSON.parse(textareaValue);
            console.log(wordsJson);
            wordsJson = wordsJson.map(wordJson => ({ ...wordJson, course_id: selectedCourse?.id }));
            console.log(wordsJson);
            if (wordsJson.every(validateCourse)) {
                await createCards(token, wordsJson).then((res) => {
                    if (!res) {
                        toast.error("No se pudieron cargar las palabras");
                        return;
                    } else {
                        setUpdate((prevState: boolean) => !prevState);
                        toast.success("Words created successfully");
                        setTextareaValue('');
                    }
                });
            } else {
                toast.error('Uno o más de los objetos no siguen el modelo CardModel. Por favor, revisa la estructura.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Hubo un error al convertir el JSON. Por favor, revisa la estructura.');
        }
    };


    const handleCreateSimilarCard = async () => {
        console.log(word);
        try {
            if (similarCard)
                createSimilarCard(token, word.course_id, similarCard).then((res) => {
                    if (!res) {
                        toast.error("No se pudo crear la palabra");
                        return;
                    } else {
                        setUpdate((prevState: boolean) => !prevState);

                        toast.success("Word created successfully");
                        setSimilarCard({
                            id_similar: 0,
                            word_english_similar: "",
                            word_spanish_similar: "",
                            meaning_english_similar: "",
                            meaning_spanish_similar: "",
                            example_english_similar: "",
                            example_spanish_similar: "",
                            card_id_similar: selectedCard?.id || 0
                        });
                        onOpenChange();
                    }
                });

        } catch (error) {
            toast.error("No se pudo crear el curso");
        }
    }

    const handleUpdateSimilarCard = async () => {
        try {
            updateSimilarCard(token, word.course_id, similarCard).then((res) => {
                if (!res) {
                    toast.error("No se pudo actualizar la palabra");
                    return;
                } else {
                    setUpdate((prevState: boolean) => !prevState);

                    toast.success("Word updated successfully");
                    setSimilarCard({
                        id_similar: 0,
                        word_english_similar: "",
                        word_spanish_similar: "",
                        meaning_english_similar: "",
                        meaning_spanish_similar: "",
                        example_english_similar: "",
                        example_spanish_similar: "",
                        card_id_similar: selectedCard?.id || 0
                    });
                    onOpenChange();
                }
            });

        } catch (error) {
            toast.error("No se pudo actualizar la palabra");
        }
    }


    useEffect(() => {
        //Saca el token del usuario
        getCourseByTeacher(token, user.uid).then((res) => {
            console.log(res);
            setData(res);
        });
    }, [update]);

    useEffect(() => {
        //Saca el token del usuario
        if (selectedCourse) {
            getCardsByCourse(token, selectedCourse?.id).then((res) => {
                console.log(res);
                setDataCard(res);
            });
        }
        //Setea el id del curso en el objeto word
        setWord({
            ...word,
            course_id: selectedCourse?.id || 0
        });

    }, [selectedCourse, update]);

    /**
     * UseEffect que se dispara para pedir el similarCard de la card seleccionada
     */
    useEffect(() => {
        if (selectedCard) {
            getSimilarCard(token, selectedCard.id).then((res) => {
                if (res) {
                    setSimilarCard(
                        {
                            id_similar: res.id,
                            word_english_similar: res.word_english,
                            word_spanish_similar: res.word_spanish,
                            meaning_english_similar: res.meaning_english,
                            meaning_spanish_similar: res.meaning_spanish,
                            example_english_similar: res.example_english,
                            example_spanish_similar: res.example_spanish,
                            card_id_similar: res.card_id
                        }
                    );
                    setIsSimilarCard(true);
                } else {
                    setSimilarCard(
                        {
                            id_similar: 0,
                            word_english_similar: "",
                            word_spanish_similar: "",
                            meaning_english_similar: "",
                            meaning_spanish_similar: "",
                            example_english_similar: "",
                            example_spanish_similar: "",
                            card_id_similar: selectedCard.id
                        }
                    );
                }
            });
        }

    }, [selectedCard]);


    useEffect(() => {
        setSimilarCard({
            id_similar: 0,
            word_english_similar: "",
            word_spanish_similar: "",
            meaning_english_similar: "",
            meaning_spanish_similar: "",
            example_english_similar: "",
            example_spanish_similar: "",
            card_id_similar: selectedCard?.id || 0
        });
        setIsSimilarCard(false);
    }, [onOpenChange]);
    return (
        <div>
            <Breadcrumbs>
                <BreadcrumbItem onClick={() => setSelectedCourse(null)} >
                    Cursos
                </BreadcrumbItem>
                {selectedCourse && (
                    <BreadcrumbItem>
                        Words
                    </BreadcrumbItem>
                )}
            </Breadcrumbs>

            {selectedCourse === null ? (
                <div className="gallery">
                    {data.map((course) => (
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

                    ))}
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "1rem" }}>

                    <div className="cardPanel">
                        <Chip color="secondary" variant="dot">Palabras del Curso</Chip>
                        <br /><br />
                        <div className="gallery_v2" >
                            {
                                dataCard.map((card) => (
                                    <Card key={card.id} className="max-w-[400px]">
                                        <CardHeader className="flex gap-3">
                                            <Avatar name={card.word_english} />
                                            <div className="flex flex-col">
                                                <p className="text-md font-semibold ">{card.word_english} - {card.word_spanish}</p>
                                            </div>
                                        </CardHeader>
                                        <Divider />
                                        <CardBody onClick={() => handleSelectedCard(card)} >
                                            <h2 >Definition:</h2>
                                            <p className="text-small text-default-600">{card.meaning_english}</p>
                                            <h2 >Example:</h2>
                                            <p className="text-small text-default-600">{card.example_english}</p>
                                            <p className="text-small text-default-600">{card.example_spanish}</p>

                                        </CardBody>
                                    </Card>
                                ))
                            }

                            {/**
                             * Modal para actualizar palabras
                             */}
                            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
                                <ModalContent>
                                    {(onClose) => (
                                        <>
                                            <ModalHeader className="flex flex-col gap-1">{selectedCard?.word_english}</ModalHeader>
                                            <ModalBody>

                                                <div className="flex row" style={{ width: "100%" }}>
                                                    <div style={{ width: "50%" }}>
                                                        <h1>Actualizar</h1>
                                                        <br />
                                                        <div style={{ width: "100%" }}>
                                                            <Input
                                                                label="Word-English"
                                                                variant="bordered"
                                                                placeholder="Enter word in english"
                                                                type="text"
                                                                className="max-w-xs"
                                                                name="word_english"
                                                                value={word.word_english}
                                                                onChange={handleChange}
                                                            />
                                                            <Input

                                                                label="Word-Spanish"
                                                                variant="bordered"
                                                                placeholder="Enter word in spanish"
                                                                type="text"
                                                                className="max-w-xs"
                                                                name="word_spanish"
                                                                value={word.word_spanish}
                                                                onChange={handleChange}
                                                            />
                                                            <br />
                                                            <Input

                                                                label="Meaning-English"
                                                                variant="bordered"
                                                                placeholder="Enter meaning in english"
                                                                type="text"
                                                                className="max-w-xs"
                                                                name="meaning_english"
                                                                value={word.meaning_english}
                                                                onChange={handleChange}
                                                            />
                                                            <Input

                                                                label="Meaning-Spanish"
                                                                variant="bordered"
                                                                placeholder="Enter meaning in spanish"
                                                                type="text"
                                                                className="max-w-xs"
                                                                name="meaning_spanish"
                                                                value={word.meaning_spanish}
                                                                onChange={handleChange}
                                                            />
                                                            <br />
                                                            <Input

                                                                label="Example-English"
                                                                variant="bordered"
                                                                placeholder="Enter example in english"
                                                                type="text"
                                                                className="max-w-xs"
                                                                name="example_english"
                                                                value={word.example_english}
                                                                onChange={handleChange}
                                                            />
                                                            <Input

                                                                label="Example-Spanish"
                                                                variant="bordered"
                                                                placeholder="Enter example in spanish"
                                                                type="text"
                                                                className="max-w-xs"
                                                                name="example_spanish"
                                                                value={word.example_spanish}
                                                                onChange={handleChange}
                                                            />
                                                        </div>


                                                    </div>
                                                    <div style={{ width: "50%" }}>
                                                        <h1>
                                                            Palabra Similar
                                                        </h1>
                                                        {
                                                            isSimilarCard ? (
                                                                <div style={{ width: "100%" }}>
                                                                    <br />

                                                                    <div >
                                                                        <Input
                                                                            label="Word-English"
                                                                            variant="bordered"
                                                                            placeholder="Enter word in english"
                                                                            type="text"
                                                                            className="max-w-xs"
                                                                            name="word_english_similar"
                                                                            value={similarCard?.word_english_similar}
                                                                            onChange={handleChangeSimilarCard}
                                                                        />
                                                                        <Input

                                                                            label="Word-Spanish"
                                                                            variant="bordered"
                                                                            placeholder="Enter word in spanish"
                                                                            type="text"
                                                                            className="max-w-xs"
                                                                            name="word_spanish_similar"
                                                                            value={similarCard?.word_spanish_similar}
                                                                            onChange={handleChangeSimilarCard}
                                                                        />
                                                                        <br />
                                                                        <Input

                                                                            label="Meaning-English"
                                                                            variant="bordered"
                                                                            placeholder="Enter meaning in english"
                                                                            type="text"
                                                                            className="max-w-xs"
                                                                            name="meaning_english_similar"
                                                                            value={similarCard?.meaning_english_similar}
                                                                            onChange={handleChangeSimilarCard}
                                                                        />
                                                                        <Input

                                                                            label="Meaning-Spanish"
                                                                            variant="bordered"
                                                                            placeholder="Enter meaning in spanish"
                                                                            type="text"
                                                                            className="max-w-xs"
                                                                            name="meaning_spanish_similar"
                                                                            value={similarCard?.meaning_spanish_similar}
                                                                            onChange={handleChangeSimilarCard}
                                                                        />
                                                                        <br />
                                                                        <Input

                                                                            label="Example-English"
                                                                            variant="bordered"
                                                                            placeholder="Enter example in english"
                                                                            type="text"
                                                                            className="max-w-xs"
                                                                            name="example_english_similar"
                                                                            value={similarCard?.example_english_similar}
                                                                            onChange={handleChangeSimilarCard}
                                                                        />
                                                                        <Input

                                                                            label="Example-Spanish"
                                                                            variant="bordered"
                                                                            placeholder="Enter example in spanish"
                                                                            type="text"
                                                                            className="max-w-xs"
                                                                            name="example_spanish_similar"
                                                                            value={similarCard?.example_spanish_similar}
                                                                            onChange={handleChangeSimilarCard}
                                                                        />
                                                                    </div>
                                                                    <center>
                                                                        <Button onPress={handleUpdateSimilarCard}>
                                                                            Actualizar
                                                                        </Button>
                                                                    </center>
                                                                </div>

                                                            ) : (
                                                                <div>
                                                                    <p>No hay palabras similares, Registra una</p>
                                                                    <div style={{ width: "100%" }}>
                                                                        <Input
                                                                            label="Word-English"
                                                                            variant="bordered"
                                                                            placeholder="Enter word in english"
                                                                            type="text"
                                                                            className="max-w-xs"
                                                                            name="word_english_similar"
                                                                            value={similarCard?.word_english_similar}
                                                                            onChange={handleChangeSimilarCard}
                                                                        />
                                                                        <Input

                                                                            label="Word-Spanish"
                                                                            variant="bordered"
                                                                            placeholder="Enter word in spanish"
                                                                            type="text"
                                                                            className="max-w-xs"
                                                                            name="word_spanish_similar"
                                                                            value={similarCard?.word_spanish_similar}
                                                                            onChange={handleChangeSimilarCard}
                                                                        />
                                                                        <br />
                                                                        <Input

                                                                            label="Meaning-English"
                                                                            variant="bordered"
                                                                            placeholder="Enter meaning in english"
                                                                            type="text"
                                                                            className="max-w-xs"
                                                                            name="meaning_english_similar"
                                                                            value={similarCard?.meaning_english_similar}
                                                                            onChange={handleChangeSimilarCard}
                                                                        />
                                                                        <Input

                                                                            label="Meaning-Spanish"
                                                                            variant="bordered"
                                                                            placeholder="Enter meaning in spanish"
                                                                            type="text"
                                                                            className="max-w-xs"
                                                                            name="meaning_spanish_similar"
                                                                            value={similarCard?.meaning_spanish_similar}
                                                                            onChange={handleChangeSimilarCard}
                                                                        />
                                                                        <br />
                                                                        <Input

                                                                            label="Example-English"
                                                                            variant="bordered"
                                                                            placeholder="Enter example in english"
                                                                            type="text"
                                                                            className="max-w-xs"
                                                                            name="example_english_similar"
                                                                            value={similarCard?.example_english_similar}
                                                                            onChange={handleChangeSimilarCard}
                                                                        />
                                                                        <Input

                                                                            label="Example-Spanish"
                                                                            variant="bordered"
                                                                            placeholder="Enter example in spanish"
                                                                            type="text"
                                                                            className="max-w-xs"
                                                                            name="example_spanish_similar"
                                                                            value={similarCard?.example_spanish_similar}
                                                                            onChange={handleChangeSimilarCard}
                                                                        />
                                                                    </div>
                                                                    <br />
                                                                    <Button onPress={handleCreateSimilarCard}>
                                                                        Guardar
                                                                    </Button>
                                                                </div>

                                                            )
                                                        }

                                                    </div>
                                                </div>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="danger" variant="light" onPress={onClose}>
                                                    Close
                                                </Button>
                                                <Button color="primary" onPress={handleActualizar}>
                                                    Action
                                                </Button>
                                            </ModalFooter>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>
                        </div>

                    </div>

                    {/**
                     * Formulario para ingresar nuevas palabras
                    */}
                    <div className="cardPanel">
                        <Chip color="primary" variant="dot">Registrar nuevas Palabras</Chip>
                        <br /><br />
                        <Breadcrumbs
                            size="sm"
                            onAction={(key:any) => setCurrentPage(key)}
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
                            <BreadcrumbItem key="Formulario" isCurrent={currentPage === "Formulario"}>
                                Formulario
                            </BreadcrumbItem>
                            <BreadcrumbItem key="Json" isCurrent={currentPage === "Json"}>
                                Json
                            </BreadcrumbItem>

                        </Breadcrumbs>

                        {currentPage === "Formulario" && (
                            <div className="cardPanel">
                                <h1>Ingresar Nueva Palabra</h1>
                                <div style={{ width: "100%" }}>
                                    <Input

                                        label="Word-English"
                                        variant="bordered"
                                        placeholder="Enter word in english"
                                        type="text"
                                        className="max-w-xs"
                                        name="word_english"
                                        value={word.word_english}
                                        onChange={handleChange}
                                    />
                                    <Input

                                        label="Word-Spanish"
                                        variant="bordered"
                                        placeholder="Enter word in spanish"
                                        type="text"
                                        className="max-w-xs"
                                        name="word_spanish"
                                        value={word.word_spanish}
                                        onChange={handleChange}
                                    />
                                    <br />
                                    <Input

                                        label="Meaning-English"
                                        variant="bordered"
                                        placeholder="Enter meaning in english"
                                        type="text"
                                        className="max-w-xs"
                                        name="meaning_english"
                                        value={word.meaning_english}
                                        onChange={handleChange}
                                    />
                                    <Input

                                        label="Meaning-Spanish"
                                        variant="bordered"
                                        placeholder="Enter meaning in spanish"
                                        type="text"
                                        className="max-w-xs"
                                        name="meaning_spanish"
                                        value={word.meaning_spanish}
                                        onChange={handleChange}
                                    />
                                    <br />
                                    <Input

                                        label="Example-English"
                                        variant="bordered"
                                        placeholder="Enter example in english"
                                        type="text"
                                        className="max-w-xs"
                                        name="example_english"
                                        value={word.example_english}
                                        onChange={handleChange}
                                    />
                                    <Input

                                        label="Example-Spanish"
                                        variant="bordered"
                                        placeholder="Enter example in spanish"
                                        type="text"
                                        className="max-w-xs"
                                        name="example_spanish"
                                        value={word.example_spanish}
                                        onChange={handleChange}
                                    />
                                </div>
                                <Button
                                    onClick={handleCrear}
                                >
                                    Guardar
                                </Button>

                            </div>
                        )}
                        {currentPage === "Json" && (
                            <div className="cardPanel">
                                <h1>Ingresar varias palabras en formato Json</h1>

                                <p>Prompt AI:</p>
                                <p className="text-small text-default-600">
                                    Dame una lista de palabras en ingles de nivel !Elegir el nivel! y de categoría !Elegir Categoría! y conviételas al siguiente formato:

                                </p>
                                <Code color="primary">
                                    <pre>
                                        {JSON.stringify(
                                            [
                                                {
                                                    "word_english": "Word",
                                                    "word_spanish": "Palabra",
                                                    "meaning_english": "Word meaning",
                                                    "meaning_spanish": "Significado",
                                                    "example_english": "Example sentence",
                                                    "example_spanish": "Frase de ejemplo"
                                                },
                                            ], null, 4)}
                                    </pre>

                                </Code>

                                <Textarea
                                    label="Description"
                                    variant="faded"
                                    placeholder="Enter your description"
                                    disableAnimation
                                    disableAutosize
                                    onChange={(e) => setTextareaValue(e.target.value)}
                                    classNames={{
                                        base: "max-w-xl",
                                        input: "resize-y min-h-[200px] max-h-[600px]",
                                    }}
                                />
                                <br />

                                <Button
                                    onClick={handleCreateMany}
                                >
                                    Guardar
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

            )}
        </div>
    );
}
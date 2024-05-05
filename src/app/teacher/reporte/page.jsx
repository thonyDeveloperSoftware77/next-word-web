
'use client'
import { BreadcrumbItem, Breadcrumbs, Select, SelectItem } from '@nextui-org/react';
import { LiquidGauge } from '../../../../VIEW/components/chart/LiquidGauge';
import Radar from '../../../../VIEW/components/chart/Radar';
import { useEffect, useState } from 'react';
import { getCourseByTeacher } from '../../../../CONTROLLER/course.controller';
import { useAuth } from '../../../../VIEW/providers/AuthContextProviderAdmin';
import { Course } from '../../../../MODEL/Course';



export default function ReportePage() {
  const [currentPage, setCurrentPage] = useState([]);
  const [dataCourses, setDataCourses] = useState([]);
  const [dataCourse, setDataCourse] = useState();
  const [dataEstudiante, setDataEstudiante] = useState();
  const [optionSelected, setOptionSelected] = useState({
    option: "all",
    id: 0,
    selected: true,
  });

  const { token, user } = useAuth();

  useEffect(() => {
    //Saca el token del usuario
    getCourseByTeacher(token, user.uid).then((res) => {
      console.log(res);
      setDataCourses(res);
    });
  }, []);



  const data = {
    variables: [
      { key: "strength", label: "CTR Benchmarked" },
      { key: "adaptability", label: "Impressions per Spend" },
      { key: "creativity", label: "Clicks per Spend" },
      { key: "openness", label: "Leads per Spend" }
    ],
    sets: [
      {
        key: "me",
        label: "Your Campaign",
        values: {
          resilience: 10,
          strength: 7,
          adaptability: 10,
          creativity: 3,
          openness: 10,
          confidence: 10
        }
      }
    ]
  };

  return (
    <div>
      <h1>Reporte</h1>
      <h2>Resultados de Aprendizaje</h2>
      <Breadcrumbs
        size="sm"
        onAction={(key) => setCurrentPage(key)}
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
        <BreadcrumbItem key="Curso" isCurrent={currentPage === "Curso"}>
          Filtro por Curso
        </BreadcrumbItem>
        <BreadcrumbItem key="Estudiante" isCurrent={currentPage === "Estudiante"}>
          Filtro por Estudiante
        </BreadcrumbItem>

      </Breadcrumbs>

      { /**
       * Contenido de Filtrado por Curso
       */}
      {currentPage === "Curso" && (
        <div className="cardPanel">
          <Select
            label="Level"
            variant="bordered"
            placeholder="Seleccione el nivel"
            className="max-w-xs"
          >
            <SelectItem key="all" value="all">
              Todos
            </SelectItem>
            {
              dataCourses.map((course) => (
                <SelectItem key={course.code} value={course.code}>
                  {course.code}
                </SelectItem>
              ))
            }

          </Select>
          <LiquidGauge value={60} startColor='#6495ed' endColor='#dc143c' />
          <div style={{ width: "400px", height: "400px" }}>
            <Radar data={data} width={400} height={400} />
          </div>



        </div>
      )}


      { /**
       * Contenido de Filtrado por Estudiante
       */}

      {currentPage === "Estudiante" && (
        <div className="cardPanel">
          <h1>Ingresar varias palabras en formato Json</h1>

          <p>Prompt AI:</p>
          <p className="text-small text-default-600">
            Dame una lista de palabras en ingles de nivel !Elegir el nivel! y de categoría !Elegir Categoría! y conviételas al siguiente formato:

          </p>

        </div>
      )}

    </div>
  );
}
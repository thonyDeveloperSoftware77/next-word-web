
'use client'
import { Avatar, BreadcrumbItem, Breadcrumbs, Card, CardBody, CardFooter, CardHeader, Divider, Select, SelectItem } from '@nextui-org/react';
import { LiquidGauge } from '../../../../VIEW/components/chart/LiquidGauge';
import Radar from '../../../../VIEW/components/chart/Radar';
import { useEffect, useState } from 'react';
import { getCourseByTeacher } from '../../../../CONTROLLER/course.controller';
import { useAuth } from '../../../../VIEW/providers/AuthContextProviderAdmin';
import { Course } from '../../../../MODEL/Course';
import { compareLearningRateBetweenStudents, getReporte } from '../../../../CONTROLLER/compare';



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


  const [dataLearningRateBetweenStudents, setDataLearningRateBetweenStudents] = useState();

  const [report, setReport] = useState();
  const { token, user } = useAuth();


  const [selectedCourse1, setSelectedCourse1] = useState(null);
  const [selectedCourse2, setSelectedCourse2] = useState(null);
  const [selectedStudent1, setSelectedStudent1] = useState(null);
  const [selectedStudent2, setSelectedStudent2] = useState(null);

  const handleCourseChange1 = (e) => {
    setSelectedCourse1(e.target.value);
    setSelectedStudent1(null); // Reset student selection when course changes
  };

  const handleCourseChange2 = (e) => {
    setSelectedCourse2(e.target.value);
    setSelectedStudent2(null); // Reset student selection when course changes
  };

  const handleStudentChange1 = (e) => {
    setSelectedStudent1(e.target.value);
  };

  const handleStudentChange2 = (e) => {
    setSelectedStudent2(e.target.value);
  };

  const getCourseById = (id) => {
    return report.resultados.find(curso => curso.curso === id);
  };

  const getStudentById = (curso, id) => {
    return curso.estudiantes.find(est => est.nombre === id);
  };
  const selectedCourse1Data = selectedCourse1 ? getCourseById(selectedCourse1) : null;
  const selectedCourse2Data = selectedCourse2 ? getCourseById(selectedCourse2) : null;

  const selectedStudent1Data = selectedCourse1Data && selectedStudent1 ? getStudentById(selectedCourse1Data, selectedStudent1) : null;
  const selectedStudent2Data = selectedCourse2Data && selectedStudent2 ? getStudentById(selectedCourse2Data, selectedStudent2) : null;


  const identifyCourseStrengthsAndWeaknesses = (course) => {
    const strengths = [];
    const weaknesses = [];

    // Evaluar fortalezas y debilidades globales según los promedios de éxitos y fallos
    if (course.promedioExitos > course.promedioFallos) {
      strengths.push('Generalmente exitoso en revisiones');
    } else {
      weaknesses.push('Alta tasa de fallos en revisiones');
    }

    return { strengths, weaknesses };
  };

  const identifyStrengthsAndWeaknesses = (student) => {
    const strengths = [];
    const weaknesses = [];

    // Evaluar fortalezas y debilidades según el progreso por sílabas
    if (student.progresoPorSilabas.monosilabas.exitosas > student.progresoPorSilabas.monosilabas.fallidas) {
      strengths.push('Monosílabas');
    } else {
      weaknesses.push('Monosílabas');
    }

    if (student.progresoPorSilabas.bisilabas.exitosas > student.progresoPorSilabas.bisilabas.fallidas) {
      strengths.push('Bisílabas');
    } else {
      weaknesses.push('Bisílabas');
    }

    if (student.progresoPorSilabas.trisilabas.exitosas > student.progresoPorSilabas.trisilabas.fallidas) {
      strengths.push('Trisílabas');
    } else {
      weaknesses.push('Trisílabas');
    }

    if (student.progresoPorSilabas.polisilabas.exitosas > student.progresoPorSilabas.polisilabas.fallidas) {
      strengths.push('Polisílabas');
    } else {
      weaknesses.push('Polisílabas');
    }

    return { strengths, weaknesses };
  };


  useEffect(() => {
    //Saca el token del usuario
    getCourseByTeacher(token, user.uid).then((res) => {
      console.log(res);
      setDataCourses(res);
    });

    getReporte(token, user.uid).then((res) => {
      console.log(res);
      setReport(res);
    });
  }, []);

  if (!report) {
    return <div>Loading...</div>;
  }



  return (
    <div>
      <h1>Reporte</h1>
      <h2>Resultados de Aprendizaje</h2>

      <div className='container_reporte'>
        {report.resultados.map((resultado, index) => (
          <div key={index} className="mb-8 box_reporte">
            <div className="flex items-center mb-4">
              <Avatar name={resultado.curso} className="mr-4" />
              <div>
                <p className="text-xl font-semibold">{resultado.curso}</p>
              </div>
            </div>
            <Divider />
            <p className="text-sm text-default-500">Promedios</p>
            <p className="text-sm text-default-500">Revisiones: {Number(resultado.promedioRevisiones).toFixed(2)}%</p>
            <p className="text-sm text-default-500">Éxitos: {Number(resultado.promedioExitos).toFixed(2)}%</p>
            <p className="text-sm text-default-500">Fallos: {Number(resultado.promedioFallos).toFixed(2)}%</p>
            <p className="text-sm text-default-500">Tiempo: {Number(resultado.promedioTiempo).toFixed(2)}%</p>

            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Nombre</th>
                  <th className="py-2 px-4 border-b">Total Revisiones</th>
                  <th className="py-2 px-4 border-b">Revisiones Exitosas</th>
                  <th className="py-2 px-4 border-b">Revisiones Fallidas</th>
                  <th className="py-2 px-4 border-b">Total Tiempo (Días de Revisión)</th>
                  <th className="py-2 px-4 border-b">Recomendaciones</th>
                </tr>
              </thead>
              <tbody>
                {resultado.estudiantes.map((estudiante, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-4 border-b">{estudiante.nombre}</td>
                    <td className="py-2 px-4 border-b">{estudiante.totalRevisiones}</td>
                    <td className="py-2 px-4 border-b">{estudiante.revisionesExitosas}</td>
                    <td className="py-2 px-4 border-b">{estudiante.revisionesFallidas}</td>
                    <td className="py-2 px-4 border-b">{estudiante.totalTiempo}</td>


                    <td className="py-2 px-4 border-b">
                      {resultado.recomendaciones
                        .filter(rec => rec.nombreEstudiante === estudiante.nombre)
                        .map((rec, recIdx) => (
                          <div key={recIdx}>
                            <p>{rec.recomendacion}</p>
                            {rec.palabrasFallidas && (
                              <ul className="list-disc list-inside">
                                {rec.palabrasFallidas.map((palabra, palabraIdx) => (
                                  <li key={palabraIdx}>{palabra.palabra} - Intentos: {palabra.intentos}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br /><br />
          </div>
        ))}
      </div>
      <br /><br />

      <div className='container_reporte'>
        <div className="flex space-x-4 mb-8">
          <div>
            <label className="block mb-2">Selecciona Curso 1:</label>
            <select onChange={handleCourseChange1} className="border rounded px-4 py-2">
              <option value="">Seleccione un curso</option>
              {report.resultados.map((curso, index) => (
                <option key={index} value={curso.curso}>{curso.curso}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2">Selecciona Curso 2:</label>
            <select onChange={handleCourseChange2} className="border rounded px-4 py-2">
              <option value="">Seleccione un curso</option>
              {report.resultados.map((curso, index) => (
                <option key={index} value={curso.curso}>{curso.curso}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-4 mb-8">
          {selectedCourse1 && (
            <div>
              <label className="block mb-2">Selecciona Estudiante Curso 1:</label>
              <select onChange={handleStudentChange1} className="border rounded px-4 py-2">
                <option value="">Seleccione un estudiante</option>
                {getCourseById(selectedCourse1).estudiantes.map((est, index) => (
                  <option key={index} value={est.nombre}>{est.nombre}</option>
                ))}
              </select>
            </div>
          )}
          {selectedCourse2 && (
            <div>
              <label className="block mb-2">Selecciona Estudiante Curso 2:</label>
              <select onChange={handleStudentChange2} className="border rounded px-4 py-2">
                <option value="">Seleccione un estudiante</option>
                {getCourseById(selectedCourse2).estudiantes.map((est, index) => (
                  <option key={index} value={est.nombre}>{est.nombre}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="mb-8">
          {selectedCourse1 && selectedCourse2 && (
            <div className="box_reporte">
              <h2 className="text-xl font-semibold mb-4">Comparación éxito en revisiones de Cursos</h2>

              <Divider />
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Curso</th>
                    <th className="py-2 px-4 border-b">Promedio Revisiones</th>
                    <th className="py-2 px-4 border-b">Promedio Éxitos</th>
                    <th className="py-2 px-4 border-b">Promedio Fallos</th>
                    <th className="py-2 px-4 border-b">Promedio Tiempo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">{selectedCourse1}</td>
                    <td className="py-2 px-4 border-b">{Number(getCourseById(selectedCourse1).promedioRevisiones).toFixed(2)}%</td>
                    <td className="py-2 px-4 border-b">{Number(getCourseById(selectedCourse1).promedioExitos).toFixed(2)}%</td>
                    <td className="py-2 px-4 border-b">{Number(getCourseById(selectedCourse1).promedioFallos).toFixed(2)}%</td>
                    <td className="py-2 px-4 border-b">{Number(getCourseById(selectedCourse1).promedioTiempo).toFixed(2)}%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">{selectedCourse2}</td>
                    <td className="py-2 px-4 border-b">{Number(getCourseById(selectedCourse2).promedioRevisiones).toFixed(2)}%</td>
                    <td className="py-2 px-4 border-b">{Number(getCourseById(selectedCourse2).promedioExitos).toFixed(2)}%</td>
                    <td className="py-2 px-4 border-b">{Number(getCourseById(selectedCourse2).promedioFallos).toFixed(2)}%</td>
                    <td className="py-2 px-4 border-b">{Number(getCourseById(selectedCourse2).promedioTiempo).toFixed(2)}%</td>
                  </tr>
                </tbody>
              </table>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Curso</th>
                    <th className="py-2 px-4 border-b">Fortalezas</th>
                    <th className="py-2 px-4 border-b">Debilidades</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">{selectedCourse1}</td>
                    <td className="py-2 px-4 border-b">{identifyCourseStrengthsAndWeaknesses(selectedCourse1Data).strengths.join(', ')}</td>
                    <td className="py-2 px-4 border-b">{identifyCourseStrengthsAndWeaknesses(selectedCourse1Data).weaknesses.join(', ')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">{selectedCourse2}</td>
                    <td className="py-2 px-4 border-b">{identifyCourseStrengthsAndWeaknesses(selectedCourse2Data).strengths.join(', ')}</td>
                    <td className="py-2 px-4 border-b">{identifyCourseStrengthsAndWeaknesses(selectedCourse2Data).weaknesses.join(', ')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {selectedStudent1 && selectedStudent2 && (
            <div className="box_reporte mt-8">
              <h2 className="text-xl font-semibold mb-4">Comparación de Fortalezas entre Estudiantes</h2>

              <Divider />
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Estudiante</th>
                    <th className="py-2 px-4 border-b">Total Revisiones</th>
                    <th className="py-2 px-4 border-b">Revisiones Exitosas</th>
                    <th className="py-2 px-4 border-b">Revisiones Fallidas</th>
                    <th className="py-2 px-4 border-b">Total Tiempo (Días de Revisión)</th>
                    <th className="py-2 px-4 border-b">Potencial</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">{selectedStudent1}</td>
                    <td className="py-2 px-4 border-b">{getStudentById(getCourseById(selectedCourse1), selectedStudent1).totalRevisiones}</td>
                    <td className="py-2 px-4 border-b">{getStudentById(getCourseById(selectedCourse1), selectedStudent1).revisionesExitosas}</td>
                    <td className="py-2 px-4 border-b">{getStudentById(getCourseById(selectedCourse1), selectedStudent1).revisionesFallidas}</td>
                    <td className="py-2 px-4 border-b">{getStudentById(getCourseById(selectedCourse1), selectedStudent1).totalTiempo}</td>

                    <td className="py-2 px-4 border-b">
                      {getStudentById(getCourseById(selectedCourse1), selectedStudent1).potencial.monosilabas.length > 0 && (
                        <>
                          <p>Monosílabas:</p>
                          <ul className="list-disc list-inside">
                            {getStudentById(getCourseById(selectedCourse1), selectedStudent1).potencial.monosilabas.map((mensaje, i) => (
                              <li key={i}>{mensaje}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {getStudentById(getCourseById(selectedCourse1), selectedStudent1).potencial.bisilabas.length > 0 && (
                        <>
                          <p>Bisílabas:</p>
                          <ul className="list-disc list-inside">
                            {getStudentById(getCourseById(selectedCourse1), selectedStudent1).potencial.bisilabas.map((mensaje, i) => (
                              <li key={i}>{mensaje}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {getStudentById(getCourseById(selectedCourse1), selectedStudent1).potencial.trisilabas.length > 0 && (
                        <>
                          <p>Trisílabas:</p>
                          <ul className="list-disc list-inside">
                            {getStudentById(getCourseById(selectedCourse1), selectedStudent1).potencial.trisilabas.map((mensaje, i) => (
                              <li key={i}>{mensaje}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {getStudentById(getCourseById(selectedCourse1), selectedStudent1).potencial.polisilabas.length > 0 && (
                        <>
                          <p>Polisílabas:</p>
                          <ul className="list-disc list-inside">
                            {getStudentById(getCourseById(selectedCourse1), selectedStudent1).potencial.polisilabas.map((mensaje, i) => (
                              <li key={i}>{mensaje}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">{selectedStudent2}</td>
                    <td className="py-2 px-4 border-b">{getStudentById(getCourseById(selectedCourse2), selectedStudent2).totalRevisiones}</td>
                    <td className="py-2 px-4 border-b">{getStudentById(getCourseById(selectedCourse2), selectedStudent2).revisionesExitosas}</td>
                    <td className="py-2 px-4 border-b">{getStudentById(getCourseById(selectedCourse2), selectedStudent2).revisionesFallidas}</td>
                    <td className="py-2 px-4 border-b">{getStudentById(getCourseById(selectedCourse2), selectedStudent2).totalTiempo}</td>

                    <td className="py-2 px-4 border-b">
                      {getStudentById(getCourseById(selectedCourse2), selectedStudent2).potencial.monosilabas.length > 0 && (
                        <>
                          <p>Monosílabas:</p>
                          <ul className="list-disc list-inside">
                            {getStudentById(getCourseById(selectedCourse2), selectedStudent2).potencial.monosilabas.map((mensaje, i) => (
                              <li key={i}>{mensaje}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {getStudentById(getCourseById(selectedCourse2), selectedStudent2).potencial.bisilabas.length > 0 && (
                        <>
                          <p>Bisílabas:</p>
                          <ul className="list-disc list-inside">
                            {getStudentById(getCourseById(selectedCourse2), selectedStudent2).potencial.bisilabas.map((mensaje, i) => (
                              <li key={i}>{mensaje}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {getStudentById(getCourseById(selectedCourse2), selectedStudent2).potencial.trisilabas.length > 0 && (
                        <>
                          <p>Trisílabas:</p>
                          <ul className="list-disc list-inside">
                            {getStudentById(getCourseById(selectedCourse2), selectedStudent2).potencial.trisilabas.map((mensaje, i) => (
                              <li key={i}>{mensaje}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {getStudentById(getCourseById(selectedCourse2), selectedStudent2).potencial.polisilabas.length > 0 && (
                        <>
                          <p>Polisílabas:</p>
                          <ul className="list-disc list-inside">
                            {getStudentById(getCourseById(selectedCourse2), selectedStudent2).potencial.polisilabas.map((mensaje, i) => (
                              <li key={i}>{mensaje}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <td className="py-2 px-4 border-b">
                {selectedStudent1Data ? (
                  <>
                    <p>Fortalezas: {identifyStrengthsAndWeaknesses(selectedStudent1Data).strengths.join(', ')}</p>
                    <p>Debilidades: {identifyStrengthsAndWeaknesses(selectedStudent1Data).weaknesses.join(', ')}</p>
                  </>
                ) : '-'}
              </td>
              <td className="py-2 px-4 border-b">
                {selectedStudent2Data ? (
                  <>
                    <p>Fortalezas: {identifyStrengthsAndWeaknesses(selectedStudent2Data).strengths.join(', ')}</p>
                    <p>Debilidades: {identifyStrengthsAndWeaknesses(selectedStudent2Data).weaknesses.join(', ')}</p>
                  </>
                ) : '-'}
              </td>

            </div>
          )}
        </div>


      </div>

    </div >
  );
}
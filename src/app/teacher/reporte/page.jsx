
'use client'
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { LiquidGauge } from '../../../../VIEW/components/chart/LiquidGauge';
import Radar from '../../../../VIEW/components/chart/Radar';
import { useEffect, useState } from 'react';
import { getCourseByTeacher } from '../../../../CONTROLLER/course.controller';
import { useAuth } from '../../../../VIEW/providers/AuthContextProviderAdmin';
import { Course } from '../../../../MODEL/Course';
import { comparationBetweenDates, compareLearningRateBetweenStudents, getReporte } from '../../../../CONTROLLER/compare';
import { toast } from 'react-toastify';



export default function ReportePage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [dataCourses, setDataCourses] = useState([]);


  const [report, setReport] = useState();
  const { token, user } = useAuth();


  const [selectedCourse1, setSelectedCourse1] = useState(null);
  const [selectedCourse2, setSelectedCourse2] = useState(null);
  const [selectedStudent1, setSelectedStudent1] = useState(null);
  const [selectedStudent2, setSelectedStudent2] = useState(null);

  const [sinonimoRecomendation, setSinonimoRecomendation] = useState([]);

  const [dateCompare, setDateCompare] = useState({
    date1: '',
    date2: ''
  });

  const [comapationDates, setComapationDates] = useState([]);

  const handleClickCompareDates = () => {
    console.log(dateCompare);
    //Validacion de Fechas 
    if (dateCompare.date1 === '' || dateCompare.date2 === '') {
      toast.error('Debe seleccionar ambas fechas');
      return;
    }
    //Validar que la fecha 1 sea menor a la fecha 2
    if (dateCompare.date1 > dateCompare.date2) {
      toast.error('La fecha 1 debe ser menor a la fecha 2');
      return;
    }
    comparationBetweenDates(dateCompare.date1, dateCompare.date2).then((res) => {
      setComapationDates(res);
    });
  };



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


  const handleCerrar = () => {
    setSinonimoRecomendation([]);
    onOpenChange(false);

  };

  const handelOpenRecomendation = (palabrasSinonimo) => {
    setSinonimoRecomendation(palabrasSinonimo);
    onOpenChange(true);
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
                            {rec.palabrasSinonimo && (
                              <ul className="list-disc list-inside">
                                <Button
                                  onPress={() => handelOpenRecomendation(rec.palabrasSinonimo)}
                                >
                                  Ver recomedaciones
                                </Button>
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
      <br />

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
        <br /><br />
        <div>

          <h2 className="text-xl font-semibold mb-4">Estudiantes que se han demorado más en aprender</h2>
          <br />
          <div className='flex gap-4'>
            <div>
              <Input
                onChange={(e) => {
                  console.log(e.target.value);
                  setDateCompare({ ...dateCompare, date1: e.target.value });
                }
                }

                type="date" className="border rounded px-4 py-2" />
            </div>
            <div>
              <Input
                onChange={(e) => {
                  console.log(e.target.value);
                  setDateCompare({ ...dateCompare, date2: e.target.value });
                }
                }
                type="date" className="border rounded px-4 py-2" />
            </div>
            <Button
              onPress={handleClickCompareDates}
            >
              Comparar
            </Button>
          </div>
          {comapationDates.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Estudiantes con Más Fechas de Revisión</h2>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Nombre del Estudiante</th>
                    <th className="py-2 px-4 border-b">Total Fechas de Revisión</th>
                    <th className="py-2 px-4 border-b">Curso</th>
                    <th className="py-2 px-4 border-b">Días Totales</th>
                    <th className="py-2 px-4 border-b">Fechas de Revisión</th>
                  </tr>
                </thead>
                <tbody>
                  {comapationDates.map((student, idx) => (
                    <tr key={idx}>
                      <td className="py-2 px-4 border-b">{student.nombre}</td>
                      <td className="py-2 px-4 border-b">{student.totalFechasRevisiones}</td>
                      <td className="py-2 px-4 border-b">{student.course_name}</td>
                      <td className="py-2 px-4 border-b">{student.fechasRevisiones.length}</td>
                      <td className="py-2 px-4 border-b">
                        <ul>
                          {student.fechasRevisiones.map((fecha, fechaIdx) => (
                            <li key={fechaIdx}>{fecha}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>


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
                <ModalHeader className="flex flex-col gap-1">Palabras recomendadas para refuerzo</ModalHeader>
                <ModalBody>

                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Palabra</th>
                        <th className="py-2 px-4 border-b">Sinonimos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sinonimoRecomendation.map((sinonimo, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-b">{sinonimo.palabra}</td>
                          <td className="py-2 px-4 border-b">{sinonimo.sinonimos.join(', ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={handleCerrar}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>


      </div>

    </div >
  );
}
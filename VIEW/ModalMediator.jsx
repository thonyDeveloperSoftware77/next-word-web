import TeacherManagmentModalCreate from "./components/modals/TeacherManagment/TeacherManagmentModalCreate";
import TeacherManagmentModalEdit from "./components/modals/TeacherManagment/TeacherManagmentModalEdit";
import TeacherManagmentModalDelete from "./components/modals/TeacherManagment/TeacherManagmentModalDelete";
import CourseManagmentModalCreate from "./components/modals/CourseManagment/CourseManagmentModalCreate";

export default function ModalMediator({ type, request, ...props }) {
    console.log("ModalMediator", type, request)

    return (
        <>
            {
                type === "TeacherManagment" && request == "create" ? <TeacherManagmentModalCreate {...props} />
                : type === "TeacherManagment" && request == "edit" ? <TeacherManagmentModalEdit {...props} />
                : type === "TeacherManagment" && request == "delete" ? <TeacherManagmentModalDelete {...props} />
                : type === "CourseManagment" && request == "create" ? <CourseManagmentModalCreate {...props} />
                : null
            }
        </>
    )
}

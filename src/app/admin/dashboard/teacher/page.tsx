'use client'
import withAuth from "../../../../../HOCS/withAuth";
import TeacherManagment from "../../../../../VIEW/optionMenu/TeacherManagment";

function Page() {

    return (
        <div>
            <h1>Teacher</h1>
            <TeacherManagment />
        </div>
    );
}

export default withAuth(Page);
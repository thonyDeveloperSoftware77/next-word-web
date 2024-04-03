'use client'
import withAuth from "../../../../../HOCS/withAuth";
import TeacherManagment from "../../../../../VIEW/optionMenu/TeacherManagment";

function Page() {

    return (
        <div>
            <TeacherManagment />
        </div>
    );
}

export default withAuth(Page);
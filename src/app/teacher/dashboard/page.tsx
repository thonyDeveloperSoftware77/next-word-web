'use client'
import withAuthStore from "../../../../HOCS/withAuthStore";

function Page() {
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

export default withAuthStore(Page);
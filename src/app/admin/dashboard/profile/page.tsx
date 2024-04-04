'use client'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import withAuth from "../../../../../HOCS/withAuth";

 function Page() {
    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
}

export default withAuth(Page);
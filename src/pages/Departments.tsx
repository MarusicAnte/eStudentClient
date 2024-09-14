import React, { useEffect, useState } from "react";
import { OpenModalButton } from "../components/buttons/OpenModalButton";
import { DepartmentsTable } from "../components/tables/DepartmentsTable";
import { useUserContext } from "../components/context/UserContext";
import { fetchCollegeDepartments } from "../Services/departments/departmentsService";



export const Departments: React.FC = () => {

    const { user } = useUserContext();

    const [createDepartment, setCreateDepartment] = useState<boolean>(false);
    const [departments, setDepartments] = useState<IDepartment[]>([]);


    useEffect(() => {
        // if (!user)
        //     return;

        const loadDepartments = async () => {
            try {
                const data = await fetchCollegeDepartments();

                setDepartments(data);
            } catch (error) {
                console.log("Load departments error: ", error);
            }
        }

        loadDepartments();
    }, []);


    const handleOpenModal = () => setCreateDepartment(true);

    const handleCloseModal = () => setCreateDepartment(false);

    return (
        <div className="w-full flex flex-col gap-2 justify-between">

            {/* {createDepartment && <CreateDepartment onClose={handleCloseModal} />} */}

            <div className="flex flex-col gap-4 items-end">

                <OpenModalButton
                    imgURL="../../public/images/add-button.png"
                    alt="add-button-icon"
                    openModal={handleOpenModal}
                />

                <div className="w-full flex">
                    <DepartmentsTable
                        departments={departments}
                    />
                </div>
            </div>

        </div>

    );
}


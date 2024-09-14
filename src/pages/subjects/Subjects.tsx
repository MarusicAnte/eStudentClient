import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { CreateSubject } from "../../components/modals/CreateSubject";
import { FilterSideBar } from "../../components/sidebars/FilterSideBar";
import { SubjectsFilter } from "../../components/filters/SubjectsFilter";
import { OpenModalButton } from "../../components/buttons/OpenModalButton";

const initialSubjectsFilterOptions = {
    departments: [],
    semesters: []
}

const Subjects: React.FC = () => {
    const [createSubject, setCreateSubject] = useState<boolean>(false);
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    // Stanje za filtere
    const [selectedFilterOptions, setSelectedFilterOptions] = useState<ISubjectFilterOptions>(initialSubjectsFilterOptions)

    const handleOpenModal = () => setCreateSubject(true);
    const handleCloseModal = () => setCreateSubject(false);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    // console.log("Selected filter options: ", selectedFilterOptions);

    return (
        <div className="flex flex-col">
            {createSubject && <CreateSubject onClose={handleCloseModal} />}
            <div>
                <div className="flex justify-between items-center">
                    <nav className="mb-[2%]">
                        <NavLink
                            to="all-subjects"
                            className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link-noactive'}
                        >
                            All Subjects
                        </NavLink>

                        <NavLink
                            to="my-subjects"
                            className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link-noactive'}
                        >
                            My Subjects
                        </NavLink>
                    </nav>


                    <OpenModalButton
                        imgURL="../../public/images/add-subject-icon.png"
                        alt="add-subject-icon"
                        openModal={handleOpenModal}
                    />

                </div>
            </div>

            <div className={`w-full flex ${isFilterOpen ? '' : 'flex-col'}`}>
                {!isFilterOpen && (
                    <button
                        className="p-2 h-fit w-fit mb-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                        onClick={toggleFilter}
                    >
                        <img src="../../public/images/filter-icon.png" alt="filter-icon" className="w-8 h-8" />
                    </button>
                )}

                <div className={`flex-1 flex transition-all duration-300  ${isFilterOpen ? '' : 'flex-col'}`}>
                    {isFilterOpen && (
                        <FilterSideBar toggleFilter={toggleFilter}>
                            <SubjectsFilter
                                selectedFilterOptions={selectedFilterOptions}
                                setSelectedFilterOptions={setSelectedFilterOptions}
                            />
                        </FilterSideBar>
                    )}

                    <Outlet context={{ selectedFilterOptions }} />
                </div>
            </div>
        </div >
    );
}

export default Subjects;

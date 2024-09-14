// import React from "react";
// import { CloseModalButton } from "../buttons/CloseModalButton";
// import { ModalInput } from "../inputs/ModalInput";
// import Select from "react-select";
// import { ModalSelectInput } from "../inputs/ModalSelectInput";
// import { CreateButton } from "../buttons/CreateButton";

// interface ICreateDepartmentProps {
//     onClose: () => void;
// }

// export const CreateDepartment: React.FC<ICreateDepartmentProps> = ({ onClose }) => {
//     return (
//         <div className="modal-wrapper">
//             <div className="modal-container">
//                 <form className="flex flex-col">
//                     <CloseModalButton onClose={onClose} />

//                     <ModalInput
//                         label="Department:"
//                         type="text"
//                         value={createSubjectDto.name}
//                         placeholder="Subject name"
//                         required
//                         onChange={(e) => setCreateSubjectDto((prev: ICreateSubjectDto) => ({
//                             ...prev,
//                             name: e.target.value
//                         }))}
//                     />


//                     <ModalInput
//                         label="Description:"
//                         type="text"
//                         value={createSubjectDto.description}
//                         placeholder="Description"
//                         required
//                         onChange={(e) => setCreateSubjectDto((prev: ICreateSubjectDto) => ({
//                             ...prev,
//                             description: e.target.value
//                         }))}
//                     />

//                     <ModalSelectInput
//                         id="subjects"
//                         label="Subjects"
//                         options={formattedAssistants}
//                         value={assistantSelectedOptions}
//                         required={false}
//                         onChange={handleAssistantOption}
//                     />

//                     <ModalSelectInput
//                         id="professors"
//                         label="Professors"
//                         options={formattedProfessors}
//                         value={professorSelectedOptions}
//                         required={true}
//                         onChange={handleProfessorOption}

//                     />

//                     <ModalSelectInput
//                         id="assistants"
//                         label="Assistants"
//                         options={formattedAssistants}
//                         value={assistantSelectedOptions}
//                         required={false}
//                         onChange={handleAssistantOption}

//                     />

//                     <ModalSelectInput
//                         id="students"
//                         label="Students"
//                         options={formattedStudents}
//                         value={studentSelectedOptions}
//                         required={false}
//                         onChange={handleStudentOption}

//                     />

//                     <CreateButton
//                         type="submit"
//                         name="Create subject"
//                     />
//                 </form>
//             </div>
//         </div>
//     );
// }
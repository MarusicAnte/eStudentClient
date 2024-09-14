import React, { useState } from "react";
import RadioInput from "../inputs/RadioInput";

const Filter: React.FC = () => {

    const [selectedValue, setSelectedValue] = useState<string>("Svi")

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    }

    return (
        <div className="w-[44%] h-fit text-lg text-black bg-white rounded-md p-[1%] flex justify-between">
            <h2 className="text-md font-bold">Filter:</h2>

            <RadioInput
                value="Svi"
                checked={selectedValue === "Svi"}
                action={handleOptionChange}
            />

            <RadioInput
                value="Profesori"
                checked={selectedValue === "Profesori"}
                action={handleOptionChange}
            />

            <RadioInput
                value="Asistenti"
                checked={selectedValue === "Asistenti"}
                action={handleOptionChange}
            />

            <RadioInput
                value="Studenti"
                checked={selectedValue === "Studenti"}
                action={handleOptionChange}
            />
        </div>
    );
}

export default Filter; 
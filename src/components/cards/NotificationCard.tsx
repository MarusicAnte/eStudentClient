import React from "react";

interface INotoficationCard {
    title: string,
    sender: string,
    createdTime: string,
    description: string,
    subjects: string[]
}


export const NotificationCard: React.FC<INotoficationCard> = ({ title, sender, createdTime, description, subjects }) => {
    return (
        <div className="border-2 bg-white w-2/3 h-fit rounded-md p-[1%] border-black mb-[2%]">
            <h2 className="font-bold text-lg mb-[1%]">Title: {title}</h2>
            <h4 className="font-bold mb-[2%]"> <span className="font-bold ">Sender: </span> {sender}</h4>
            <div className="flex flex-col gap-2">
                <p>
                    <span className="font-bold ">Created timee: </span>
                    {createdTime}
                </p>
                <p>
                    <span className="font-bold ">Description: </span>
                    {description}
                </p>
                <p>
                    <span className="font-bold ">Subjects: </span>
                    {subjects}
                </p>
            </div>

        </div>
    );
}
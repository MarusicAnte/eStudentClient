import React, { useEffect, useState } from "react";
import { fetchedNotifications } from "../Services/notifications/notificationsService";
import { NotificationCard } from "../components/cards/NotificationCard";

const Notifications: React.FC = () => {

    const [notifications, setNotifications] = useState<INotifications[] | null>(null);

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const data = await fetchedNotifications();
                setNotifications(data);
            } catch (error) {
                console.error("Error fetching notifications: ", error);
            }
        }

        loadNotifications();
    }, [])

    return (
        <div className="h-full">
            <h1 className="font-bold text-xl mb-[2%]">Notifications</h1>
            {
                notifications ? (
                    notifications.length > 0 ? (
                        notifications.map(notification => (
                            <NotificationCard
                                key={notification.id}
                                title={notification.title}
                                sender={notification.sender}
                                createdTime={notification.createdTime}
                                description={notification.description}
                                subjects={notification.subjects.map((subject) => subject.name + ", ")}
                            />
                        ))
                    ) : (
                        <p>No notifications available.</p>
                    )
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    );
}

export default Notifications;
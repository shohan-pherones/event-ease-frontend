"use client";

import { useGetMyProfile } from "@/hooks/api-requests/useGetMyProfile";
import { IEvent } from "@/interfaces";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";

const EventCard = ({ event, isPast }: { event: IEvent; isPast?: boolean }) => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const { data } = useGetMyProfile();

  useEffect(() => {
    const match = data?.user?.registeredEvents.find(
      (ev) => ev._id === event._id
    );

    if (match) {
      setIsRegistered(true);
    }
  }, [event._id, data?.user?.registeredEvents]);

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">{event.name}</h2>
        <p>
          Created by:{" "}
          <span className="font-medium">{event.createdBy.name}</span>
        </p>
        <p>
          Date:{" "}
          <span className="font-medium">
            {format(new Date(event.date), "MMM d, yyyy 'at' h:mma")}
          </span>
        </p>
        <p>
          Location: <span className="font-medium">{event.location}</span>
        </p>
        <p>
          Max Attendees:{" "}
          <span className="font-medium">{event.maxAttendees}</span>
        </p>
        <p>
          Available Tickets:{" "}
          <span className="font-medium">
            {event.maxAttendees - event.registeredAttendees?.length}
          </span>
        </p>
        <div className="flex items-center gap-5 justify-between">
          <button
            disabled={
              (!isRegistered &&
                event.maxAttendees - event.registeredAttendees?.length === 0) ||
              isPast
            }
            className={cn(
              "btn",
              isRegistered ? "btn-primary" : "btn-secondary"
            )}
          >
            {(!isRegistered &&
              event.maxAttendees - event.registeredAttendees?.length === 0) ||
            isPast
              ? "Closed"
              : isRegistered && !isPast
              ? "Revoke Entry"
              : "Register Entry"}
          </button>
          <Link href={`/events/${event._id}`} className="btn btn-ghost">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

import { IEvent } from "@/interfaces";
import { format } from "date-fns";
import Link from "next/link";

const EventCard = ({ event, isPast }: { event: IEvent; isPast?: boolean }) => {
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
              event.maxAttendees - event.registeredAttendees?.length === 0 ||
              isPast
            }
            className="btn btn-secondary"
          >
            {event.maxAttendees - event.registeredAttendees?.length === 0 ||
            isPast
              ? "Closed"
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

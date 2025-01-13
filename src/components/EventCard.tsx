"use client";

import { useCreateEventRegistration } from "@/hooks/api-requests/useCreateEventRegistration";
import { useGetMyProfile } from "@/hooks/api-requests/useGetMyProfile";
import { useRevokeEventRegistration } from "@/hooks/api-requests/useRevokeEventRegistration";
import useAuth from "@/hooks/useAuth";
import { IEvent } from "@/interfaces";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Processing from "./Processing";
import { useSocket } from "@/contexts/SocketContext";

const EventCard = ({ event, isPast }: { event: IEvent; isPast?: boolean }) => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [availableTickets, setAvailableTickets] = useState<number>(
    (event.maxAttendees as number) - event.registeredAttendees?.length
  );

  const { user } = useAuth();
  const { data } = useGetMyProfile(user?._id);

  const { mutate: mutateRegisterEntry, isLoading: isRegisterLoading } =
    useCreateEventRegistration();
  const { mutate: mutateRevokeEntry, isLoading: isRevokeLoading } =
    useRevokeEventRegistration();

  const pathname = usePathname();
  const router = useRouter();
  const { socket } = useSocket();

  useEffect(() => {
    const match = data?.user?.registeredEvents.find(
      (ev) => ev._id === event._id
    );

    if (match) {
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }
  }, [event._id, data?.user]);

  const handleRegisterEntry = () => {
    if (!user) {
      return router.push(`/sign-in?redirect=${pathname}`);
    }

    mutateRegisterEntry(event._id, {
      onSuccess: (response) => {
        toast.success(response.message);
        setIsRegistered(true);
        setAvailableTickets((prev) => prev - 1);

        socket?.on("event:registration", (res) => {
          console.log(res);
        });

        socket?.on("event:max-attendees-reached", (res) => {
          console.log(res);
        });
      },
      onError: (err) => {
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data?.message || "An error occurred");
        } else {
          toast.error(err.message || "An unexpected error occurred");
        }
      },
    });
  };

  const handleRevokeEntry = () => {
    if (!user) {
      return router.push(`/sign-in?redirect=${pathname}`);
    }

    mutateRevokeEntry(event._id, {
      onSuccess: (response) => {
        toast.success(response.message);
        setIsRegistered(false);
        setAvailableTickets((prev) => prev + 1);
      },
      onError: (err) => {
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data?.message || "An error occurred");
        } else {
          toast.error(err.message || "An unexpected error occurred");
        }
      },
    });
  };

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
          <span className="font-medium">{availableTickets}</span>
        </p>
        <div className="flex items-center gap-5 justify-between">
          {isRegistered ? (
            <button
              onClick={handleRevokeEntry}
              disabled={isPast || isRevokeLoading}
              className="btn btn-primary"
            >
              {isPast ? (
                "Closed"
              ) : isRevokeLoading ? (
                <Processing />
              ) : (
                "Revoke Entry"
              )}
            </button>
          ) : (
            <button
              onClick={handleRegisterEntry}
              disabled={availableTickets === 0 || isPast || isRegisterLoading}
              className="btn btn-secondary"
            >
              {availableTickets === 0 || isPast ? (
                "Closed"
              ) : isRegisterLoading ? (
                <Processing />
              ) : (
                "Register Entry"
              )}
            </button>
          )}
          <Link href={`/events/${event._id}`} className="btn btn-ghost">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

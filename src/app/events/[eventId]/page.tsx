"use client";

import Loading from "@/components/Loading";
import { useGetEventDetails } from "@/hooks/api-requests/useGetEventDetails";
import useAuth from "@/hooks/useAuth";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";

const EventDetailsPage = ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const [isCreatedByMe, setIsCreatedByMe] = useState<boolean>(false);

  const { eventId } = use(params);
  const { data, isLoading } = useGetEventDetails(eventId);
  const { user } = useAuth();

  useEffect(() => {
    if (user?._id === data?.event.createdBy._id) {
      setIsCreatedByMe(true);
    } else {
      setIsCreatedByMe(false);
    }
  }, [user?._id, data?.event.createdBy._id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.event) {
    return notFound();
  }

  return (
    <main>
      <section className="wrapper min-h-[calc(100vh-4rem)] flex flex-col gap-2">
        <h3 className="text-2xl md:text-3xl font-bold">{data.event.name}</h3>
        <p className="text-sm opacity-50 max-w-xl">
          {isCreatedByMe ? (
            <span>
              Note: This event is created by you. You can edit or delete this
              event if you want.
            </span>
          ) : (
            <span>
              Note: This event was created by another user. You do not have
              permission to edit or delete it.
            </span>
          )}
        </p>
        <div>
          <p>
            Created by: <b>{data.event.createdBy.name}</b>
          </p>
          <p>
            Date & Time:{" "}
            <b>{format(new Date(data.event.date), "MMM d, yyyy 'at' h:mma")}</b>
          </p>
          <p>
            Location: <b>{data.event.location}</b>
          </p>
          <p>
            Max attendees: <b>{data.event.maxAttendees}</b>
          </p>
          <p>
            Available tickets:{" "}
            <b>
              {data.event.maxAttendees - data.event.registeredAttendees.length}
            </b>
          </p>
        </div>
        <div className="flex gap-5 items-center flex-wrap mt-3"></div>
      </section>
    </main>
  );
};

export default EventDetailsPage;

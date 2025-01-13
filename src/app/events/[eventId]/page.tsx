"use client";

import Loading from "@/components/Loading";
import Processing from "@/components/Processing";
import { useDeleteEvent } from "@/hooks/api-requests/useDeleteEvent";
import { useGetEventDetails } from "@/hooks/api-requests/useGetEventDetails";
import useAuth from "@/hooks/useAuth";
import { format } from "date-fns";
import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

const EventDetailsPage = ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const [isCreatedByMe, setIsCreatedByMe] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const { eventId } = use(params);
  const { data, isLoading } = useGetEventDetails(eventId);
  const { user } = useAuth();

  const router = useRouter();

  const deleteMutation = useDeleteEvent();

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

  const handleUpdate = () => {};

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete this event? This action cannot be undone."
      )
    ) {
      try {
        setIsDeleteLoading(true);
        await deleteMutation.mutateAsync(eventId);
        toast.success("Event deleted successfully.");
        router.push("/events");
      } catch (error) {
        toast.error(
          `Failed to delete the event. Please try again later. ${error}`
        );
      } finally {
        setIsDeleteLoading(false);
      }
    }
  };

  return (
    <main>
      <section className="wrapper min-h-[calc(100vh-4rem)] grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        <div className="flex flex-col gap-2">
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
              <b>
                {format(new Date(data.event.date), "MMM d, yyyy 'at' h:mma")}
              </b>
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
                {data.event.maxAttendees -
                  data.event.registeredAttendees.length}
              </b>
            </p>
          </div>
          <div className="flex gap-5 items-center flex-wrap mt-3">
            <button className="btn" onClick={() => router.back()}>
              Go Back to Register or Revoke
            </button>
            {isCreatedByMe && (
              <>
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Modify Event
                </button>
                <button
                  disabled={isDeleteLoading}
                  className="btn btn-primary"
                  onClick={handleDelete}
                >
                  {isDeleteLoading ? <Processing /> : "Delete Event"}
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl md:text-3xl font-bold">
            {data.event.registeredAttendees.length} people registered for this
            event
          </h3>
          <p className="text-sm opacity-50 max-w-xl">
            {isCreatedByMe ? (
              <span>
                Here&apos;s the list of users registered for your event.
              </span>
            ) : (
              <span>
                You cannot view the registered attendees as you didn&apos;t
                create this event.
              </span>
            )}
          </p>
          {isCreatedByMe && (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Attendee name</th>
                    <th>Email address</th>
                  </tr>
                </thead>
                <tbody>
                  {data.event.registeredAttendees.map((attendee, index) => (
                    <tr key={attendee._id}>
                      <td>{index + 1}</td>
                      <td>{attendee.name}</td>
                      <td>{attendee.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default EventDetailsPage;

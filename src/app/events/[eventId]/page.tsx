"use client";

import Loading from "@/components/Loading";
import Processing from "@/components/Processing";
import { useSocket } from "@/contexts/SocketContext";
import { useDeleteEvent } from "@/hooks/api-requests/useDeleteEvent";
import { useGetEventDetails } from "@/hooks/api-requests/useGetEventDetails";
import { useUpdateEvent } from "@/hooks/api-requests/useUpdateEvent";
import useAuth from "@/hooks/useAuth";
import { IEvent } from "@/interfaces";
import { updateEventSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EventDetailsPage = ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const [isCreatedByMe, setIsCreatedByMe] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { eventId } = use(params);
  const { data, isLoading, refetch } = useGetEventDetails(eventId);
  const { user } = useAuth();
  const router = useRouter();
  const deleteMutation = useDeleteEvent();
  const { mutate, isLoading: isUpdateLoading } = useUpdateEvent(eventId);
  const { socket } = useSocket();

  const toLocalDateTime = (utcDate: string | Date) => {
    const date = new Date(utcDate);
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date.getTime() - tzOffset).toISOString();
    return localISOTime.slice(0, 16);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IEvent>({
    resolver: zodResolver(updateEventSchema),
  });

  useEffect(() => {
    if (data?.event) {
      reset({
        name: data.event.name,
        date: toLocalDateTime(data.event.date),
        location: data.event.location,
        maxAttendees: data.event.maxAttendees.toString(),
      });
    }
  }, [data?.event, reset]);

  const onSubmit = (data: IEvent) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);
        setIsModalOpen(false);
        refetch();

        socket?.on("event:update", (res) => {
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
                {(data.event.maxAttendees as number) -
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
                <button
                  className="btn btn-primary"
                  onClick={() => setIsModalOpen(true)}
                >
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

      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[102]"></div>
          <div className="fixed z-[103] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 md:p-10 rounded-xl bg-base-100 w-full max-w-2xl shadow-lg">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2 justify-center"
            >
              <h3 className="text-2xl md:text-3xl font-bold">
                Update Your Event
              </h3>
              <p className="text-sm opacity-50">
                Please review the details carefully before updating the event to
                ensure all information is accurate and up-to-date.
              </p>
              <label htmlFor="name" className="form-control w-full">
                <div className="label">
                  <span className="label-text">Event name</span>
                </div>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  placeholder="Inter-University Dev Conf."
                  className="input input-bordered w-full"
                />
                {errors.name && (
                  <div className="label">
                    <span className="label-text-alt text-rose-500">
                      {errors.name.message}
                    </span>
                  </div>
                )}
              </label>
              <label htmlFor="date" className="form-control w-full">
                <div className="label">
                  <span className="label-text">Date & Time</span>
                </div>
                <input
                  {...register("date")}
                  type="datetime-local"
                  id="date"
                  className="input input-bordered w-full"
                />
                {errors.date && (
                  <div className="label">
                    <span className="label-text-alt text-rose-500">
                      {errors.date.message}
                    </span>
                  </div>
                )}
              </label>
              <label htmlFor="location" className="form-control w-full">
                <div className="label">
                  <span className="label-text">Location</span>
                </div>
                <input
                  {...register("location")}
                  type="text"
                  id="location"
                  placeholder="123 Main Street, NY"
                  className="input input-bordered w-full"
                />
                {errors.location && (
                  <div className="label">
                    <span className="label-text-alt text-rose-500">
                      {errors.location.message}
                    </span>
                  </div>
                )}
              </label>
              <label htmlFor="maxAttendees" className="form-control w-full">
                <div className="label">
                  <span className="label-text">Max attendees</span>
                </div>
                <input
                  {...register("maxAttendees")}
                  type="number"
                  id="maxAttendees"
                  placeholder="e.g. 500"
                  className="input input-bordered w-full"
                />
                {errors.maxAttendees && (
                  <div className="label">
                    <span className="label-text-alt text-rose-500">
                      {errors.maxAttendees.message}
                    </span>
                  </div>
                )}
              </label>
              <button
                disabled={isUpdateLoading}
                type="submit"
                className="mt-3 btn btn-primary"
              >
                {isUpdateLoading ? <Processing /> : "Submit"}
              </button>
            </form>
          </div>
        </>
      )}
    </main>
  );
};

export default EventDetailsPage;

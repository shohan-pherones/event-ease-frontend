"use client";

import Processing from "@/components/Processing";
import { useCreateEvent } from "@/hooks/api-requests/useCreateEvent";
import { IEvent } from "@/interfaces";
import { createEventSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateEventPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEvent>({
    resolver: zodResolver(createEventSchema),
  });
  const { mutate, isLoading } = useCreateEvent();
  const router = useRouter();

  const onSubmit = (data: IEvent) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/users/events/manage");
        }, 100);
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
    <main>
      <section className="min-h-[calc(100vh-4rem)] container mx-auto max-w-2xl px-5 md:px-10 py-10 md:py-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 justify-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold">
            Create your new event
          </h3>
          <p className="text-sm opacity-50">
            Begin creating your event by filling out the necessary details.
            Whether it&apos;s a professional gathering, a social celebration, or
            a virtual meeting, our intuitive process ensures a seamless setup to
            bring your vision to life. Let&apos;s get started!
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
            disabled={isLoading}
            type="submit"
            className="mt-3 btn btn-primary"
          >
            {isLoading ? <Processing /> : "Submit"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateEventPage;

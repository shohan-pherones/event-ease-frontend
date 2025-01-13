"use client";

import EventsContainer from "@/components/EventsContainer";
import Loading from "@/components/Loading";
import { useGetMyProfile } from "@/hooks/api-requests/useGetMyProfile";
import useAuth from "@/hooks/useAuth";
import { notFound } from "next/navigation";

const EventsIHaveRegisteredPage = () => {
  const { user } = useAuth();
  const { data, isLoading } = useGetMyProfile(user?._id);

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.user?.registeredEvents?.length) {
    return notFound();
  }

  return (
    <main>
      <EventsContainer events={data.user.registeredEvents} />
    </main>
  );
};

export default EventsIHaveRegisteredPage;

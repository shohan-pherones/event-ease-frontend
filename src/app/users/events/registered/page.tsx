"use client";

import EventsContainer from "@/components/EventsContainer";
import Loading from "@/components/Loading";
import { useGetMyProfile } from "@/hooks/api-requests/useGetMyProfile";
import { notFound } from "next/navigation";

const EventsIHaveRegisteredPage = () => {
  const { data, isLoading } = useGetMyProfile();

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

"use client";

import EventsContainer from "@/components/EventsContainer";
import Loading from "@/components/Loading";
import { useGetEventsCreatedByMe } from "@/hooks/api-requests/useGetEventsCreatedByMe";
import { notFound } from "next/navigation";

const EventsCreatedByMePage = () => {
  const { data, isLoading } = useGetEventsCreatedByMe();

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.events.length) {
    return notFound();
  }

  return (
    <main>
      <EventsContainer events={data.events} />
    </main>
  );
};

export default EventsCreatedByMePage;

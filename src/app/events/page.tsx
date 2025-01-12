"use client";

import EventsContainer from "@/components/EventsContainer";
import Loading from "@/components/Loading";
import { useGetAllEvents } from "@/hooks/api-requests/useGetAllEvents";
import { notFound } from "next/navigation";

const EventsPage = () => {
  const { data, isLoading } = useGetAllEvents();

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.events?.length) {
    return notFound();
  }

  return (
    <main>
      <EventsContainer events={data.events} />
    </main>
  );
};

export default EventsPage;

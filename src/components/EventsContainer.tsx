import { IEvent } from "@/interfaces";
import EventCard from "./EventCard";
import SectionTitle from "./SectionTitle";

interface EventsContainerProps {
  events: IEvent[];
}

const EventsContainer = ({ events }: EventsContainerProps) => {
  return (
    <section className="wrapper min-h-[calc(100vh-4rem)] ">
      <SectionTitle
        title={`Upcoming Events: ${
          events.filter((ev) => new Date() < new Date(ev.date)).length
        }`}
      />
      <div className="grid-container mb-5 md:mb-10">
        {events
          .filter((ev) => new Date() < new Date(ev.date))
          .map((ev) => (
            <EventCard key={ev._id} event={ev} />
          ))}
      </div>
      <SectionTitle
        title={`Past Events: ${
          events.filter((ev) => new Date() > new Date(ev.date)).length
        }`}
      />
      <div className="grid-container">
        {events
          .filter((ev) => new Date() >= new Date(ev.date))
          .map((ev) => (
            <EventCard key={ev._id} event={ev} isPast />
          ))}
      </div>
    </section>
  );
};

export default EventsContainer;

"use client";

import Loading from "@/components/Loading";
import { useGetMyProfile } from "@/hooks/api-requests/useGetMyProfile";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

const ProfilePage = ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = use(params);
  const { data, isLoading } = useGetMyProfile(userId);

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.user) {
    return notFound();
  }

  return (
    <main>
      <section className="wrapper h-[calc(100vh-4rem)] flex flex-col gap-2">
        <h3 className="text-2xl md:text-3xl font-bold">
          Hello, {data.user.name.split(" ")[0]}!
        </h3>
        <p className="text-sm opacity-50 max-w-xl">
          Here you can see your profile details and navigations for a seamless
          experience. We&apos;re glad to have you back!
        </p>
        <div>
          <p>
            Name: <b>{data.user.name}</b>
          </p>
          <p>
            Email: <b>{data.user.email}</b>
          </p>
          <p>
            Role: <b>{data.user.role}</b>
          </p>
          <p>
            Joined on:{" "}
            <b>{format(new Date(data.user.createdAt), "MMM d, yyyy")}</b>
          </p>
          <p>
            Events created: <b>{data.user.events.length}</b>
          </p>
          <p>
            Events participated: <b>{data.user.registeredEvents.length}</b>
          </p>
        </div>
        <div className="flex items-center gap-5 flex-wrap mt-3">
          <Link className="btn btn-primary" href="/users/events/create">
            Create New Event
          </Link>
          <Link className="btn btn-primary" href="/users/events/manage">
            Events Created by Me
          </Link>
          <Link className="btn btn-primary" href="/users/events/registered">
            Events I&apos;ve Registered
          </Link>
          {data.user.role === "admin" && (
            <>
              <Link className="btn btn-secondary" href="/admin/manage/users">
                Manage All Users
              </Link>
              <Link className="btn btn-secondary" href="/admin/manage/events">
                Manage All Events
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;

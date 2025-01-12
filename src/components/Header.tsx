"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";

const Header = () => {
  const { logoutDispatcher, user } = useAuth();

  const linkItems = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/events">Events</Link>
      </li>
    </>
  );

  return (
    <header className="navbar bg-base-100 h-16 max-h-16 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {linkItems}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          Event Ease
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{linkItems}</ul>
      </div>
      <div className="navbar-end gap-5">
        {user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar mt-2">
              <div className="w-10 aspect-square rounded-full bg-primary">
                <span className="text-2xl font-bold flex items-center justify-center w-full h-full">
                  {user.name.charAt(0)}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100/90 backdrop-blur-lg rounded-box z-[1] mt-2 w-52 p-2 shadow"
            >
              <li>
                <Link
                  href={`/users/profile/${user._id}`}
                  className="flex flex-col items-start"
                >
                  <span className="whitespace-nowrap font-bold">
                    {user.name}
                  </span>
                  <span className="-mt-3 opacity-50 text-xs">{user.email}</span>
                </Link>
              </li>
              <li>
                <Link href="/users/events/create">Create New Event</Link>
              </li>
              <li>
                <Link href="/users/events/manage">Events Created by Me</Link>
              </li>
              <li>
                <Link href="/users/events/registered">
                  Events I&apos;ve Registered
                </Link>
              </li>
              {user.role === "admin" && (
                <>
                  <li>
                    <Link href="/admin/manage/users">Manage All Users</Link>
                  </li>
                  <li>
                    <Link href="/admin/manage/events">Manage All Events</Link>
                  </li>
                </>
              )}
              <li>
                <button onClick={() => logoutDispatcher()}>Logout</button>
              </li>
            </ul>
          </div>
        )}
        {!user?.name && (
          <Link href="/sign-in" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

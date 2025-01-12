import Link from "next/link";

const Header = () => {
  const linkItems = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/events">Events</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/contact">Contact</Link>
      </li>
    </>
  );

  return (
    <header className="navbar bg-base-100/50 backdrop-blur-lg h-20 max-h-20 sticky top-0 z-50">
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
            className="menu menu-sm dropdown-content bg-base-100/50 backdrop-blur-lg rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
      <div className="navbar-end">
        <Link href="/sign-in" className="btn btn-primary">
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;

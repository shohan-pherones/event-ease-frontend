"use client";

import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <main>
      <section className="h-[calc(100vh-4rem)] wrapper flex flex-col gap-5 items-center justify-center">
        <h2 className="card-title">Oops! Page Not Found</h2>
        <div className="flex items-center gap-5">
          <button onClick={() => router.push("/")} className="btn btn-primary">
            Back to Home
          </button>
          <button onClick={() => router.back()} className="btn">
            Back to Previous
          </button>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;

"use client";

import Processing from "@/components/Processing";
import { useRegistration } from "@/hooks/api-requests/useRegistration";
import useAuth from "@/hooks/useAuth";
import { IRegistration } from "@/interfaces";
import { registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [shouldPasswordVisible, setShouldPasswordVisible] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistration>({
    resolver: zodResolver(registerSchema),
  });
  const { mutate, isLoading } = useRegistration();
  const router = useRouter();
  const { saveCredentialsDispatcher } = useAuth();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const onSubmit = (data: IRegistration) => {
    mutate(data, {
      onSuccess: (response) => {
        saveCredentialsDispatcher(response);
        setTimeout(() => {
          router.push(redirectPath || "/");
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
      <section className="min-h-[calc(100vh-4rem)] container mx-auto max-w-2xl py-10 md:py-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 justify-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold">Create an account</h3>
          <p className="text-sm opacity-50">
            Create your account by providing the details below. Enjoy faster
            event creation, seamless registration, and access to exclusive perks
            once you sign up!
          </p>
          <label htmlFor="name" className="form-control w-full">
            <div className="label">
              <span className="label-text">Fullname</span>
            </div>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="Sarah Parker"
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
          <label htmlFor="email" className="form-control w-full">
            <div className="label">
              <span className="label-text">Email address</span>
            </div>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="sarah@example.com"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.email.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="password" className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <div className="relative">
              <input
                {...register("password")}
                type={shouldPasswordVisible ? "text" : "password"}
                id="password"
                placeholder="Type a strong password"
                className="input input-bordered w-full"
              />
              <button
                onClick={() => setShouldPasswordVisible(!shouldPasswordVisible)}
                type="button"
                className="absolute top-1/2 -translate-y-1/2 right-2"
              >
                {!shouldPasswordVisible ? <EyeClosed /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.password.message}
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
          <p className="mt-1">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() =>
                router.push(
                  redirectPath
                    ? `/sign-in?redirect=${redirectPath}`
                    : "/sign-in"
                )
              }
              className="link link-hover font-bold"
            >
              Login
            </button>
          </p>
        </form>
      </section>
    </main>
  );
};

export default SignUpPage;

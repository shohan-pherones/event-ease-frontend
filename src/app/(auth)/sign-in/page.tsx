"use client";

import Processing from "@/components/Processing";
import { useLogin } from "@/hooks/api-requests/useLogin";
import useAuth from "@/hooks/useAuth";
import { ILogin } from "@/interfaces";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignInPage = () => {
  const [shouldPasswordVisible, setShouldPasswordVisible] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });
  const { mutate, isLoading } = useLogin();
  const router = useRouter();
  const { saveCredentialsDispatcher } = useAuth();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const onSubmit = (data: ILogin) => {
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
      <section className="min-h-[calc(100vh-4rem)] container mx-auto max-w-2xl px-5 md:px-10 py-10 md:py-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 justify-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold">
            Login to your account
          </h3>
          <p className="text-sm opacity-50">
            Access your account to enjoy personalized experiences, faster event
            creation, seamless registration, and access to exclusive perks.
            We&apos;re glad to have you back!
          </p>
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
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() =>
                router.push(
                  redirectPath
                    ? `/sign-up?redirect=${redirectPath}`
                    : "/sign-up"
                )
              }
              className="link link-hover font-bold"
            >
              Register
            </button>
          </p>
        </form>
      </section>
    </main>
  );
};

export default SignInPage;

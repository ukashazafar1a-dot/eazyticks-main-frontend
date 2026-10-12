"use client";
import React, { useCallback, useEffect, useState } from "react";
import LoadingSvg from "@/components/LoadingSvg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useApp from "@/context/useApp";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { getEventDetails } from "@/helpers/businessRequests";
import {  baseURL, normalizeResponse } from "@/lib/utils";
import fetchClient from "@/helpers/fetchClient";

const PasscodeModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [empty, setEmpty] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const slug = params?.slug;
  const searchParams = useSearchParams();
  const { setToaster } = useApp();

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);
    return params.toString();
  }, []);

  const handleSubmitSecret = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password.length < 3) {
        setEmpty(true);
        return;
      }
      setLoading(true);
      setError(false);
      setEmpty(false);
      let url = `/api/Event/Detail?slug=${slug}&secret=${password}`;
      const result = await fetchClient(`${url}`);
      //console.log(result);
      if (result && !result?.succeeded) {
        setToaster("error", result?.messages[0] || "Password Incorrect.");
        setError(true);
        setLoading(false);
      } else {
        //console.log(data);
        setError(false);
        router.push(pathname + "?" + createQueryString("sec", password));
        setSuccess(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChange = () => {
    router.back();
  };

  useEffect(() => {
    if (searchParams) {
      const secret = searchParams?.get("sec");
      if (secret) {
        setPassword(secret);
      }
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
      <Dialog open={true}>
        <DialogContent className="border-0 passcode-model md-max:h-auto">
          <DialogHeader>
            <DialogTitle>
              {" "}
              <h2 className="h3  mb-4">
                Enter the password to access this private event.
              </h2>
            </DialogTitle>
            <DialogDescription className="">
              <form className="mb-4" onSubmit={(e) => handleSubmitSecret(e)}>
                <div className="mb-3">
                  <label htmlFor="password" className="block">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      className="input--field"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off"
                      min={3}
                      required
                    />
                    <span
                      className="absolute right-0 bottom-[6px] me-2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <AiOutlineEye className="icon icon-eye" />
                      ) : (
                        <AiOutlineEyeInvisible className="icon icon-eye" />
                      )}
                    </span>
                  </div>
                </div>
                {error && (
                  <p className="error red py-2 text-green-500 font-medium">
                    Incorrect password. Try Again.
                  </p>
                )}
                {empty && (
                  <p className="error red py-2 text-green-500 font-medium">
                    Password is required.
                  </p>
                )}
                <button
                  className="btn btn--primary"
                  disabled={loading}
                >
                  <span className="">Enter</span>
                  {loading && (
                    <LoadingSvg classes="fill-white text-white ms-3" />
                  )}
                </button>
              </form>
              {success && (
                <p className="py-2 text-green-700">
                  Password is correct. Redirecting to event page...
                </p>
              )}
              <div className="contact">
                <h4 className="title">
                  If you don&lsquo;t have the password, please contact the event
                  organizer for assistance.
                </h4>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PasscodeModal;

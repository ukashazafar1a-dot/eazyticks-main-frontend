"use client";
import React, { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getUserProfile, updateUserProfile } from "@/helpers/businessRequests";
import { Profile } from "@/lib/types";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useApp from "@/context/useApp";
import UpdateUserImage from "./UpdateUserImage";
import SmallLoader from "@/components/loaders/SmallLoader";
import SubmitBtn from "@/components/SubmitBtn";

const schema = z.object({
  firstName: z.string().min(3, { message: "First name is required." }),
  lastName: z.string().min(3, { message: "Last name is required." }),
  email: z.string().email().min(1, { message: "Email is required." }),
  phoneNumber: z.string(),
  bio: z.string().min(3, { message: "Bio is required." }),
  address: z.string().min(3, { message: "Address is required." }),
});

type formType = z.infer<typeof schema>;
const UpdateName = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      bio: "",
      address: "",
    },
  });
  const { setToaster } = useApp();
  const [responseMessage, setResponseMessage] = useState({
    status: "success",
    message: "",
  });
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onSubmit = async (data: formType) => {
    try {
      const { data: response } = await updateUserProfile(data);
      if (response && response?.succeeded) {
        setToaster(
          "success",
          response?.messages[0] || "Profile updated successfully."
        );
      } else {
        setToaster("error", response?.messages[0] || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      setLoading(true);
      const { data: response } = await getUserProfile();
      if (response && response?.succeeded) {
        const { data } = response;
        setUser(data);
        const { firstName, lastName, phoneNumber, address, image, bio, email } =
          data;
        setValue("firstName", firstName ? firstName : "");
        setValue("lastName", lastName ? lastName : "");
        setValue("bio", bio ? bio : "");
        setValue("address", address ? address : "");
        setValue("email", email ? email : "");
        setValue("phoneNumber", phoneNumber ? phoneNumber : "");
        setLoading(false);
        setError(false);
      } else {
        setLoading(false);
        setError(true);
        return null;
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      return null;
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="max-w-screen-md me-auto">
      <div className="py-5">
        <div className="wrapper-form">
          <div className="wrapper-logo-heading">
            <h2 className="sm:text-3xl text-2xl font-bold mb-4 ">My Account</h2>
          </div>
          {loading ? (
            <SmallLoader />
          ) : (
            <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="main-content">
                {responseMessage?.message !== "" &&
                  (responseMessage?.status === "success" ? (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        {responseMessage?.message}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        {responseMessage?.message}
                      </AlertDescription>
                    </Alert>
                  ))}
                <div className="py-2">
                  <UpdateUserImage image={user?.image} />
                </div>
                <div className="flex items-center justify-start gap-2 mb-3 flex-col md:flex-row">
                  <div className="field full-name mb-2 basis-full w-full md:basis-1/2">
                    <label
                      htmlFor="first_name"
                      className="font-medium mb-1 input_label"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      {...register("firstName")}
                      placeholder="Enter your First Name"
                      className="input--field rounded-md"
                    />
                  </div>
                  
                  <div className="field full-name mb-2 basis-full w-full md:basis-1/2">
                    <label
                      htmlFor="last_name"
                      className="font-medium mb-1 input_label"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      placeholder="Enter Your Last Name"
                      className="input--field rounded-md"
                      {...register("lastName")}
                    />
                  </div>
                  
                </div>
                {errors?.firstName && (
                    <p className="py-2 text-red-400 font-medium">
                      {errors?.firstName?.message}
                    </p>
                  )}
                  {errors?.lastName && (
                    <p className="py-2 text-red-400 font-medium">
                      {errors?.lastName?.message}
                    </p>
                  )}
                <div className="flex items-center justify-start gap-2 mb-3 flex-col md:flex-row">
                  <div className="basis-full w-full md:basis-1/2">
                    <label
                      htmlFor="phone"
                      className="font-medium mb-1 input_label"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      placeholder="Enter Your phone"
                      className="input--field phone rounded-md"
                      {...register("phoneNumber")}
                    />
                  </div>
                  <div className="basis-full w-full md:basis-1/2">
                    <label
                      htmlFor="email"
                      className="font-medium mb-1 input_label"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter Your Last Name"
                      className="input--field email rounded-md"
                      {...register("email")}
                      disabled
                      readOnly
                    />
                  </div>
                </div>
                {errors?.email && (
                  <p className="py-2 text-red-400 font-medium">
                    {errors?.email?.message}
                  </p>
                )}
                {errors?.phoneNumber && (
                  <p className="py-2 text-red-400 font-medium">
                    {errors?.phoneNumber?.message}
                  </p>
                )}
                <div className="field mb-3">
                  <label htmlFor="bio" className="font-medium mb-1 input_label">
                    Bio
                  </label>
                  <input
                    type="text"
                    id="bio"
                    className="input--field rounded-md"
                    {...register("bio")}
                  />
                </div>
                {errors?.bio && (
                  <p className="py-2 text-red-400 font-medium">
                    {errors?.bio?.message}
                  </p>
                )}
                <div className="field mb-3">
                  <label
                    htmlFor="address"
                    className="font-medium mb-1 input_label"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="input--field rounded-md"
                    {...register("address")}
                  />
                </div>
                {errors?.address && (
                  <p className="py-2 text-red-400 font-medium">
                    {errors?.address?.message}
                  </p>
                )}
                <div className="field">
                  <SubmitBtn disabled={isSubmitting} loading={isSubmitting}>
                    Update
                  </SubmitBtn>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateName;

"use client";
import useApp from "@/context/useApp";
import { contactUs } from "@/helpers/businessRequests";
import { CaptchaKey } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import ReCaptcha from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "Name must contains atleast 3 characters"),
  email: z.string().email("Invalid Email must contain @ symbol"),
  subject: z.string().min(3, "Subject must contains atleast 3 characters"),
  message: z.string().min(30, "Message must contains atleast 30 characters"),
});

type formType = z.infer<typeof schema>;

const ContactUsForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  const captchaRef: any = useRef(null);
  const {setToaster} = useApp();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = async (values: formType) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSuccess(false);
    setIsError(false);
    if (!captchaRef?.current) return;
    const token = await captchaRef.current.executeAsync();
    captchaRef.current.reset();
    if (token) {
      try {
        const form = { ...values, token };
        const { data:response } = await contactUs(form);
        if(response && response?.succeeded){
          setIsSuccess(true);
          setToaster('success',response?.messages[0] || 'Message sent successfully.');
          reset();
        }else{
          setIsError(true);
          setToaster('error',response?.messages[0] || 'Something went wrong!');
        }
      } catch (error) {
        console.log(error)
        setIsError(true);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-2 md:mx-auto -mt-20 md:mb-40 mb-14 bg-gray-200 rounded-lg  relative px-4 py-8 shadow-2xl">
      <h3 className="text-center text-4xl font-bold text-gray-800 mb-8">
        Contact Us
      </h3>
      <div className="mb-3">
        {isSuccess && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            We have received your query. One of our representatives will be in
            contact with you AS
          </div>
        )}
        {isError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            Failed to submit your query. Please try again!
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
        <div className="flex flex-wrap gap-4 md:flex-nowrap md:flex-row flex-col">
          <div className="flex-1">
            <input
              type="text"
              {...register("name")}
              className="w-full px-4 md:py-5 py-3 md:text-xl text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your Name"
              required
            />
            {errors.name && (
              <div className="text-red-600 px-2 pt-2 text-base font-medium rounded">
                {errors?.name?.message}
              </div>
            )}
          </div>

          <div className="flex-1">
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 md:py-5 py-3 md:text-xl text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your Email"
              required
            />
            {errors.email && (
              <div className="text-red-600 px-2 pt-2 text-base font-medium rounded">
                {errors?.email?.message}
              </div>
            )}
          </div>
        </div>
        <div>
          <input
            type="text"
            {...register("subject")}
            className="w-full px-4 md:py-5 py-3 md:text-xl text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Subject"
            required
          />
          {errors.subject && (
            <div className="text-red-600 px-2 pt-2 text-base font-medium rounded">
              {errors?.subject?.message}
            </div>
          )}
        </div>

        <div>
          <textarea
            {...register("message")}
            className="w-full px-4 md:py-5 py-3 md:text-xl text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your message"
            rows={6}
          ></textarea>
          {errors.message && (
            <div className="text-red-600 px-2 pt-2 text-base font-medium rounded">
              {errors?.message?.message}
            </div>
          )}
        </div>

        <ReCaptcha
          sitekey={CaptchaKey}
          ref={captchaRef}
          size="invisible"
        />
        <div className="w-full">
          <button
            type="submit"
            className="w-full py-3 px-6 btn btn--primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUsForm;

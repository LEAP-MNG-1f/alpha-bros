"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FooterData } from "@/constant/mockdatas";

const ContactUs = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_koecf9r",
          "template_x2pdr6o",
          form.current,
          "9zEptgAYsNPwHVk06"
        )
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );

      router.push("/");
      toast("You have successfull emailed a message");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center  ">
      <div className="flex flex-col p-6 rounded-lg max-w-1/2 gap-4">
        {/* Contact Info Section */}
        <div className="flex-1  md:mb-0 md:pr-8 mt-20">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Хүн болгоны санал хүсэлт бидэнд үнэтэй
          </h1>
          <p className="text-gray-600 mb-6">
            Манай үйлчилгээг ашигласанд баярлалаа. Илүү сайжруулах болон санал
            хүсэлтээ бидэнд мэйлээр илгээнэ үү ?
          </p>
          <a
            href="mailto: lighthousemongol@gmail.com"
            className="text-blue-600 underline"
          >
            {FooterData.mail}
          </a>

          <ul className="space-y-3 text-gray-700">
            <li>
              <i className="fas fa-map-marker-alt"></i> {FooterData.address}
            </li>
            <li>
              <i className="fas fa-phone-alt"></i> {FooterData.phoneNumber}
            </li>
          </ul>
        </div>

        {/* Contact Form Section */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex-1 bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="user_name"
              className="block font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              placeholder="Enter your name"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="user_email"
              className="block font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              placeholder="Enter your email"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Your message"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 px-4 py-2"
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-SecondColor text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

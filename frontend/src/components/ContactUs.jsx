import React from "react";

const ContactUs = () => {
  return (
    <div id="contact" className="mt-10 px-6 md:px-10">
      {/* Added id="contact" */}
      <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
      <div className="flex flex-col md:flex-row items-center bg-white p-6 border border-gray-200 rounded-lg shadow-lg gap-6">
        {/* Left Side - Contact Info */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
          <h3 className="text-lg font-semibold">Get in Touch</h3>
          <p className="text-gray-600">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
          <p className="text-gray-800 font-medium">
            📍 Address: Gurrah Jattan, Kharian, Punjab, Pakistan
          </p>
          <p className="text-gray-800 font-medium">
            📞 Phone: +92 334 4012006{" "}
          </p>
          <p className="text-gray-800 font-medium">
            ✉ Email: shahzadaqeel008@gmail.com
          </p>
        </div>

        {/* Right Side - Contact Form */}
        <div className="w-full md:w-1/2">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

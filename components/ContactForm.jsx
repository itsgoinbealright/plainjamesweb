"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
    location: "",
    scope: [],
    preferredContact: "",
    phoneType: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleScopeToggle = (value) => {
    setFormData((prev) => ({
      ...prev,
      scope: prev.scope.includes(value)
        ? prev.scope.filter((s) => s !== value)
        : [...prev.scope, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          ...formData,
          scope: formData.scope.join(", "),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setFormData({
        email: "",
        phone: "",
        message: "",
        location: "",
        scope: [],
        preferredContact: "",
        phoneType: "",
      });
    } catch (error) {
      setStatus("error");
      console.error("Error:", error);
    }
  };

  const scopeOptions = [
    { value: "millwork", label: "Millwork" },
    { value: "carpentry", label: "Carpentry" },
    { value: "renovation", label: "Renovation" },
    { value: "kitchen", label: "Kitchen" },
    { value: "bathroom", label: "Bathroom" },
    { value: "furniture", label: "Furniture" },
    { value: "deck", label: "Deck" },
    { value: "sauna", label: "Sauna" },
    { value: "gazebo", label: "Gazebo" },
    { value: "pergola", label: "Pergola" },
    { value: "project-management", label: "Project Management" },
    { value: "design", label: "Design" },
  ];

  return (
    <section className="bg-white min-h-screen px-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left - Form */}
        <div>
          <h2 className="text-3xl font-bold mb-12">Project Enquiry</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email with preference */}
            <div className="flex items-end gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="flex-1 border-b border-gray-300 py-3 focus:border-forest-green focus:outline-none transition-colors bg-transparent"
              />
              <label className="flex items-center gap-2 cursor-pointer pb-3">
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  checked={formData.preferredContact === "email"}
                  onChange={handleChange}
                  className="w-4 h-4 accent-black"
                />
                <span className="text-sm text-gray-500">Preferred</span>
              </label>
            </div>

            {/* Phone with preference and call/text */}
            <div className="space-y-3">
              <div className="flex items-end gap-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="flex-1 border-b border-gray-300 py-3 focus:border-forest-green focus:outline-none transition-colors bg-transparent"
                />
                <label className="flex items-center gap-2 cursor-pointer pb-3">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="phone"
                    checked={formData.preferredContact === "phone"}
                    onChange={handleChange}
                    className="w-4 h-4 accent-black"
                  />
                  <span className="text-sm text-gray-500">Preferred</span>
                </label>
              </div>
              {formData.preferredContact === "phone" && (
                <div className="flex gap-4 pl-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="phoneType"
                      value="call"
                      checked={formData.phoneType === "call"}
                      onChange={handleChange}
                      className="w-4 h-4 accent-black"
                    />
                    <span className="text-sm">Call</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="phoneType"
                      value="text"
                      checked={formData.phoneType === "text"}
                      onChange={handleChange}
                      className="w-4 h-4 accent-black"
                    />
                    <span className="text-sm">Text</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="phoneType"
                      value="either"
                      checked={formData.phoneType === "either"}
                      onChange={handleChange}
                      className="w-4 h-4 accent-black"
                    />
                    <span className="text-sm">Either</span>
                  </label>
                </div>
              )}
            </div>

            <input
              type="text"
              name="location"
              placeholder="Project location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border-b border-gray-300 py-3 focus:border-forest-green focus:outline-none transition-colors bg-transparent"
            />

            <div className="pb-4">
              <p className="text-gray-500 mb-6">How can we help?</p>
              <div className="flex gap-2 py-2 flex-wrap">
                {scopeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleScopeToggle(option.value)}
                    className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                      formData.scope.includes(option.value)
                        ? "border-black bg-black text-white scale-105"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {formData.scope.length > 0 && (
                <p className="text-sm text-gray-400 mt-3">
                  {formData.scope.length} selected
                </p>
              )}
            </div>

            <textarea
              name="message"
              placeholder="Anything else we should know?"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="w-full border-b border-gray-300 py-3 focus:border-forest-green focus:outline-none transition-colors resize-none bg-transparent"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-black text-white px-8 py-3 font-medium hover:bg-forest-green transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Submit"}
            </button>

            {status === "success" && (
              <p className="text-forest-green">
                Thank you! We'll be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>

        {/* Right - Image */}
        <div className="hidden lg:block relative min-h-[600px]">
          <Image
            src="/images/contact-image.jpg"
            alt="Plain James craftsmanship"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

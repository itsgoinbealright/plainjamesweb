"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
    commencementDate: "",
    budget: "",
    location: "",
    hearAbout: "",
    architect: "",
    designStage: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setFormData({
        email: "",
        phone: "",
        message: "",
        commencementDate: "",
        budget: "",
        location: "",
        hearAbout: "",
        architect: "",
        designStage: "",
      });
    } catch (error) {
      setStatus("error");
      console.error("Error:", error);
    }
  };

  return (
    <section className="p-3 bg-white">
      <div className="p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Project Enquiry</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 py-3 focus:border-forest-green focus:outline-none transition-colors"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 py-3 focus:border-forest-green focus:outline-none transition-colors"
              />

              <textarea
                name="message"
                placeholder="Tell us a bit about yourself and your project?"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full border-b border-gray-300 py-3 focus:border-forest-green focus:outline-none transition-colors resize-none"
              />

              <input
                type="text"
                name="commencementDate"
                placeholder="Target commencement date"
                value={formData.commencementDate}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-3 focus:border-forest-green focus:outline-none transition-colors"
              />

              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-3 focus:border-forest-green focus:outline-none transition-colors bg-transparent text-gray-500"
              >
                <option value="">Estimated budget</option>
                <option value="<50k">Less than $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="100k-250k">$100,000 - $250,000</option>
                <option value="250k+">$250,000+</option>
              </select>

              <input
                type="text"
                name="location"
                placeholder="Project location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-3 focus:border-forest-green focus:outline-none transition-colors"
              />

              <select
                name="hearAbout"
                value={formData.hearAbout}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-3 focus:border-forest-green focus:outline-none transition-colors bg-transparent text-gray-500"
              >
                <option value="">How did you hear about us?</option>
                <option value="google">Google</option>
                <option value="referral">Referral</option>
                <option value="social">Social Media</option>
                <option value="other">Other</option>
              </select>

              <select
                name="architect"
                value={formData.architect}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-3 focus:border-forest-green focus:outline-none transition-colors bg-transparent text-gray-500"
              >
                <option value="">
                  Is there an Architect involved in the project?
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="not-yet">Not Yet</option>
              </select>

              <select
                name="designStage"
                value={formData.designStage}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-3 focus:border-forest-green focus:outline-none transition-colors bg-transparent text-gray-500"
              >
                <option value="">What stage of design are you at?</option>
                <option value="concept">Concept</option>
                <option value="design-dev">Design Development</option>
                <option value="construction-docs">
                  Construction Documents
                </option>
                <option value="ready">Ready to Build</option>
              </select>

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

          {/* Right Column - Image */}
          <div className="h-full min-h-[600px] relative">
            <Image
              src="/images/contact-construction.jpg"
              alt="Construction site"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

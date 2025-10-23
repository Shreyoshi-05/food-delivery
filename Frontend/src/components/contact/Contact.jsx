import React, { useState } from "react";
import "./Contact.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import {toast} from 'react-hot-toast'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handelFormData(e) {
    console.log(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_FORM_TOKEN,
          ...formData
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact">
      <div className="contact-container">
        <div className="contact-info">
          <h2>
            Contact <span>Tomato</span>
          </h2>
          <p>
            Have a question, suggestion, or partnership idea? We’d love to hear
            from you! Our team is always ready to help you with your orders,
            feedback, or business inquiries.
          </p>

          <div className="info-items">
            <div className="info-box">
              <FaPhoneAlt className="icon" />
              <div>
                <h4>Phone</h4>
                <p>+91 99944 35553</p>
              </div>
            </div>

            <div className="info-box">
              <FaEnvelope className="icon" />
              <div>
                <h4>Email</h4>
                <p>support@Tomato.com</p>
              </div>
            </div>

            <div className="info-box">
              <FaMapMarkerAlt className="icon" />
              <div>
                <h4>Address</h4>
                <p>123 Food Street, Kolkata, India</p>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Contact Us</h3>
          <input
            type="text"
            value={formData.name}
            onChange={handelFormData}
            placeholder="Your Name"
            name="name"
            required
          />
          <input
            type="email"
            value={formData.email}
            onChange={handelFormData}
            placeholder="Your Email"
            name="email"
            required
          />
          <textarea
            rows="5"
            value={formData.message}
            onChange={handelFormData}
            placeholder="Your Message"
            name="message"
            required
          ></textarea>
          <button type="submit">
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

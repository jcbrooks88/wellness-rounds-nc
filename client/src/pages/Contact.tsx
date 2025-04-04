import React, { useState } from "react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" }); // Reset form after submission
  };

  return (
    <div style={containerStyle}>
      <h2>Contact Us</h2>
      <p>We’d love to hear from you! Fill out the form below to get in touch.</p>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          style={textareaStyle}
        />
        <button type="submit" style={buttonStyle}>Send Message</button>
      </form>
    </div>
  );
};

const containerStyle = {
  textAlign: "center" as const,
  maxWidth: "500px",
  margin: "0 auto",
  padding: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "10px",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  width: "100%",
};

const textareaStyle = {
  ...inputStyle,
  height: "100px",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export default Contact;

import React from "react";
import {
  FaCalendarCheck,
  FaHeadset,
  FaShieldHalved,
  FaStar,
  FaStethoscope,
  FaUserDoctor,
  FaUsers,
  FaVideo,
} from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import Slides from "./Slides";
import Category from "./Specialization";
import Section1 from "./Section1";
import Footer from "./Footer";
import CustomerNavbar from "./CustomerNavbar";
import "./Home.css";

const stats = [
  { label: "Verified Doctors", value: "120+", icon: <FaUserDoctor /> },
  { label: "Patients Served", value: "18k+", icon: <FaUsers /> },
  { label: "Specializations", value: "30+", icon: <FaStethoscope /> },
  { label: "Appointments Completed", value: "45k+", icon: <FaCalendarCheck /> },
];

const features = [
  {
    title: "Experienced Doctors",
    text: "Connect with trusted medical professionals across major specialties.",
    icon: <FaUserDoctor />,
  },
  {
    title: "Secure Booking",
    text: "Book appointments with protected patient details and clear records.",
    icon: <FaShieldHalved />,
  },
  {
    title: "Online Consultation",
    text: "Choose convenient care options for in-clinic and remote consultations.",
    icon: <FaVideo />,
  },
  {
    title: "24/7 Support",
    text: "Get help with bookings, schedules, and appointment updates anytime.",
    icon: <FaHeadset />,
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Patient",
    review:
      "DocSlot helped me find a specialist and book a same-day appointment without calling multiple clinics.",
  },
  {
    name: "Rahul Mehta",
    role: "Patient",
    review:
      "The appointment flow is simple, fast, and reliable. I could track my visits from one place.",
  },
  {
    name: "Ananya Rao",
    role: "Patient",
    review:
      "Clean experience, helpful doctor details, and no waiting-room confusion. It feels built for real patients.",
  },
];

const faqs = [
  {
    question: "Can I book an appointment without calling the clinic?",
    answer:
      "Yes. Select a specialization, choose a doctor, and confirm your preferred appointment slot online.",
  },
  {
    question: "Where can I see my booked appointments?",
    answer:
      "Use the Appointments link in the navbar after signing in to view your upcoming and previous bookings.",
  },
  {
    question: "Is DocSlot only for patients?",
    answer:
      "No. The system also supports admin, doctor, and receptionist workflows for managing appointments.",
  },
];

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="home-section-header">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  return (
    <div className="home-page">
      <CustomerNavbar />
      <main>
        <Slides />

        <section className="stats-section" aria-label="DocSlot platform statistics">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat) => (
                <article className="stat-card" key={stat.label}>
                  <div className="stat-icon">{stat.icon}</div>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="specialization-section" id="specializations">
          <div className="container">
            <SectionHeader
              eyebrow="Find Care Faster"
              title="Browse by specialization"
              description="Start with the care category you need and discover available doctors in just a few clicks."
            />
            <Category />
          </div>
        </section>

        <Section1 />

        <section className="why-section">
          <div className="container">
            <SectionHeader
              eyebrow="Why DocSlot"
              title="A smoother healthcare experience"
              description="Purpose-built appointment workflows for patients, doctors, receptionists, and admins."
            />
            <div className="feature-grid">
              {features.map((feature) => (
                <article className="feature-card" key={feature.title}>
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonial-section">
          <div className="container">
            <SectionHeader
              eyebrow="Patient Stories"
              title="Trusted by people who value their time"
              description="Simple appointment discovery, secure booking, and clear communication from start to finish."
            />
            <div className="testimonial-grid">
              {testimonials.map((testimonial) => (
                <article className="testimonial-card" key={testimonial.name}>
                  <div className="rating" aria-label="5 star rating">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} />
                    ))}
                  </div>
                  <p>{testimonial.review}</p>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="container">
            <SectionHeader
              eyebrow="Need Help"
              title="Frequently asked questions"
              description="Quick answers to common appointment and account questions."
            />
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details className="faq-item" key={faq.question} open={index === 0}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
            <div className="faq-action">
              <NavLink className="btn btn-gradient" to="/contact">
                View All FAQs
              </NavLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;

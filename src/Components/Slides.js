import React from "react";
import { ToastContainer } from "react-toastify";
import { Typewriter } from "react-simple-typewriter";
import "react-toastify/dist/ReactToastify.css";
import "./Slides.css";

function Slides() {
  return (
    <div className="slides-container">
      <ToastContainer />

      {/* Background Image */}
      <img
        src="/assests/img6.jpg"
        alt="Banner"
        className="slides-bg-image"
      />

      {/* Doctor Image */}
      <img
        src="/assests/heroImg.png"
        alt="Doctor"
        className="slides-doctor-img"
      />

      {/* Text Area */}
      <div className="slides-text-wrapper">
        <div className="slides-text-content">
          <h1 className="slides-heading">Welcome to DocSlot</h1>
          <h2 className="slides-subheading">
            <Typewriter
              words={[
                "Book your appointment with trusted doctors — anytime, anywhere.",
                "Real-time doctor availability and secure scheduling.",
                "Hassle-free appointment booking for patients & doctors.",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={40}
              deleteSpeed={30}
              delaySpeed={2000}
            />
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Slides;

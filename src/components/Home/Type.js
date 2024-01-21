import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Full Stack Developer",
          "Backend Engineer",
          "NMERN Stack Expert",
          "Machine Learning Engineer",
          "Data Science Engineer",
          "Cyber Security Enthusiast"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;

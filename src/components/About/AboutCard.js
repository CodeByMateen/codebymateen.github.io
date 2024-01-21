import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Mateen Shahzad </span>
            from <span className="purple"> Lahore, Pakistan.</span>
            <br />I am a Full Stack Web Developer @<span className="purple">educist</span>
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Exploring new Technologies and learning them
            </li>
            <li className="about-activity">
              <ImPointRight /> Watching Movies
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "To fulfill your will, embrace the unconventional and defy the odds!"{" "}
          </p>
          <footer className="blockquote-footer">Mateen</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;

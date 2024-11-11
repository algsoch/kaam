import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [projects, setProjects] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactResponse, setContactResponse] = useState("");

  useEffect(() => {
    // Fetch Projects
    axios
      .get("/api/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/contact", contactInfo)
      .then((response) => setContactResponse("Message sent successfully"))
      .catch((error) => setContactResponse("Error sending message"));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Vicky Kumar's Portfolio</h1>
      </header>

      <section>
        <h2>My Projects</h2>
        <div className="projects-container">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <img src={project.image} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Contact Me</h2>
        <form onSubmit={handleContactSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={contactInfo.name}
            onChange={handleContactChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={contactInfo.email}
            onChange={handleContactChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={contactInfo.message}
            onChange={handleContactChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>
        {contactResponse && <p>{contactResponse}</p>}
      </section>
    </div>
  );
}

export default App;

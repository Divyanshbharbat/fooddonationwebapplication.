import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #fdfbfb, #ebedee)',
        color: '#333',
        paddingBottom: '50px',
      }}
    >
      {/* Header Section */}
      <section
        className="text-center text-white py-5"
        style={{
          background: 'linear-gradient(135deg, #11998e, #38ef7d)',
        }}
      >
        <div className="container" data-aos="fade-down">
          <h1 className="display-4 fw-bold">About FoodDonate</h1>
          <p className="lead mt-3">
            Together, we fight hunger and reduce food waste.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="container py-5">
        <div className="row align-items-center" data-aos="fade-right">
          <div className="col-md-6">
            <img
              src="https://cdn.leonardo.ai/users/8b49d567-5c2e-49dc-9bc4-d236e559f380/generations/2ee35e93-a6c3-4abb-9b7c-d7153c200933/Leonardo_Phoenix_10_Vibrant_highquality_images_showcasing_vari_2.jpg"
              alt="Helping people"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold">Our Mission</h2>
            <p className="fs-5">
              At FoodDonate, we believe that no food should be wasted while someone
              goes to sleep hungry. Our mission is to bridge the gap between surplus food
              and hungry stomachs by creating a seamless donation platform.
            </p>
            <h2 className="fw-bold mt-4">Our Vision</h2>
            <p className="fs-5">
              A world where hunger is history and sharing food is a norm.
              We aim to empower individuals and organizations to take action
              against food insecurity.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-5 bg-light text-center" data-aos="fade-up">
        <div className="container">
          <h2 className="fw-bold mb-4">Our Impact</h2>
          <div className="row">
            <div className="col-md-3">
              <h3 className="fw-bold">10K+</h3>
              <p>Meals Donated</p>
            </div>
            <div className="col-md-3">
              <h3 className="fw-bold">500+</h3>
              <p>Volunteers</p>
            </div>
            <div className="col-md-3">
              <h3 className="fw-bold">120+</h3>
              <p>Food Drives</p>
            </div>
            <div className="col-md-3">
              <h3 className="fw-bold">50+</h3>
              <p>Partner NGOs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Highlight */}
      <section className="container py-5" data-aos="fade-left">
        <div className="row align-items-center">
          <div className="col-md-6 order-md-2">
            <img
              src="https://cdn.leonardo.ai/users/8b49d567-5c2e-49dc-9bc4-d236e559f380/generations/9edcf1c1-19c2-4089-9f1a-28b8c534149d/Leonardo_Phoenix_10_depict_a_warm_and_smiling_volunteer_likely_0.jpg?w=512"
              alt="Volunteer"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6 order-md-1">
            <h2 className="fw-bold">Meet Our Volunteers</h2>
            <p className="fs-5">
              Behind every successful donation is a passionate volunteer making it happen.
              Our community of volunteers ensures that food reaches the right people at the right time.
            </p>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section
        className="text-center py-5 text-white"
        style={{
          background: 'linear-gradient(to right, #38ef7d, #11998e)',
        }}
        data-aos="zoom-in"
      >
        <div className="container">
          <h2 className="fw-bold">Want to Help?</h2>
          <p className="lead">
            Join us in our mission to end hunger and promote sustainability.
          </p>
          <a href="/donate" className="btn btn-light fw-bold px-4 mt-3">
            Become a Donor
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;

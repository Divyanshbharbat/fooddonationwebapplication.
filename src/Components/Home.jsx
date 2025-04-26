import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [availableDonations, setAvailableDonations] = useState([]);
  const navigate = useNavigate();
  const handleDonateClick = () => {
    const token = localStorage.getItem("cookie");
    console.log(token)
    if (token) {
      navigate("/donate");
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP}/available`)
      .then((res) => {
        setAvailableDonations(res.data.foodList); // ✅ Fix applied here
      })
      .catch((err) => {
        console.error('Error fetching available donations:', err);
      });
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
      minHeight: '100vh',
      paddingBottom: '40px'
    }}>
      {/* Hero Section */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="fw-bold">Donate Food, Spread Smiles</h1>
            <p className="lead">
              Your extra meal can be someone’s only meal today. Join our community and be a reason someone smiles. 💚
            </p>
            <ul>
              <li>✅ Reduce food waste and environmental impact</li>
              <li>✅ Empower local communities and shelters</li>
              <li>✅ Be part of a meaningful cause and social change</li>
            </ul>
            <button className="btn btn-success mt-3" onClick={handleDonateClick}>
              Start Donating
            </button>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="https://cdn.leonardo.ai/users/8b49d567-5c2e-49dc-9bc4-d236e559f380/generations/08c8b706-74ae-4375-ae29-8a0c727a6a7e/Leonardo_Phoenix_10_Vibrant_highquality_images_showcasing_vari_0.jpg"
              alt="Food Donation"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-5 text-center bg-white">
        <div className="container">
          <h2 className="fw-bold mb-4">Our Mission</h2>
          <p className="fs-5">
            Our mission is to eradicate hunger and food insecurity by creating a simple platform that connects donors with organizations and individuals in need.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">How It Works</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 bg-light rounded shadow">
                <h4>1. Sign Up</h4>
                <p>Create your donor profile and become a part of our hunger-free revolution.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-light rounded shadow">
                <h4>2. Fill Donation Details</h4>
                <p>Share what food you have, the quantity, and location through a simple form.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-light rounded shadow">
                <h4>3. We Connect the Dots</h4>
                <p>Our system alerts nearby seekers and volunteers who pick and distribute the food.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">What People Are Saying</h2>
          <div className="row">
            <div className="col-md-4">
              <blockquote className="blockquote">
                <p>"I never thought donating food could be this easy. This platform is a blessing."</p>
                <footer className="blockquote-footer">Riya Sharma</footer>
              </blockquote>
            </div>
            <div className="col-md-4">
              <blockquote className="blockquote">
                <p>"It brings so much satisfaction knowing your leftovers are feeding someone."</p>
                <footer className="blockquote-footer">Amit Verma</footer>
              </blockquote>
            </div>
            <div className="col-md-4">
              <blockquote className="blockquote">
                <p>"The transparency and ease of use really make it stand out!"</p>
                <footer className="blockquote-footer">Nisha Kapoor</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 text-black bg-white">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">Available Food Information</h2>
          {availableDonations.length === 0 ? (
            <p className="text-center text-muted">Not Available</p>
          ) : (
            <div className="row text-black">
              {availableDonations.map((donation, idx) => (
                <div key={idx} className="col-md-4 mb-4">
                  <div className="card shadow-sm h-100 border-success">
                    <div style={{
                             background: 'linear-gradient(90deg,rgb(10, 230, 94) 0%,rgb(18, 111, 104) 100%)',



                      transition: 'transform 0.3s ease',
                    }} className="card-body">
                      <h5 className="card-title text-white"> <span className='text-black'>Food Items:</span> {donation.product}</h5>
                      <p><strong>Quantity:</strong><span className='text-white'>  {donation.quantity}</span></p>
                      <p><strong>Location:</strong> <span className='text-white'>{donation.address}</span></p>
                      <p><strong>Starting At:</strong> <span className='text-white'>{donation.time ? new Date(donation.time).toLocaleString() : 'N/A'}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">FAQs</h2>
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                  Is the donation process safe?
                </button>
              </h2>
              <div id="faq1" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  Yes, we follow hygiene and safety guidelines to ensure that food donations are safe and reliable.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                  Can I donate if I have only a small quantity?
                </button>
              </h2>
              <div id="faq2" className="accordion-collapse collapse">
                <div className="accordion-body">
                  Absolutely! Every contribution counts — even a single meal can make a huge difference to someone.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 text-center bg-light">
        <div className="container">
          <h2 className="fw-bold mb-3">Our Impact</h2>
          <div className="row">
            <div className="col-md-4">
              <h3 className="text-success">🍛 5,210+</h3>
              <p>Meals Donated</p>
            </div>
            <div className="col-md-4">
              <h3 className="text-primary">👥 3,000+</h3>
              <p>People Helped</p>
            </div>
            <div className="col-md-4">
              <h3 className="text-warning">🏙️ 15+</h3>
              <p>Communities Reached</p>
            </div>
          </div>
        </div>
      </section>




      {/* Available Food Requests */}

      <section className="py-5 text-white text-center" style={{ background: '#11998e' }}>
        <div className="container">
          <h2 className="fw-bold">Every Meal Matters 🍽️</h2>
          <p className="fs-5">Join hands with us in building a hunger-free society.</p>
          <button className="btn btn-outline-light mt-2" onClick={handleDonateClick}>
            Donate Now
          </button>
        </div>
      </section>
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Become a Volunteer 🤝</h2>
          <p className="fs-5">Help pick up and deliver food, support events, or spread awareness. Let’s make a change together!</p>
          <button className="btn btn-primary mt-2" onClick={() => navigate("/volunteer")}>Join as Volunteer</button>
        </div>
      </section>
    </div>
  );
};

export default Home;

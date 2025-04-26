import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'Donors', value: 400 },
  { name: 'Receivers', value: 300 },
  { name: 'NGOs', value: 300 },
  { name: 'Food Saved (kg)', value: 200 }
];

const COLORS = ['#38ef7d', '#11998e', '#00c9a7', '#3ad59f'];

const Landing = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const headingStyle = {
    background: 'linear-gradient(to right, #11998e, #38ef7d)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: '700'
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e0f9f1, #ffffff)',
        fontFamily: 'Poppins, sans-serif',
        color: '#222',
        overflowX: 'hidden'
      }}
    >
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start" data-aos="fade-right">
            <h1 className="display-4 mb-3" style={headingStyle}>
              Welcome to FoodDonate
            </h1>
            <p className="lead mb-4" style={{ color: '#333' }}>
              A smart platform for food donations. Connect, contribute, and create change in your community.
            </p>
            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
              <NavLink to="/login" className="btn btn-success btn-lg px-4 shadow-sm">Login</NavLink>
              <NavLink to="/signup" className="btn btn-outline-success btn-lg px-4 shadow-sm">Signup</NavLink>
              <NavLink to="/adminlogin" className="btn btn-dark btn-lg px-4 shadow-sm">Admin Login</NavLink>
            </div>
          </div>

          <div className="col-md-6 mt-5 mt-md-0 text-center" data-aos="fade-left">
            <img
              src="https://cdn.leonardo.ai/users/8b49d567-5c2e-49dc-9bc4-d236e559f380/generations/d6eb2300-d7aa-4434-8ae5-fe468c7d6210/Leonardo_Phoenix_10_A_vibrant_and_heartwarming_landing_page_im_2.jpg"
              alt="landing visual"
              className="img-fluid rounded-4 shadow"
              style={{ maxHeight: '500px' }}
            />
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="row text-center mt-5" data-aos="fade-up">
          <h2 className="mb-4" style={headingStyle}>Why Choose Us?</h2>
          {['Fast & Easy', 'Verified Receivers', 'Community Impact'].map((title, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="p-4 rounded-4 shadow" style={{
                background: '#ffffff',
                border: '1px solid #d2f4e2',
                color: '#333'
              }}>
                <h4 className="fw-bold text-success">{title}</h4>
                <p className="mb-0">{
                  title === 'Fast & Easy' ? 'Donate food quickly with just a few clicks. Your extra can be someone\'s enough.' :
                  title === 'Verified Receivers' ? 'Ensure your donations reach genuine people and NGOs in need.' :
                  'Every donation counts! Help reduce food waste and build a better world.'
                }</p>
              </div>
            </div>
          ))}
        </div>

        {/* Track Donations */}
        <div className="row mt-5 align-items-center" data-aos="fade-up">
          <div className="col-md-6 text-center text-md-start">
            <h3 className="fw-bold mb-3" style={headingStyle}>Track Your Donations</h3>
            <p style={{ color: '#333' }}>
              With our intuitive dashboard, keep tabs on your past and ongoing food contributions. Your impact is measurable.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="https://cdn.leonardo.ai/users/8b49d567-5c2e-49dc-9bc4-d236e559f380/generations/f82cb0d3-4985-408c-aa1f-8a2cf1fc986e/Leonardo_Phoenix_10_A_vibrant_and_heartwarming_scene_depicting_1.jpg"
              alt="Track Donation"
              className="img-fluid rounded-4 shadow"
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>

        {/* Make a Difference */}
        <div className="row mt-5 align-items-center" data-aos="fade-up">
          <div className="col-md-6 text-center">
            <img
              src="https://cdn.leonardo.ai/users/8b49d567-5c2e-49dc-9bc4-d236e559f380/generations/d6eb2300-d7aa-4434-8ae5-fe468c7d6210/Leonardo_Phoenix_10_A_vibrant_and_heartwarming_landing_page_im_0.jpg"
              alt="Make a Difference"
              className="img-fluid rounded-4 shadow"
              style={{ maxHeight: '400px' }}
            />
          </div>
          <div className="col-md-6 text-center text-md-start">
            <h3 className="fw-bold mb-3" style={headingStyle}>Make A Real Difference</h3>
            <p style={{ color: '#333' }}>
              Join thousands of donors making an impact daily. Whether it's a leftover meal or extra groceries, your action matters.
            </p>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className="row mt-5" data-aos="fade-up">
          <div className="col-md-6 text-center text-md-start">
            <h3 className="fw-bold mb-3" style={headingStyle}>Our Platform In Numbers</h3>
            <p style={{ color: '#333' }}>Get an overview of the impact we’ve made together.</p>
          </div>
          <div className="col-md-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Call to Action */}
        <div className="row mt-5 text-center" data-aos="fade-up">
          <h2 className="mb-3" style={headingStyle}>Be The Change</h2>
          <p className="mb-4" style={{ color: '#444' }}>Start your journey with FoodDonate today.</p>
          <div className="d-flex gap-4 justify-content-center">
            <NavLink to="/signup" className="btn btn-success btn-lg px-5">Join Us</NavLink>
            <NavLink to="/login" className="btn btn-outline-success btn-lg px-5">Get Started</NavLink>
            <NavLink to="/adminlogin" className="btn btn-dark btn-lg px-5">Admin</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {toast,Toaster} from 'react-hot-toast'
const FoodDonationInfo = () => {
  let navigate=useNavigate()
  const [formData, setFormData] = useState({
    product: '',
    quantity: '',
    address: '',
    time: ''
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
useEffect(()=>{
 let y= localStorage.getItem("cookie")
  if(!y){
    navigate("/login")
  }
},[])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.product || !formData.quantity || !formData.address || !formData.time) {
      alert("Please fill all fields");
      return;
    }

    const token = localStorage.getItem('cookie');
if(!token){
 
  navigate("/login")

}

    try {
      
      await axios.post(`${import.meta.env.VITE_APP}/ppp`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      toast.success("Donation submitted successfully!");
      setFormData({ product: '', quantity: '', address: '', time: '' });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #a1c4fd, #c2e9fb)',
        minHeight: '100vh',
        padding: '60px 0',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <div className="container">
        <Toaster/>
        <div
          className="row align-items-center shadow rounded-4 p-4 bg-white"
          style={{ backdropFilter: 'blur(10px)' }}
          data-aos="fade-up"
        >
          {/* Form Column */}
          <div className="col-md-6 mb-4">
            <h2 className="mb-4 text-dark fw-bold">Donate Food</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Product</label>
                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., Rice, Bread"
                  style={{ backgroundColor: '#f0f8ff' }}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Quantity</label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., 5 kg"
                  style={{ backgroundColor: '#f0f8ff' }}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter pickup address"
                  rows="3"
                  style={{ backgroundColor: '#f0f8ff' }}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Preferred Time</label>
                <input
                  type="datetime-local"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-control"
                  style={{ backgroundColor: '#f0f8ff' }}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn w-100 text-white fw-bold"
                style={{
                  background: 'linear-gradient(to right, #36d1dc, #5b86e5)',
                  border: 'none'
                }}
              >
                Submit Donation
              </button>
            </form>

            <div className="mt-4 text-center">
              <NavLink
                to="/history"
                className="btn btn-outline-dark px-4 fw-semibold"
              >
                View Donation History
              </NavLink>
            </div>
          </div>

          {/* Image Column */}
          <div className="col-md-6 text-center" data-aos="fade-left">
            <img
              src="https://images.unsplash.com/photo-1606787366850-de6330128bfc"
              alt="Food Donation"
              className="img-fluid rounded-4 shadow"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDonationInfo;

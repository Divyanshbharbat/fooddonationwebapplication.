import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './Adminpage.css';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [availableForm, setAvailableForm] = useState({
    product: '',
    quantity: '',
    address: '',
    time: ''
  });
  const navigate = useNavigate()
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP}/admin/users`);
      setUsers(res.data.users);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleAccept = async (donationId, username) => {
    try {

      let r = await axios.put(`${import.meta.env.VITE_APP}/admin/accept/${donationId}/${username}`)
      toast.success(r.data.message)
      fetchUsers();
    } catch (err) {
      console.error('Error accepting donation:', err);
    }
  };

  const handleReject = async (donationId) => {
    try {
      let t = await axios.put(`${import.meta.env.VITE_APP}/admin/reject/${donationId}`);
      toast.error('Donation request rejected');
      fetchUsers();
    } catch (err) {
      console.error('Error rejecting donation:', err);
    }
  };
  const handleDelete = async () => {
    if (!name) return alert("Please enter a name");
    try {
      const res = await axios.delete(`${import.meta.env.VITE_APP}/user/name/${name}`);
      toast.success(`User "${name}" deleted successfully`);
      console.log(res.data);
      setName("");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("User not found or error occurred");
    }
  };
  const [name, setName] = useState("");
  const handleAvailableChange = (e) => {
    setAvailableForm({ ...availableForm, [e.target.name]: e.target.value });
  };

  const handleAddAvailableFood = async (e) => {
    e.preventDefault();
    let cookie2 = localStorage.getItem("cookie2")
    if (!cookie2) {
      toast.error("Login First")
      return navigate('/adminlogin');
    }
    try {

      await axios.post(`${import.meta.env.VITE_APP}/admin/available`, availableForm);
      toast.success('Food info added successfully');
      setAvailableForm({ product: '', quantity: '', address: '', time: '' });
    } catch (error) {
      console.error('Failed to add available food:', error);
    }
  };
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP}/contact`);
        setContacts(res.data);// Render this in your component
      } catch (err) {
        console.error('Failed to fetch contact messages:', err);
      }
    };

    fetchMessages();
  }, []);
  const usernames = users.map(user => user.username);
  const donationCounts = users.map(user => user.donationInfo.length);

  // Pie Chart for Total Donations per User (by quantity)
  const donationTotals = users.map(user => {
    return user.donationInfo.reduce((sum, donation) => {
      const qty = parseInt(donation.quantity) || 0;
      return sum + qty;
    }, 0);
  });

  const renderRequestsByStatus = (status) => (
    <div className="request-status-section">
      <h3>{status.toUpperCase()} Requests</h3>
      <div className="request-grid">
        {users.map(user =>
          user.donationInfo
            .filter(donation => donation.status === status)
            .map((donation) => (
              <div key={donation._id} className={`request-card ${status}`}>
                <div className="request-header">
                  <h4>{user.username}</h4>
                  <span>{user.email}</span>
                </div>
                <div className="request-body">
                  <p><strong>Product:</strong> {donation.product}</p>
                  <p><strong>Quantity:</strong> {donation.quantity}</p>
                  <p><strong>Address:</strong> {donation.address}</p>
                  <p><strong>Time:</strong> {new Date(donation.time).toLocaleString()}</p>
                  <p><strong>Status:</strong>
                    <span className={`status-badge ${donation.status}`}>{donation.status}</span>
                  </p>
                  {donation.status === 'pending' && (
                    <>
                      <button className="accept-btn" onClick={() => handleAccept(donation._id, user.username)}>
                        Accept Request
                      </button>
                      <button className="accept-btn bg-danger mx-1" onClick={() => handleReject(donation._id)}>
                        Reject Request
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );


  return (
    <div className="admin-page-wrapper">
      <h2 className="dashboard-title">🌤️ Admin Dashboard</h2>
      <Toaster />
      {/* Pie Chart: User Requests Count */}
      <div className="chart-container">
        <Plot
          data={[
            {
              type: 'pie',
              labels: usernames,
              values: donationCounts,
              textinfo: 'label+percent',
              hoverinfo: 'label+value',
              marker: {
                colors: ['#8e44ad', '#2ecc71', '#e74c3c', '#f39c12', '#1abc9c',
                  '#2980b9', '#d35400', '#34495e', '#16a085', '#c0392b']
              },
            },
          ]}
          layout={{
            title: 'User Donation Requests Distribution',
            height: 400,
            width: 500,
            paper_bgcolor: 'rgba(0,0,0,0)',
            font: { color: '#000' }
          }}
        />
      </div>

      {/* Pie Chart: Total Donation Quantity */}


      {/* Animated Form */}
      <div className="available-form-wrapper card-animated">
        <h3 className="form-title">🍽️ Add Available Food</h3>
        <form onSubmit={handleAddAvailableFood} className="available-form">
          <input
            type="text"
            name="product"
            value={availableForm.product}
            onChange={handleAvailableChange}
            placeholder="Enter food name"
            required
          />
          <input
            type="text"
            name="quantity"
            value={availableForm.quantity}
            onChange={handleAvailableChange}
            placeholder="Enter quantity"
            required
          />
          <textarea
            name="address"
            value={availableForm.address}
            onChange={handleAvailableChange}
            placeholder="Enter location"
            required
          />
          <input
            placeholder='Starting Time'
            type="datetime-local"
            name="time"
            value={availableForm.time}
            onChange={handleAvailableChange}
            required
          />
          <button type="submit" className="animated-submit">➕ Add Food</button>
        </form>
      </div>
      <div className="container mt-5 text-center">
        <h4>Delete User by Name</h4>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter user's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ maxWidth: "400px", margin: "0 auto" }}
        />
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete User
        </button>
      </div>
      <div className="container py-5" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
        <h2 className="text-center fw-bold mb-5">📬 Contact Messages</h2>
        <div className="row">
          {contacts.length === 0 ? (
            <p className="text-center text-muted">No contact messages found.</p>
          ) : (
            contacts.map((contact) => (
              <div key={contact._id} className="col-md-6 col-lg-4 mb-4">
                <div
                  className="card h-100 text-white"
                  style={{
                    background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
                    borderRadius: '20px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                    padding: '20px',
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{contact.name}</h5>
                    <h6 className="card-subtitle mb-2">{contact.email}</h6>
                    <p className="mb-2"><strong>Subject:</strong> {contact.subject}</p>
                    <label htmlFor={`msg-${contact._id}`} className="fw-semibold">Message:</label>
                    <textarea
                      id={`msg-${contact._id}`}
                      className="form-control mt-1 mb-3"
                      value={contact.message}
                      readOnly
                      style={{
                        backgroundColor: '#e8f5e9',
                        border: 'none',
                        borderRadius: '10px',
                        resize: 'none',
                        height: '100px',
                        color: '#2E7D32',
                        fontWeight: '500',
                      }}
                    />
                    <small className="text-light">
                      ⏱ {new Date(contact.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Requests */}
      {renderRequestsByStatus('pending')}
      {renderRequestsByStatus('accepted')}
      {renderRequestsByStatus('rejected')}
    
    </div>

  );
};

export default AdminPage;

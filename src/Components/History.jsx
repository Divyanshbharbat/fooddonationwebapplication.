import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const token = localStorage.getItem('cookie');
      console.log('token', token);
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP}/donation`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log(res.data.donations);
        setDonations(res.data.donations || []);
      } catch (error) {
        console.error('Error fetching donations:', error);
        setDonations([]);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Your Donation History</h2>
      {donations.length > 0 ? (
        <div className="row">
          {donations.map((donation) => (
            <div key={donation._id} className="col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">
                    <i className="bi bi-box-seam me-2"></i>{donation.product}
                  </h5>
                  <p className="card-text"><strong>Quantity:</strong> {donation.quantity}</p>
                  <p className="card-text"><strong>Time:</strong> {new Date(donation.time).toLocaleString()}</p>
                  <div className="form-group">
                    <label><strong>Address:</strong></label>
                    <textarea className="form-control" rows="3" readOnly value={donation.address}></textarea>
                  </div>
                  <p className="mt-2">
                    <strong>Status:</strong>{' '}
                    <span
                      className={`badge ${
                        donation.status === 'accepted' ? 'bg-success' : 'bg-warning text-dark'
                      }`}
                    >
                      {donation.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No donations found.</p>
      )}
    </div>
  );
};

export default History;

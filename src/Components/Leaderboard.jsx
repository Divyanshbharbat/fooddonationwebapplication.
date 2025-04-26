import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { Crown, Flame, TrendingUp } from 'lucide-react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import './Leaderboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('weekly');
  const [data, setData] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP}/api/leaderboard`);
        const sorted = res.data.sort((a, b) => b.points - a.points);
        setUsers(sorted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  
    // Static analytics data
    const dummyData = {
      totalMealsDonated: 8230,
      totalFoodWasteSaved: 5200,
      co2EmissionsPrevented: 14500,
      foodCategoriesWasted: [
        { category: "Fruits/Vegetables", percentage: 35 },
        { category: "Cooked Meals", percentage: 28 },
        { category: "Bakery", percentage: 18 }
      ],
      topDonorHotels: [
        "Hotel Bluewave",
        "GreenStay Resort",
        "UrbanEats Diner"
      ],
      monthlyTrends: {
        foodWasteDecrease: 18,
        donationsIncrease: 24
      }
    };

    setTimeout(() => {
      setData(dummyData);
    }, 500);
  }, []);

  const top3 = users.slice(0, 3);
  const others = users.slice(3).filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP}/counter`);
        console.log("c",res.data._id)
        setCount(res.data.value); // update the state
      } catch (error) {
        console.error("Failed to fetch counter:", error);
      }
    };

    fetchCount();
  }, []);
 

  const gradients = [
    'linear-gradient(135deg, #43cea2, #185a9d)',
    'linear-gradient(135deg, #00c6ff, #0072ff)',
    'linear-gradient(135deg, #c471f5, #fa71cd)'
  ];

  const pieData = {
    labels: top3.map((user) => user.username),
    datasets: [
      {
        label: 'Top 3 Users',
        data: top3.map((user) => user.points),
        backgroundColor: [
          'rgba(0, 200, 83, 1)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
        borderColor: ['#FFD700', '#007BFF', '#FF4D6D'],
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: users.map((user) => user.username),
    datasets: [
      {
        label: 'User Points',
        data: users.map((user) => user.points),
        backgroundColor: users.map((_, i) =>
          `hsl(${(i * 40) % 360}, 80%, 65%)`
        ),
        borderRadius: 8,
      },
    ],
  };

  return (
    <div id='body'>
      <div className="container py-5">
        {/* Search & Filter */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 gap-3">
          <input
            className="form-control w-100 w-sm-50"
            placeholder="Search by username or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="btn-group">
            {['daily', 'weekly', 'monthly'].map((period) => (
              <button
                key={period}
                className={`btn ${filter === period ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setFilter(period)}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Cards */}
        <div className="row mb-5">
          {top3.map((user, index) => (
            <div key={user._id} className="col-md-4 mb-4">
              <motion.div
                className="flip-card"
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.8 }}
                data-aos="zoom-in"
              >
                <div className="flip-card-inner">
                  {/* Front */}
                  <div
                    className="flip-card-front text-white text-center p-4 rounded shadow"
                    style={{ background: gradients[index] }}
                  >
                    {index === 0 ? (
                      <Crown className="position-absolute top-0 end-0 text-warning m-3" size={28} />
                    ) : (
                      <Flame className="position-absolute top-0 end-0 text-danger m-3" size={24} />
                    )}
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.username}&background=random&size=80`}
                      alt="avatar"
                      className="rounded-circle border border-white mb-2"
                      width={80}
                      height={80}
                    />
                    <h5 className="fw-bold">{user.username}</h5>
                    <p className="small">{user.email}</p>
                    <p className="fw-bold fs-5">🏆 {user.points} pts</p>
                  </div>

                  {/* Back */}
                  <div
                    className="flip-card-back text-white text-center p-4 rounded shadow"
                    style={{ background: gradients[index] }}
                  >
                    <h5>🔥 Rank #{index + 1}</h5>
                    <p className="mt-2">Keep going, you're amazing! 💪</p>
                    <motion.div
                      className="mt-3"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <TrendingUp size={32} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Other Users */}
        <div className="list-group mb-5">
          {others.map((user) => (
            <motion.div
              key={user._id}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="d-flex align-items-center gap-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.username}&background=0D8ABC&color=fff`}
                  alt="avatar"
                  className="rounded-circle"
                  width={40}
                  height={40}
                />
                <div>
                  <h6 className="mb-0">{user.username}</h6>
                  <small>{user.email}</small>
                </div>
              </div>
              <span className="badge bg-success fw-bold">{user.points} pts</span>
            </motion.div>
          ))}
        </div>

        {/* Analytics Section */}
        {data && (
          <div className="container mt-5 p-4 rounded shadow bg-light">
            <h2 className="text-center mb-4 fw-bold">Analytics Dashboard</h2>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="border p-3 rounded h-100 text-center bg-white">
                  <div className="fs-1">🍽️</div>
                  <h5>Total Meals Donated by Users : {count}</h5>
                  <div className="fs-1 mt-3">🍜</div>
                  <h5>CO₂ Emissions Prevented: {data.co2EmissionsPrevented} kg</h5>
                </div>
              </div>
              <div className="col-md-6">
                <div className="border p-3 rounded h-100 text-center bg-white">
                  <div className="fs-1">♻️</div>
                  <h5>Total Food Waste Saved: {data.totalFoodWasteSaved} kg</h5>
                </div>
              </div>
            </div>

            <div className="row g-4 mt-4">
              <div className="col-md-6">
                <div className="border p-3 rounded bg-white">
                  <h5 className="mb-3 fw-bold">Top Food Categories Wasted</h5>
                  <ul className="mb-0">
                    {data.foodCategoriesWasted.map((item, idx) => (
                      <li key={idx}>{item.category}: {item.percentage}%</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="border p-3 rounded bg-white">
                  <h5 className="mb-3 fw-bold">Top Donor Hotels</h5>
                  <ul className="mb-0">
                    {data.topDonorHotels.map((hotel, idx) => (
                      <li key={idx}>{hotel}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border p-3 rounded mt-4 bg-white">
              <h5 className="fw-bold mb-2">Monthly Trends</h5>
              <p>Food Waste ↓ {data.monthlyTrends.foodWasteDecrease}% This Month</p>
              <p>Donations ↑ {data.monthlyTrends.donationsIncrease}% This Month</p>
            </div>
          </div>
        )}

        {/* Charts Section */}
        <div className="row g-4 mb-5 mt-5">
          <div className="col-md-6">
            <div className="card shadow" data-aos="fade-up">
              <div className="card-body">
                <h5 className="card-title text-center mb-3">Top 3 Users - Pie Chart</h5>
                <Pie data={pieData} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow" data-aos="fade-up" data-aos-delay="100">
              <div className="card-body">
                <h5 className="card-title text-center mb-3">All Users - Bar Chart</h5>
                <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

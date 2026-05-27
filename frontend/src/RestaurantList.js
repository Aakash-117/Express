import React, { useState, useEffect } from 'react';
import './RestaurantList.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChineseRestaurants();
  }, []);

  const fetchChineseRestaurants = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/restaurants/chinese');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setRestaurants(data.data);
      } else {
        setError(data.message || 'Failed to fetch restaurants');
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setError(error.message || 'Failed to fetch restaurants. Make sure the backend is running on port 5000');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="restaurant-container">
      <div className="header">
        <h1>🍜 Chinese Restaurants</h1>
        <p className="subtitle">Browse all Chinese restaurants in our database</p>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading Chinese restaurants...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>⚠️ Error: {error}</p>
          <button onClick={fetchChineseRestaurants} className="retry-btn">Retry</button>
        </div>
      )}

      {!loading && !error && restaurants.length === 0 && (
        <div className="empty-state">
          <p>No Chinese restaurants found</p>
        </div>
      )}

      {!loading && !error && restaurants.length > 0 && (
        <>
          <div className="stats">
            <p>Found <strong>{restaurants.length}</strong> Chinese restaurant{restaurants.length !== 1 ? 's' : ''}</p>
          </div>

          <div className="table-responsive">
            <table className="restaurants-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Postcode</th>
                  <th>Rating</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant) => (
                  <tr key={restaurant._id}>
                    <td className="name-cell">{restaurant.name}</td>
                    <td className="address-cell">
                      <div>{restaurant.address}</div>
                      {restaurant.address_line_2 && <div className="address-line-2">{restaurant.address_line_2}</div>}
                    </td>
                    <td className="city-cell">{restaurant.outcode}</td>
                    <td className="postcode-cell">{restaurant.postcode}</td>
                    <td className="rating-cell">
                      {restaurant.rating ? (
                        <span className="rating-badge">★ {restaurant.rating}</span>
                      ) : (
                        <span className="no-rating">N/A</span>
                      )}
                    </td>
                    <td className="link-cell">
                      {restaurant.URL ? (
                        <a href={restaurant.URL} target="_blank" rel="noopener noreferrer" className="url-link">
                          View
                        </a>
                      ) : (
                        <span className="no-link">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantList;

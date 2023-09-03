import { useState, useEffect } from 'react';

const useFetchUserData = (token) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/users/currentUser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const user = await response.json({});
          const userData = user.user
          setUserData(userData);
        } else {
          // console.log('There was an error fetching user data');
        }
      } catch (error) {
        // console.log(error);
      }
    };

    fetchUserData();
  }, [token]);

  return userData;
};

export default useFetchUserData;

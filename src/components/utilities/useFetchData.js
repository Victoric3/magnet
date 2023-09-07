import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const useFetchUserData = (token) => {
  const { baseUrl } = useAuth()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(baseUrl('users/currentUser'), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const user = await response.json({});
          localStorage.setItem('userData', JSON.stringify(user.user))
        } else {
          console.log('There was an error fetching user data');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

};

export default useFetchUserData;

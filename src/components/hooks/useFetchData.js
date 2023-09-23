import { useState, useEffect } from 'react';
import { useAuth } from '../utilities/AuthContext';

const useFetchUserData = (token) => {
  const { baseUrl, userData } = useAuth()

  useEffect(() => {
    const fetchUserData = async () => {
      if(!token){return;}
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
          console.error('There was an error fetching user data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [token, userData]);
  return userData
};

export default useFetchUserData;

import React, { useEffect, useState } from "react";
import { useAuth } from "../utilities/AuthContext";

const useDeleteShop = () => {
    const {
        baseUrl,
        token,
        handleMsgCollector,
        messageShower,
        shopData,
        updateAuth,
        userData,
    } = useAuth();

    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const deleteShop = async (shop) => {
      messageShower(true)
        try {
            const response = await fetch(baseUrl(`shops/${shop._id}`), {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
              });
              
              if (response.ok) {
                setError(null);
                setSuccess(
                  `You have successfully deleted ${shop?.name}. Please inform your customers that you are no longer in business.`
                  );
                  const indexOfCurrentShop = shopData?.indexOf(shop);
            
            if (indexOfCurrentShop !== -1) {
              shopData.splice(indexOfCurrentShop, 1);
              updateAuth(shopData);
            }
            } else if (userData.userName !== shop?.owner) {
                setError('You can only delete your shop.');
              } 
            } catch (e) {
              setError(e);
            }
            
            
          };
          useEffect(() => {
            handleMsgCollector(error, success);
          }, [error, success])
          
    return { deleteShop };
};

export default useDeleteShop;

import { useState, useEffect } from 'react';
import { useAuth } from '../utilities/AuthContext';

const useFetchProduct = () => {
    const { token, baseUrl, shopProductData } = useAuth()
    
    const fetchProduct = async(shop) => {
            let response
            try{
            response = await fetch(baseUrl(`products/shop/${shop._id}`), {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                        }
            })
            if(response.ok){
                const data = await response.json({})
                localStorage.setItem('shopProductData', JSON.stringify(data.productData))
                console.log(data.productData, 'shopProductData', shop._id, 'shopId', shopProductData, 'shopProducts');

            }
        }catch(error){
            console.error(error);
        }
}

return { fetchProduct };
}

export default useFetchProduct;
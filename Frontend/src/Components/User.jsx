import React, { useState, useEffect } from 'react';
import axios from 'axios'

const User = () => {

    const [orders, setOrders] = useState([])
    const [showInput, setShowInput] = useState(false);
    const [userOrder, setuserOrder] = useState({user_id: localStorage.getItem('userId'),phone_number:localStorage.getItem('phone')});


    const handleAddOrder = () => {
      setShowInput(true);
      }

    const handleConfirmOrder = () => {
      postData(userOrder)
    }  

    const handleInputChange = (e) => {
      setuserOrder({
        ...userOrder, 
        sub_total: e.target.value
      })   
     }

    const postData = async(userOrderData) => {
      try{
        const pushData = await axios.post('http://localhost:5000/orders/add-order', userOrder)
      }
      catch(err){
        return console.log(err)
      }
      fetchData()
    }

    const fetchData = async() => {
      const userId = localStorage.getItem('userId')
      const data = await axios.get(`http://localhost:5000/orders/get-order?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
      })
      const fetchOrder = data.data.orders
      setOrders(fetchOrder)
    }  

    useEffect( () => {
      fetchData()
    }, [])

  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded-md p-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-grow">
          <div className="flex items-start">
            <img src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" alt="Profile" className="w-8 h-8 rounded-full mr-2" />
            <div>
              <div className="font-semibold">Amlan</div>
              <div>7606846664</div>
            </div>
          </div>
        </div>
        <div className="text-gray-500 text-sm">Orders: {orders.length}</div>
      </div>
      <div className="flex-grow">
        <h2 className="text-lg font-semibold mb-2">User Orders</h2>
        <ul>
          {orders.map((index) => (
            <li key={index} className="border-b border-gray-200 py-2">
              <div>Order ID: {index.userId}</div>
              <div>Price: ${index.sub_total}</div>
            </li>
          ))}
        </ul>
        {showInput ? (
          <div className="mt-4">
            <input
              type="number"
              placeholder="Enter total amount"
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <button onClick={handleConfirmOrder} className="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none">
              Confirm
            </button>
          </div>
        ) : (
          <button onClick={handleAddOrder} className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none">
            Add Order
          </button>
        )}
      </div>
    </div>
  );
};

export default User;

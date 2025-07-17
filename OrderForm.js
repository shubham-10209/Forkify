 import React, { useRef, useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import './OrderForm.css';

const OrderForm = () => {
  const form = useRef();

  // States to hold food info from URL
  const [food, setFood] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  // Read URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFood(params.get('food') || 'Unknown Food');
    setPrice(params.get('price') || '0.00');
    setImage(params.get('img') || 'default.jpg'); // fallback image name
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_ggrpnt9',          // Your EmailJS Service ID
      'template_8h34cnk',         // Your EmailJS Template ID
      form.current,
      'MHPAo3-0NGv208r_l'         // Your EmailJS Public Key
    ).then(
      () => {
        alert('✅ Order Placed! Confirmation sent to your email.');
        form.current.reset();
      },
      (error) => {
        alert('❌ Email failed to send. Please try again.');
        console.error('EmailJS Error:', error);
      }
    );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="order-form">
      <h2>🍴 Order Your Food</h2>

      <div className="selected-food">
        <img src={`img/${image}`} alt={food} className="food-preview" />
        <h3>{food}</h3>
        <p>Price: ${price}</p>
      </div>

      {/* Hidden Inputs for EmailJS */}
      <input type="hidden" name="food" value={food} />
      <input type="hidden" name="price" value={price} />

      <label>Full Name</label>
      <input type="text" name="full_name" required />

      <label>Email</label>
      <input type="email" name="email" required />

      <label>Phone Number</label>
      <input type="tel" name="phone" required />

      <label>Address</label>
      <textarea name="address" rows="4" required></textarea>

      <label>Quantity</label>
      <input type="number" name="quantity" defaultValue="1" min="1" required />

      <input type="submit" value="Confirm Order" className="btn-submit" />
    </form>
  );
};

export default OrderForm;

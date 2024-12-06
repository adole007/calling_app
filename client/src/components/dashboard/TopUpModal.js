import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/stripe-react-js';
import axios from 'axios';

const TopUpModal = ({ onClose, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create payment intent
      const { data } = await axios.post('/api/payments/topup', {
        amount: parseFloat(amount),
        currency
      });

      // Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        onSuccess();
        onClose();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Top Up Your Account</h3>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            min="1"
          />
          <CardElement />
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Pay'}
          </button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default TopUpModal; 
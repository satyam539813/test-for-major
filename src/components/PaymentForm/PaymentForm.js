import React, { useState } from 'react';
import './PaymentForm.css';
import { toast } from 'react-toastify';

const PaymentForm = ({ onPaymentSuccess, onPaymentCancel }) => {
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'netbanking', 'upi', 'cod'
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvc: ''
    });
    const [netbankingDetails, setNetbankingDetails] = useState({
        bank: '',
        accountNumber: ''
    });
    const [upiDetails, setUpiDetails] = useState({
        upiId: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCardInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({
            ...cardDetails,
            [name]: value
        });
        if (error) setError('');
    };

    const handleNetbankingInputChange = (e) => {
        const { name, value } = e.target;
        setNetbankingDetails({
            ...netbankingDetails,
            [name]: value
        });
        if (error) setError('');
    };

    const handleUpiInputChange = (e) => {
        const { name, value } = e.target;
        setUpiDetails({
            ...upiDetails,
            [name]: value
        });
        if (error) setError('');
    };

    const validateForm = () => {
        setError(''); // Clear previous errors
        if (paymentMethod === 'card') {
            const { cardNumber, cardName, expiryDate, cvc } = cardDetails;
            if (!cardNumber || !cardName || !expiryDate || !cvc) {
                setError('All card fields are required.');
                return false;
            }
            if (!/^\d{16}$/.test(cardNumber)) {
                setError('Card number must be 16 digits.');
                return false;
            }
            if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
                setError('Expiry date must be in MM/YY format.');
                return false;
            }
            if (!/^\d{3,4}$/.test(cvc)) {
                setError('CVC must be 3 or 4 digits.');
                return false;
            }
        } else if (paymentMethod === 'netbanking') {
            const { bank, accountNumber } = netbankingDetails;
            if (!bank || !accountNumber) {
                setError('Bank and Account Number are required for Net Banking.');
                return false;
            }
        } else if (paymentMethod === 'upi') {
            const { upiId } = upiDetails;
            if (!upiId) {
                setError('UPI ID is required.');
                return false;
            }
            if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) {
                setError('Invalid UPI ID format.');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');

        // Simulate payment processing based on method
        setTimeout(() => {
            const success = Math.random() > 0.1; // 90% chance of success

            if (success) {
                toast.success("Payment successful! Your order has been placed.");
                onPaymentSuccess();
            } else {
                toast.error("Payment failed. Please try again.");
                setError("Payment processing failed. Please check your details.");
            }
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="payment-form-overlay">
            <div className="payment-form-container">
                <h3>Choose Payment Method</h3>
                {error && <p className="payment-error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="payment-method-selection">
                        <label>
                            <input
                                type="radio"
                                value="card"
                                checked={paymentMethod === 'card'}
                                onChange={() => setPaymentMethod('card')}
                                disabled={loading}
                            />
                            Credit/Debit Card
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="netbanking"
                                checked={paymentMethod === 'netbanking'}
                                onChange={() => setPaymentMethod('netbanking')}
                                disabled={loading}
                            />
                            Net Banking
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="upi"
                                checked={paymentMethod === 'upi'}
                                onChange={() => setPaymentMethod('upi')}
                                disabled={loading}
                            />
                            UPI
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="cod"
                                checked={paymentMethod === 'cod'}
                                onChange={() => setPaymentMethod('cod')}
                                disabled={loading}
                            />
                            Cash on Delivery
                        </label>
                    </div>

                    {paymentMethod === 'card' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="cardNumber">Card Number</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={cardDetails.cardNumber}
                                    onChange={handleCardInputChange}
                                    placeholder="•••• •••• •••• ••••"
                                    maxLength="16"
                                    disabled={loading}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cardName">Cardholder Name</label>
                                <input
                                    type="text"
                                    id="cardName"
                                    name="cardName"
                                    value={cardDetails.cardName}
                                    onChange={handleCardInputChange}
                                    placeholder="Full Name"
                                    disabled={loading}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                                    <input
                                        type="text"
                                        id="expiryDate"
                                        name="expiryDate"
                                        value={cardDetails.expiryDate}
                                        onChange={handleCardInputChange}
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        disabled={loading}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cvc">CVC</label>
                                    <input
                                        type="text"
                                        id="cvc"
                                        name="cvc"
                                        value={cardDetails.cvc}
                                        onChange={handleCardInputChange}
                                        placeholder="•••"
                                        maxLength="4"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {paymentMethod === 'netbanking' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="bank">Bank Name</label>
                                <input
                                    type="text"
                                    id="bank"
                                    name="bank"
                                    value={netbankingDetails.bank}
                                    onChange={handleNetbankingInputChange}
                                    placeholder="e.g., State Bank of India"
                                    disabled={loading}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="accountNumber">Account Number</label>
                                <input
                                    type="text"
                                    id="accountNumber"
                                    name="accountNumber"
                                    value={netbankingDetails.accountNumber}
                                    onChange={handleNetbankingInputChange}
                                    placeholder="Your Account Number"
                                    disabled={loading}
                                />
                            </div>
                        </>
                    )}

                    {paymentMethod === 'upi' && (
                        <div className="form-group">
                            <label htmlFor="upiId">UPI ID</label>
                            <input
                                type="text"
                                id="upiId"
                                name="upiId"
                                value={upiDetails.upiId}
                                onChange={handleUpiInputChange}
                                placeholder="yourname@bankupi"
                                disabled={loading}
                            />
                        </div>
                    )}

                    {paymentMethod === 'cod' && (
                        <p className="cod-message">You have selected Cash on Delivery. Please have the exact amount ready upon delivery.</p>
                    )}

                    <div className="payment-actions">
                        <button type="button" className="cancel-btn" onClick={onPaymentCancel} disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" className="pay-btn" disabled={loading}>
                            {loading ? 'Processing...' : 'Confirm Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;

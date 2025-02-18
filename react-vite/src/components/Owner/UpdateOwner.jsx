import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkUpdateOwner, thunkGetAllOwnersThatCorrespondToAircraft } from '../../redux/owner';
import { useModal } from '../../context/Modal';
import "./OwnerCss.css";

const UpdateOwner = ({ owner }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const ownerById = useSelector((state) => state.ownerReducer[owner.id]);

    // useEffect(() => {
    //     dispatch(thunkGetAllOwnersThatCorrespondToAircraft(owner.id));
    // }, [dispatch, owner.id]);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [payment_type, setPayment_type] = useState('');
    const [notes, setNotes] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (ownerById) {
            setFirstname(ownerById.firstname || "");
            setLastname(ownerById.lastname || "");
            setUsername(ownerById.username || "");
            setEmail(ownerById.email || "");
            setAddress(ownerById.address || "");
            setPhone_number(ownerById.phone_number || "");
            setPayment_type(ownerById.payment_type || "");
            setNotes(ownerById.notes || "");
        }
    }, [ownerById]);

    useEffect(() => {
        const errorsObj = {};

        if (!email || (typeof email === 'string' && (!email.includes('@') || email.length < 10))) {
            errorsObj.email = 'Email must have an @ symbol and must be at least 10 characters long';
        }
        if (!username || username.length < 3 || username.length > 40) {
            errorsObj.username = 'Nickname must be between 3 and 40 characters';
        }
        if (!firstname || firstname.length < 3 || firstname.length > 25) {
            errorsObj.firstname = 'Firstname must be between 3 and 25 characters';
        }
        if (!lastname || lastname.length < 3 || lastname.length > 25) {
            errorsObj.lastname = 'Lastname must be between 3 and 25 characters';
        }
        if (!address || address.length < 5 || address.length > 100) {
            errorsObj.address = 'Address must be between 5 and 100 characters';
        }
        if (phone_number && !/^\d{10}$/.test(phone_number)) {
            errorsObj.phone_number = 'Phone number must be exactly 10 digits';
        }
        if (!payment_type) {
            errorsObj.payment_type = 'Payment type must be either Debit Card, Credit Card, Cash, or Other';
        }
        if (notes && notes.length > 200) {
            errorsObj.notes = 'Notes cannot exceed 200 characters';
        }

        setErrors(errorsObj);
    }, [email, username, firstname, lastname, address, phone_number, payment_type, notes]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('phone_number', phone_number);
        formData.append('payment_type', payment_type);
        formData.append('notes', notes);

        try {
            await dispatch(thunkUpdateOwner(owner.aircraft_id, owner.id, formData));
            closeModal();
        } catch (error) {
            console.error("Error updating owner:", error);
        }
    };

    return (
        <div className="create-owner-container">
            <h2>Update Owner</h2>
            <form className="create-owner-form" onSubmit={handleSubmit}>
                <div className="">
                    <label>First Name:</label>
                    <input type="text" id="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    {errors.firstname && <p className="error">{errors.firstname}</p>}
                </div>
                <div className="">
                    <label>Last Name:</label>
                    <input type="text" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    {errors.lastname && <p className="error">{errors.lastname}</p>}
                </div>
                <div className="">
                    <label>Goes:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>
                <div className="">
                    <label>Email:</label>
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="">
                    <label>Address:</label>
                    <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    {errors.address && <p className="error">{errors.address}</p>}
                </div>
                <div className="">
                    <label>Phone Number:</label>
                    <input type="text" id="phone_number" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} />
                    {errors.phone_number && <p className="error">{errors.phone_number}</p>}
                </div>
                <div className="">
                    <label>Preferred Payment Type:</label>
                    <select id="payment_type" value={payment_type} onChange={(e) => setPayment_type(e.target.value)}>
                        <option value="">Select Payment Type</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.payment_type && <p className="error">{errors.payment_type}</p>}
                </div>
                <div className="">
                    <label>Notes:</label>
                    <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
                    {errors.notes && <p className="error">{errors.notes}</p>}
                </div>
                <button disabled={Object.values(errors).length > 0}  type="submit">Submit</button>
                <button onClick={() => closeModal()} className="">Close</button>
            </form>
        </div>
    );
};

export default UpdateOwner;
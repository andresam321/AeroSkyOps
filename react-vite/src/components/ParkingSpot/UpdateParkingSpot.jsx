import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { thunkUpdateParkingSpot } from '../../redux/parking_spot';
import { thunkGetAllParkingSpots } from '../../redux/parking_spot';
import { useModal } from '../../context/Modal';
import './ParkingSpot.css'


const UpdateParkingSpot = () => {
    const {parking_spotId} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal()

    const currentUser = useSelector((state) => state.session.user);
    // const allSpots = useSelector((state) => state.parkingSpotReducer.allSpots)
    const parkingSpotById = useSelector((state) => state.parkingSpotReducer[+parking_spotId])
    // console.log(parkingSpotById)

    const [spot_number, setSpotNumber] = useState(parkingSpotById || '');
    const [spot_size, setSpotSize] = useState(parkingSpotById || 'Small');
    const [is_reserved, setIsReserved] = useState(parkingSpotById || '');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(thunkGetAllParkingSpots());
    }, [dispatch]);


    useEffect(()=> {
        if(parkingSpotById) {
            setSpotNumber(parkingSpotById.spot_number || "")
            setSpotSize(parkingSpotById.spot_size || "")
            setIsReserved(parkingSpotById.is_reserved || "")
        }
    }, [parkingSpotById])



    useEffect(() => {
        const errObj = {};
        if (!/^[a-zA-Z]\d*$/.test(spot_number)) {
            errObj.spot_number = "Parking spot must start with a letter followed by digits (parking spot number unique, no duplicates)";
        } else if (spot_number.length < 2 || spot_number > 5) {
            errObj.spot_number = "Parking spot must be between two and five characters";
        }
        if (!spot_size) errObj.spot_size = "Please provide a valid parking spot size";
        if (!is_reserved) errObj.is_reserved = "Defaults to no";

        setErrors(errObj);
    }, [spot_number, spot_size, is_reserved]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('spot_number', spot_number);
        formData.append('spot_size', spot_size);
        formData.append('is_reserved', is_reserved);
        
        try {
            
            await dispatch(thunkUpdateParkingSpot(formData,parking_spotId));
            closeModal()
        } catch (error) {
            console.error("Error creating parking spot:", error);
            
        }
    }
    
    if (!currentUser) {
        return <div>Please log in to create a parking spot.</div>;
    }
    
    return (
        <div className="update-parking-spot-container">
            <h2>Updating Parking Spot</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className='form-group'>
                        <label htmlFor="spot_number">Spot Number</label>
                        <input
                            type="text"
                            id="spot_number"
                            value={spot_number}
                            onChange={(e) => setSpotNumber(e.target.value.toUpperCase())}
                        />
                        {errors.spot_number && <p className='error-message'>{errors.spot_number}</p>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="spot_size">Spot Size</label>
                        <select
                            id="spot_size"
                            value={spot_size}
                            onChange={(e) => setSpotSize(e.target.value)}
                        >
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                        </select>
                        {errors.spot_size && <p className='error-message'>{errors.spot_size}</p>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="is_reserved">Is Reserved</label>
                        <select
                            id="is_reserved"
                            value={is_reserved}
                            onChange={(e) => setIsReserved(e.target.value)}
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {errors.is_reserved && <p className='error-message'>{errors.is_reserved}</p>}
                    </div>
                </div>
                <div className="button-container">
                    <button disabled={Object.values(errors).length > 0} type="submit" className="update-button">Yes (Update Parking Spot)</button>
                    <button onClick={() => closeModal()} className="cancel-button">No (Do not Update)</button>
                </div>
            </form>
        </div>
    );
};
export default UpdateParkingSpot
import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { thunkCreateParkingSpot } from '../../redux/parking_spot';
import { thunkCheckSpotExists } from '../../redux/parking_spot';
import { thunkGetAllAreasWithParkingSpots } from '../../redux/airport_area';
import './CreateParking.css'

const CreateParkingSpot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.session.user);
    const airportAreas= useSelector((state) => state.airportAreasReducer.areasWithSpots?.airport)
    console.log("line15", airportAreas)
    // const {id} = useParams
    const [spot_number, setSpotNumber] = useState('');
    const [spot_size, setSpotSize] = useState('Small');
    const [is_reserved, setIsReserved] = useState('No');
    const [airport_area_id, setAirport_area_id] = useState("")
    const [spotNumberExists, setSpotNumberExists] = useState(false);
    const [errors, setErrors] = useState({});

    // const checkSpotExists = (spotNumber) => {
    //     return existingParkingSpots.some(spot => spot.spot_number === spotNumber);
    // };

    
    useEffect(() => {
        dispatch(thunkGetAllAreasWithParkingSpots());
    }, [dispatch]);

    const getPrefix = (airport_area_id) => {
        const prefixes = {
            '1': 'N',  // North
            '2': 'E',  // East
            '3': 'W',  // West
            '4': 'S'   // South
        };
        return prefixes[airport_area_id] || '';
    };

    useEffect(() => {
        const validateSpot = async () => {
            const prefix = getPrefix(airport_area_id);

            const errObj = {};
            if (!spot_number.startsWith(prefix)) {
                errObj.spot_number = `Parking spot number must start with '${prefix}' for the selected parking area`;
            } else if (!/^[a-zA-Z]\d*$/.test(spot_number)) {
                errObj.spot_number = "Parking spot must start with a letter followed by digits (parking spot number unique, no duplicates)";
            } else if (spot_number.length < 2 || spot_number.length > 5) {
                errObj.spot_number = "Parking spot must be between two and five characters";
            }

            if (!airport_area_id) errObj.airport_area_id = "Please provide a valid parking area";
            if (!spot_size) errObj.spot_size = "Please provide a valid parking spot size";
            if (!is_reserved) errObj.is_reserved = "Defaults to no";

            if (Object.keys(errObj).length === 0) {
                const exists = await dispatch(thunkCheckSpotExists(spot_number, airport_area_id));
                if (exists) {
                    errObj.spot_number = "Parking spot number already exists";
                }
            }

            setErrors(errObj);
        };

        validateSpot();
    }, [spot_number, airport_area_id, spot_size, is_reserved, dispatch]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!selectedAreaId) {
        //     setErrors({ area: "Please select an airport area." });
        //     return;
        // }
           
        const formData = new FormData();
        console.log("Selected area ID:", airport_area_id);

        formData.append('airport_area_id', airport_area_id)
        formData.append('spot_number', spot_number);
        formData.append('spot_size', spot_size);
        formData.append('is_reserved', is_reserved);
        
        try {
            
            const res = await dispatch(thunkCreateParkingSpot(formData,airport_area_id));
            console.log("line33",res)
            navigate(`/area/parking_spot/${airport_area_id}`);
        } catch (error) {
            console.error("Error creating parking spot:", error);
            
        }
    }

    
    if (!currentUser) {
        return <div>Please log in to create a parking spot.</div>;
    }
    
    return (
        <div className="create-parking-spot">
            <h2>Create a New Parking Spot</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="airport_area_id">Parking Location</label>
                <select
                    id="airport_area_id"
                    value={airport_area_id}
                    onChange={(e) => setAirport_area_id(e.target.value)} // Correctly captures value
                    >
                    {airportAreas && Object.values(airportAreas).map((area) => (
                        <option key={area.id} value={area.id}>
                            {area.area_name}
                        </option>
                    ))}
                </select>
                {errors.airport_area_id && <p className="error">{errors.airport_area_id}</p>}
            </div>
                <div className='form-group'>
                    <label htmlFor="spot_number">Spot Number</label>
                    <input
                        type="text"
                        id="spot_number"
                        value={spot_number}
                        onChange={(e) => setSpotNumber(e.target.value.toUpperCase())}
                    />
                    {errors.spot_number && <p className='error'>{errors.spot_number}</p>}
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
                    {errors.spot_size && <p className='error'>{errors.spot_size}</p>}
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
                    {errors.is_reserved && <p className='error'>{errors.is_reserved}</p>}
                </div>
                <button disabled={Object.values(errors).length > 0} className='btn-main' type="submit">Create Spot</button>
            </form>
        </div>
    );
};

export default CreateParkingSpot;
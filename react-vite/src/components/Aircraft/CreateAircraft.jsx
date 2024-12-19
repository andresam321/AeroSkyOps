import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkAddAircraft } from '../../redux/aircraft';
import { thunkGetAllOwnersThatCorrespondToAircraft, thunkGetOneOwnerById } from '../../redux/owner'
import "./AircraftForm.css"


const CreateAircraft = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [plane_image, setPlane_image] = useState();
    const [tail_number, setTail_number] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState('');
    const [max_takeoff_weight, setMax_takeoff_weight] = useState("");
    const [seating_capacity, setSeating_capacity] = useState('');
    const [operation_status, setOperation_status] = useState("");
    const [fuel_type, setFuel_type] = useState("");
    const [active_owners, setActive_owners] = useState("");
    const [notes, setNotes] = useState("");
    const [last_time_fueled, setLast_time_fueled] = useState("");
    const [errors, setErrors] = useState({});
    const [showImage, setShowImage] = useState();

    // const currentUser = useSelector((state) => state.session.user);


    const today = new Date();
    today.setDate(today.getDate() - 1)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPlane_image(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setShowImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('plane_image', plane_image);
        formData.append('tail_number', tail_number);
        formData.append('manufacturer', manufacturer);
        formData.append('model', model);
        formData.append('max_takeoff_weight', max_takeoff_weight);
        formData.append('seating_capacity', seating_capacity);
        formData.append('operation_status', operation_status);
        formData.append('fuel_type', fuel_type);
        formData.append('active_owners', active_owners);
        formData.append('notes', notes);
        formData.append('last_time_fueled', last_time_fueled);

        try {
            const response = await dispatch(thunkAddAircraft(formData));
            if (response && response.id) {
                navigate(`/aircraft/${response.id}`);
            await dispatch(thunkGetAllOwnersThatCorrespondToAircraft(response.id))
            } else if (response.errors) {
                setErrors(response.errors);
            } else {
                throw new Error("Failed to get aircraft ID from the response");
            }
    
        } catch (err) {
            console.error("Failed to add aircraft:", err);
            setErrors({ general: "An unexpected error occurred. Please try again later." });
        }
    };

    useEffect(() => {
        const errorObj = {};
        if (!plane_image) errorObj.plane_image = "Image required";
        if (!tail_number || tail_number.length < 3 || tail_number.length > 8) errorObj.tail_number = "Please provide a tail number between 3 and 8 characters";
        if (!manufacturer || manufacturer.length < 2 || manufacturer.length > 12) errorObj.manufacturer = "Please provide a valid manufacturer";
        if (!model || model.length < 2 || model.length > 20) errorObj.model = "Please provide a model between 2 and 10 characters";
        if (!max_takeoff_weight || max_takeoff_weight.length < 3 || max_takeoff_weight.length > 10) errorObj.max_takeoff_weight = "Please provide a valid takeoff weight";
        if (!seating_capacity || seating_capacity.length < 1 || seating_capacity.length > 3) errorObj.seating_capacity = "Seating amount must be under 300";
        if (!operation_status) errorObj.operation_status = "Operation status required";
        if (!fuel_type) errorObj.fuel_type = "Fuel type required";
        if (!active_owners || active_owners.length < 1 || active_owners.length > 2) errorObj.active_owners = "Active owners required Active owners required (under 20)";
        if (!last_time_fueled) errorObj.last_time_fueled = "Required";
        if (!notes || notes.length < 2 || notes.length > 255) errorObj.notes = "Keep the note between 2 and 255 characters";
        setErrors(errorObj);
    }, [plane_image, tail_number, manufacturer, model, max_takeoff_weight, seating_capacity, operation_status, fuel_type, active_owners, last_time_fueled, notes]);

return (
    <div className='form-container'>
            <h2>Create Aircraft</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className='form-field'>
                        <label>Plane Image</label>
                        <input type="file" id="plane_image" onChange={handleFileChange} />
                        {showImage && <img src={showImage} alt="Preview" width="100" />}
                        {errors.plane_image && <p className="error-message">{errors.plane_image}</p>}
                    </div>
                    <div className='form-field'>
                        <label>Tail Number</label>
                        <input type="text" id="tail_number" value={tail_number} onChange={(e) => setTail_number(e.target.value.toUpperCase())} />
                        {errors.tail_number && <p className="error-message">{errors.tail_number}</p>}
                    </div>
                    <div className='form-field'>
                        <label>Manufacturer</label>
                        <input type="text" id="manufacturer" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
                        {errors.manufacturer && <p className="error-message">{errors.manufacturer}</p>}
                    </div>
                    <div className='form-field'>
                        <label>Model</label>
                        <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} />
                        {errors.model && <p className="error-message">{errors.model}</p>}
                    </div>
                    <div className='form-field'>
                        <label>Max Takeoff Weight</label>
                        <input type="number" id="max_takeoff_weight" value={max_takeoff_weight} onChange={(e) => setMax_takeoff_weight(e.target.value)} min="0" max="10000" />
                        {errors.max_takeoff_weight && <p className="error-message">{errors.max_takeoff_weight}</p>}
                    </div>
                    <div className='form-field'>
                        <label>Seating Capacity</label>
                        <input type="number" id="seating_capacity" value={seating_capacity} onChange={(e) => setSeating_capacity(e.target.value)} min="0" max="300" />
                        {errors.seating_capacity && <p className="error-message">{errors.seating_capacity}</p>}
                    </div>
                    <div className='form-field'>
                        <label>Operation Status</label>
                        <select id="operation_status" value={operation_status} onChange={(e) => setOperation_status(e.target.value)}>
                            <option value="">Select an option</option>
                            <option value="Operational">Operational</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Decommissioned">Decommissioned</option>
                        </select>
                        {errors.operation_status && <p className="error-message">{errors.operation_status}</p>}
                    </div>
                    <div className='form-field'>
                        <label>Fuel Type</label>
                        <select id="fuel_type" value={fuel_type} onChange={(e) => setFuel_type(e.target.value)}>
                            <option value="">Select an option</option>
                            <option value="100ll AvGas">100ll AvGas</option>
                            <option value="94 unleaded">94 unleaded</option>
                            <option value="Jet A">Jet A</option>
                            <option value="100 unleaded">100 unleaded</option>
                        </select>
                        {errors.fuel_type && <p className="error-message">{errors.fuel_type}</p>}
                    </div>
                    <div className='form-field'>
                        <label>Active Owners</label>
                        <input type="number" id="active_owners" value={active_owners} onChange={(e) => setActive_owners(e.target.value)} min="0" max="20" />
                        {errors.active_owners && <p className="error-message">{errors.active_owners}</p>}
                    </div>
                    <div className='form-field'>
                        <label>Notes</label>
                        <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                        {errors.notes && <p className="error-message">{errors.notes}</p>}
                    </div>
                    <div className='form-field'>
                        <label>Last Time Fueled</label>
                        <input type="date" id="last_time_fueled" value={last_time_fueled} onChange={(e) => setLast_time_fueled(e.target.value)} max={today.toISOString().split('T')[0]} />
                        {errors.last_time_fueled && <p className="error-message">{errors.last_time_fueled}</p>}
                    </div>
                </div>
                <button disabled={Object.values(errors).length > 0} className='submit-create-button' type="submit">Add Aircraft</button>
            </form>
        </div>
    );
};


export default CreateAircraft;

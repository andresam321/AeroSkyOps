import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { thunkUpdateAircraft } from '../../redux/aircraft';
import { useModal } from '../../context/Modal';
import "./UpdateForm.css"


const UpdateAircraft = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {aircraftId} = useParams()
    const { closeModal } = useModal()


    // const currentUser = useSelector((state) => state.session.user);
    const aircraftById = useSelector((state) => state.aircraftReducer[aircraftId])
    // console.log(aircraftById)
    
    const [plane_image, setPlane_image] = useState(aircraftById.plane_image || "");
    const [tail_number, setTail_number] = useState(aircraftById.tail_number || "");
    const [manufacturer, setManufacturer] = useState(aircraftById.manufacturer || "");
    const [model, setModel] = useState(aircraftById.model || "");
    const [max_takeoff_weight, setMax_takeoff_weight] = useState(aircraftById.max_takeoff_weight || "");
    const [seating_capacity, setSeating_capacity] = useState(aircraftById.seating_capacity || "");
    const [operation_status, setOperation_status] = useState(aircraftById.operation_status || "");
    const [fuel_type, setFuel_type] = useState(aircraftById.fuel_type || "");
    const [active_owners, setActive_owners] = useState(aircraftById.active_owners || "");
    const [notes, setNotes] = useState(aircraftById.notes || "");
    const [last_time_fueled, setLast_time_fueled] = useState(aircraftById.last_time_fueled || "");
    const [errors, setErrors] = useState({});

    const [showImage, setShowImage] = useState();
    
    const [imageLoading, setImageLoading] = useState(false);

    const today = new Date();
    today.setDate(today.getDate() - 1)


    useEffect(() => {
        if (aircraftById) {
            setShowImage(aircraftById.plane_image || "")
            setTail_number(aircraftById.tail_number || "")
            setManufacturer(aircraftById.manufacturer || "")
            setModel(aircraftById.model || "")
            setMax_takeoff_weight(aircraftById.max_takeoff_weight || "")
            setSeating_capacity(aircraftById.seating_capacity || "")
            setOperation_status(aircraftById.operation_status || "")
            setFuel_type(aircraftById.fuel_type || "")
            setActive_owners(aircraftById.active_owners || "")
            setNotes(aircraftById.notes || "")
            const lastFueledDate = new Date(aircraftById.last_time_fueled);

            const formattedDate = lastFueledDate.toISOString().split('T')[0];
        
            setLast_time_fueled(formattedDate);
            
        }
    }, [aircraftById])

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
        if (!active_owners || active_owners.length < 1 || active_owners.length > 2) errorObj.active_owners = "Active owners required (under 20)";
        if (!last_time_fueled) errorObj.last_time_fueled = "Required";
        if (!notes || notes.length < 2 || notes.length > 255) errorObj.notes = "Keep the note between 2 and 255 characters";
        setErrors(errorObj);
    }, [plane_image, tail_number, manufacturer, model, max_takeoff_weight, seating_capacity, operation_status, fuel_type, active_owners, last_time_fueled, notes]);

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
        setImageLoading(true)

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
        const newAircraft = await dispatch(thunkUpdateAircraft(formData, aircraftId));
        // console.log("newAircraft line 88", newAircraft)

        console.log("line33",newAircraft)
        closeModal()
        navigate(`/aircraft/${aircraftId}`)
        setImageLoading(false)
        } catch (err) {
            console.error("Failed to add aircraft:", err);
        }
    };





return (
        <div className="form-container">
            <h2>Update Aircraft</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-grid">
                    <div className='form-group'>
                        <label htmlFor="plane_image">Plane Image</label>
                        <input type="file" id="plane_image" onChange={handleFileChange} />
                        {showImage && <img src={showImage} alt="Preview" width="150" />}
                        {errors.plane_image && <p className='error-message'>{errors.plane_image}</p>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="tail_number">Tail Number</label>
                        <input 
                            type="text" 
                            id="tail_number" 
                            value={tail_number} 
                            onChange={(e) => setTail_number(e.target.value.toUpperCase())} 
                        />
                        {errors.tail_number && <p className='error-message'>{errors.tail_number}</p>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="manufacturer">Manufacturer</label>
                        <input 
                            type="text" 
                            id="manufacturer" 
                            value={manufacturer} 
                            onChange={(e) => setManufacturer(e.target.value)} 
                        />
                        {errors.manufacturer && <p className='error-message'>{errors.manufacturer}</p>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="model">Model</label>
                        <input 
                            type="text" 
                            id="model" 
                            value={model} 
                            onChange={(e) => setModel(e.target.value)} 
                        />
                        {errors.model && <p className='error-message'>{errors.model}</p>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="max_takeoff_weight">Max Takeoff Weight</label>
                        <input 
                            type="number" 
                            id="max_takeoff_weight" 
                            value={max_takeoff_weight} 
                            onChange={(e) => setMax_takeoff_weight(e.target.value)} 
                            min="0" 
                            max="100000"
                        />
                        {errors.max_takeoff_weight && <p className='error-message'>{errors.max_takeoff_weight}</p>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="seating_capacity">Seating Capacity</label>
                        <input 
                            type="number" 
                            id="seating_capacity" 
                            value={seating_capacity} 
                            onChange={(e) => setSeating_capacity(e.target.value)} 
                            min="0" 
                            max="300"
                        />
                        {errors.seating_capacity && <p className='error-message'>{errors.seating_capacity}</p>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="operation_status">Operation Status</label>
                        <select 
                            id="operation_status" 
                            value={operation_status} 
                            onChange={(e) => setOperation_status(e.target.value)}
                        >
                            <option value="">Select an option</option>
                            <option value="Operational">Operational</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Decommissioned">Decommissioned</option>
                        </select>
                        {errors.operation_status && <p className='error-message'>{errors.operation_status}</p>}
                    </div

>
                    <div className='form-group'>
                        <label htmlFor="fuel_type">Fuel Type</label>
                        <select 
                            id="fuel_type" 
                            value={fuel_type} 
                            onChange={(e) => setFuel_type(e.target.value)}
                        >
                            <option value="">Select an option</option>
                            <option value="100ll AvGas">100ll AvGas</option>
                            <option value="94 unleaded">94 unleaded</option>
                            <option value="Jet A">Jet A</option>
                            <option value="100 unleaded">100 unleaded</option>
                        </select>
                        {errors.fuel_type && <p className='error-message'>{errors.fuel_type}</p>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="active_owners">Active Owners</label>
                        <input 
                            type="number" 
                            id="active_owners" 
                            value={active_owners} 
                            onChange={(e) => setActive_owners(e.target.value)} 
                            min="1" 
                            max="20"
                        />
                        {errors.active_owners && <p className='error-message'>{errors.active_owners}</p>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="notes">Notes</label>
                        <textarea 
                            id="notes" 
                            value={notes} 
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        {errors.notes && <p className='error-message'>{errors.notes}</p>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="last_time_fueled">Last Time Fueled</label>
                        <input 
                            type="date" 
                            id="last_time_fueled" 
                            value={last_time_fueled} 
                            onChange={(e) => setLast_time_fueled(e.target.value)}
                            max={today.toISOString().split('T')[0]}
                        />
                        {errors.last_time_fueled && <p className="error-message">{errors.last_time_fueled}</p>}
                    </div>
                </div>
                <div className="button-container">
                    <button 
                        disabled={Object.values(errors).length > 0} 
                        type="submit" 
                        className="submit-button"
                    >
                        Yes (Update Aircraft)
                    </button>
                    <button onClick={() => closeModal()} className="cancel-button">
                        No (Don’t Update Aircraft)
                    </button>
                </div>
            </form>
        </div>
    );
};


export default UpdateAircraft
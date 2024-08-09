import {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { thunkCreateFuelOrder } from '../../redux/fueling'
import { useModal } from '../../context/Modal';
import { thunkGetSingleAircraft } from '../../redux/aircraft'
import "./CreateFuel.css"

const CreateFuelOrder = ({aircraftId}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    // const {aircraftId} = useParams()
    // const {aircraftId} = useParams()
    const[fuel_type, setFuel_type] = useState('')
    const[request_by, setRequest_by] = useState('')
    const[positive_prist,setPositive_prist] = useState('')
    const[quantity, setQuantity] = useState('')
    const[paid,setPaid] = useState('')
    const[tail_number, setTail_number] = useState("")
    const[service_date_deadline_by,setService_date_deadline_by] = useState('')
    const[service_time_deadline_by,setService_time_deadline_by] = useState('')
    const[is_completed, setIs_completed] = useState('') 
 

    const aircraft = useSelector((state) => state.aircraftReducer[aircraftId]);
    console.log("line23",aircraft)

    useEffect(() => {
        if (aircraftId) {
        dispatch(thunkGetSingleAircraft(aircraftId)); // Fetch aircraft data on component mount
        }
    }, [dispatch, aircraftId]);

    useEffect(() => {
        if (aircraft) {
        setTail_number(aircraft.tail_number || '');
        setFuel_type(aircraft.fuel_type || '');
    }
    }, [aircraft]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fuel_type',fuel_type);
        formData.append('request_by',request_by);
        formData.append('positive_prist',positive_prist);    
        formData.append('quantity', quantity);
        formData.append('paid',paid);
        formData.append('service_date_deadline_by',service_date_deadline_by);
        formData.append('service_time_deadline_by',service_time_deadline_by);
        formData.append('is_completed',is_completed);
        formData.append('tail_number', tail_number);

        try {
            await dispatch(thunkCreateFuelOrder(aircraftId, formData));
            navigate(`/fueling/request/list`)
            closeModal()     
        } catch (error) {
            console.log(error)
        }

    
    }



return (
        <div className="create-fuel-order-container">
            <h1>Create a Fuel Order</h1>
            <form className="create-fuel-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="tail_number">Tail Number:</label>
                    <input type="text" id="tail_number" value={tail_number} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="fuel_type">Fuel Type:</label>
                    <input type="text" id="fuel_type" value={fuel_type} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="request_by">Requested By:</label>
                    <input
                        type="text"
                        id="request_by"
                        value={request_by}
                        onChange={(e) => setRequest_by(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="positive_prist">Positive Prist:</label>
                    <select
                        id="positive_prist"
                        value={positive_prist}
                        onChange={(e) => setPositive_prist(e.target.value)}
                        required
                    >
                        <option value="">Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="NA">NA</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity of Fuel (Gallons):</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="paid">Service Paid?</label>
                    <select
                        id="paid"
                        value={paid}
                        onChange={(e) => setPaid(e.target.value)}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="is_completed">Status:</label>
                    <select
                        id="is_completed"
                        value={is_completed}
                        onChange={(e) => setIs_completed(e.target.value)}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Yes">Completed</option>
                        <option value="En Route">En Route</option>
                        <option value="No">Needs Servicing</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="service_date_deadline_by">Service Date Deadline:</label>
                    <input
                        type="date"
                        id="service_date_deadline_by"
                        value={service_date_deadline_by}
                        onChange={(e) => setService_date_deadline_by(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="service_time_deadline_by">Service Time Deadline:</label>
                    <input
                        type="time"
                        id="service_time_deadline_by"
                        value={service_time_deadline_by}
                        onChange={(e) => setService_time_deadline_by(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default CreateFuelOrder
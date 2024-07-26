import {useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { thunkCreateFuelOrder } from '../../redux/fueling'

const CreateFuelOrder = () => {
    const dispatch = useDispatch()

    const[fuel_type, setFuel_type] = useState('')
    const[request_by, setRequest_by] = useState('')
    const[positive_prist,setPositive_prist] = useState('')
    const[quantity, setQuantity] = useState('')
    const[paid,setPaid] = useState('')
    const[service_date_deadline_by,setService__date_deadline_by] = useState('')
    const[service_time_deadline_by,setService__time_deadline_by] = useState('')
    const[is_completed, setIs_completed] = useState('') 

    
    const handlSubmit = async (e) => {
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

        try {
            await dispatch(thunkCreateFuelOrder(formData));    
        } catch (error) {
            
        }

    
    }



return (
    <div className=''>
            <h1>Create a Fuel Order</h1>
        <form className='' onSubmit={handlSubmit}>
            <div className=''>
                <label>Fuel Type:</label>
                <select
                    value={fuel_type}
                    onChange={(e) => setFuel_type(e.target.value)}
                >
                    <option value="">Select Option</option>
                    <option value="Jet A">Jet A</option>
                    <option value="100ll AvGas">100ll AvGas</option>
                    <option value="94 unleaded">94 unleaded</option>
                    <option value="100 unleaded">100 unleaded</option>
                </select>
                <label>Request By:</label>
                <input type="text" value={request_by}
                onChange={(e) => setRequest_by(e.target.value)}
                />
            </div>
            <div>
                <label>Positive Prist</label>
                <select
                    value={positive_prist}
                    onChange={(e) => setPositive_prist(e.target.value)}
                >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="NA">NA</option>
                </select>
                <label>Quantity of Fuel in Gallons:</label>
                <input type='text' value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                />
            </div>
            <div>
                <label>Service Paid?</label>
                <select
                    value={paid}
                    onChange={(e) => setPaid(e.target.value)}
                >
                    <option value="">Select Status Type</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <label>Status?</label>
                {/* <select
                    value={is_completed}
                    onChange={(e) => setIs_completed(e.target.value)}
                >
                    <option value="">Select Status Type</option>
                    <option value="Yes">Completed</option>
                    <option value="En Route">En Route</option>
                    <option value="No">Needs servicing</option>
                </select> */}
            </div>
            <div>
                <label>Date needs to be Serviced By?</label>
                <input type="Date" value={service_date_deadline_by}
                onChange={(e) => setService__date_deadline_by(e.target.value)}
                />
            </div>
            <div>
                <label>Time needs to be Serviced By?</label>
                <input type="time" value={service_time_deadline_by}
                onChange={(e) => setService__time_deadline_by(e.target.value)}
                />
            </div>
            <button  type="submit">Submit</button>
        </form>
    </div>
)
}

export default CreateFuelOrder
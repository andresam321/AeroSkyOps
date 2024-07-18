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
    const[is_completed, setIs_completed] = useState('') 

    
    const handlSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fuel_type',fuel_type);
        formData.append('request_by',request_by);
        formData.append('positive_prist',positive_prist);    
        formData.append('quantity', quantity);
        formData.append('paid',paid);
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
                <label>Fuel Type</label>
                <input type='text' value={fuel_type} onChange={(e) => setFuel_type(e.target.value)}/>

            </div>
        



        </form>
    </div>
)
}

export default CreateFuelOrder
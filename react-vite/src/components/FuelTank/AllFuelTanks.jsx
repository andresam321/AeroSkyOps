import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkLoadAllTanks } from '../../redux/fuel_tank'
import FuelGauge from './FuelGauge';

const AllFuelTanks = () => {

    const dispatch = useDispatch()
    const tanks = useSelector((state) => state.fuelTankReducer.allTanks);

    console.log("line11",tanks)

    useEffect(() => {
        dispatch(thunkLoadAllTanks());
        // console.log("Tanks after dispatch:", tanks);
    }, [dispatch]);

return (

    <div className="tank-dashboard-container">
        {tanks && tanks.map((tank) => (
            <div key={tank.id} className="tank-item">
                <FuelGauge tank={tank} />
            </div>
            ))}
    </div>
    );
};

export default AllFuelTanks
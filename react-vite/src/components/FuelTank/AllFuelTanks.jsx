import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkLoadAllTanks } from '../../redux/fuel_tank'
import SingleFuelTank from './SingleFuelTank';
import FuelGauge from './FuelGauge';
import { NavLink } from 'react-router-dom';

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
        // <NavLink to={`/tank/${tank.id}`} className="nav-link">
        <div key={tank.id} className="tank-item">
                <FuelGauge tank={tank} />
            </div>
            // </NavLink>
            ))}
    </div>
    );
};

export default AllFuelTanks
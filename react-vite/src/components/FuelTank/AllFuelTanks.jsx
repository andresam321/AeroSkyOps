import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkLoadAllTanks } from '../../redux/fuel_tank'
import FuelGauge from './FuelGauge';
import { NavLink } from 'react-router-dom';
import CreateTank from './CreateTank';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

import "./AllFuelTanks.css"

const AllFuelTanks = () => {

    const dispatch = useDispatch()
    const tanks = useSelector((state) => state.fuelTankReducer.allTanks);

    // const {id} = tanks

    console.log("line11",tanks)

    useEffect(() => {
        dispatch(thunkLoadAllTanks());
        // console.log("Tanks after dispatch:", tanks);
    }, [dispatch]);

    
return (
<div className=''>
    <div className='create_tank_button'>
        <OpenModalButton
            buttonText={'Create Tank'}
            className=""
            modalComponent={<CreateTank/>}
        />
    </div>
    <div className="tank-dashboard-container">
    {tanks && tanks.map((tank) => (
            <div className="tank-item" key={tank.id}>
                <FuelGauge tank={tank} showUpdateButton={false}/>
            </div>
    ))}
</div>
</div>
    );
};

export default AllFuelTanks
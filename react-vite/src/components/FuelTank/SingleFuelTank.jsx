import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkLoadOneTank } from '../../redux/fuel_tank'
import { useParams } from 'react-router-dom'

const SingleFuelTank = () => {

    const dispatch = useDispatch()
    // let dispatch = useDispatch()
    const {tankId} = useParams()
    console.log("line11",tankId)

    const tank = useSelector((state) => state.fuelTankReducer[tankId]);
    console.log("line14",tank)

    useEffect(() => {
      dispatch(thunkLoadOneTank(tankId));
      // console.log("Tanks after dispatch:", tank);
  }, [dispatch]);
    // const tankId = useSelector((state) => state.fuelTankReducer[id])
  return (
    <div>
      <h1>hi</h1>
    </div>
  )
}

export default SingleFuelTank

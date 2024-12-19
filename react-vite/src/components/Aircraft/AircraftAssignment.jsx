import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllAircrafts, thunkAssignAircraftToParkingSpot } from '../../redux/aircraft';
import { thunkGetParkingSpotsByArea } from '../../redux/parking_spot';
import { useModal } from "../../context/Modal";
import "./Assignment.css";

const AircraftAssignment = ({ spotId, areaId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // console.log("line13",areaId)

    const allAircraft = useSelector((state) => state.aircraftReducer?.allAircraft || []);
    const [selectedAircraft, setSelectedAircraft] = useState(null);

    useEffect(() => {
        dispatch(thunkGetAllAircrafts());
    }, [dispatch]);

    const handleAssignAircraft = async (e) => {
        e.preventDefault();
        if (selectedAircraft) {
            try {
                const payload = {
                    aircraft_id: selectedAircraft.value,
                    parking_spot_id: spotId
                };
                const res = await dispatch(thunkAssignAircraftToParkingSpot(payload));
                if (res?.errors) {
                    console.log(res.errors); 
                } else {
                    closeModal(); 
                    await dispatch(thunkGetParkingSpotsByArea(areaId));
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const aircraftOptions = allAircraft.map(aircraft => ({
        value: aircraft.id,
        label: `${aircraft.model} - ${aircraft.tail_number}`
    }));

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '300px',
            minWidth: '300px',
        }),
    };

    return (
        <div className="assignment-container">
            <h3>Assign Aircraft to Parking Spot</h3>
            <form onSubmit={handleAssignAircraft}>
                <label htmlFor="aircraft">Aircraft:</label>
                <Select
                    id="aircraft"
                    name="aircraft"
                    options={aircraftOptions}
                    value={selectedAircraft}
                    onChange={(option) => setSelectedAircraft(option)}
                    placeholder="Select or Search an aircraft..."
                    styles={customStyles}
                />
                <div className="assignment-buttons">
                    <button type="submit">Assign</button>
                    <button type="button" onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AircraftAssignment;
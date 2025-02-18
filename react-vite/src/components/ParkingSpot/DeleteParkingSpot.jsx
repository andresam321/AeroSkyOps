import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { thunkDeleteParkingSpot } from "../../redux/parking_spot";
import { useState } from "react";
import "./DeleteParking.css"

const DeleteParkingSpot = () => {
    const { parking_spotId } = useParams();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // const allParkingSpots = useSelector((state) => state.parkingSpotReducer);


    const handleDelete = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await dispatch(thunkDeleteParkingSpot(parking_spotId));
            setIsLoading(false);

            if (res?.status === 400) {
                alert("Parking spot is assigned to an aircraft and cannot be deleted");
            } else {
                closeModal();
                navigate("/");
            }
        } catch (error) {
            setIsLoading(false);
            alert("An error occurred. Please try again.");
        }
    };

return (
<div className="delete-container">
    <form onSubmit={handleDelete} className="delete-form">
        <div className="delete-header">
            <h2>Confirm Delete</h2>
        </div>
        <div className="delete-message">
            <p>Are you sure you want to delete this aircraft?</p>
        </div>
        {/* <div className="delete-disclaimer">
            <h5>Disclaimer:</h5>
            <p>If a parking spot is assigned to an aircraft, it wont be deleted but will still navigate to the home page. The parking spot must be completely empty before being deleted.</p>
        </div> */}
        <div className="delete-buttons">
            <button type="submit" className="delete-button">Delete</button>
            <button onClick={() => closeModal()} className="cancel-button">Cancel</button>
        </div>
    </form>
</div>
)
}

export default DeleteParkingSpot;
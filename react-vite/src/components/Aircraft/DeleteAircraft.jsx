import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkDeleteAircraft } from "../../redux/aircraft";
import { useNavigate } from "react-router-dom";
import "../ParkingSpot/Delete.css"


const DeleteAircraft = () => {
    const {aircraftId} = useParams()
    const dispatch = useDispatch();
    const {closeModal} = useModal()
    const navigate = useNavigate()

    const handleDelete = async (e) => {
        e.preventDefault()

        await dispatch(thunkDeleteAircraft(aircraftId))
        navigate("/")
        closeModal()
    }


return (
    <div className="delete-container">
    <form onSubmit={handleDelete} className="delete-form">
        <div className="delete-header">
            <h2>Confirm Delete</h2>
        </div>
        <div className="delete-message">
            <p>Are you sure you want to delete this aircraft?</p>
        </div>
        {/* <div className="disclaimer">
            <p>Disclaimer: If an aircraft is assigned, it won&apos;t be deleted but will still navigate to the home page. Aircraft must be unassigned from parking before being completely deleted.</p>
        </div> */}
        <div className="delete-buttons">
            <button type="submit" className="delete-button">Delete</button>
            <button onClick={() => closeModal()} className="cancel-button">Cancel</button>
        </div>
    </form>
</div>
);
};


export default DeleteAircraft
import { useParams } from "react-router-dom"
import { thunkDeleteTankInfo } from "../../redux/fuel_tank"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"


const DeleteTank = () => {
    const {tankId} = useParams()
    // console.log("line10 id",tankId)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {closeModal} = useModal()

    const handleDelete = async (e) => {
        e.preventDefault()

        await dispatch(thunkDeleteTankInfo(tankId))
        navigate("/all/fuel/tanks")
        closeModal()
    }


  return (
    <div className="delete-container">
    <form onSubmit={handleDelete} className="delete-form">
        <div className="delete-header">
            <h2>Confirm Delete</h2>
        </div>
        <div className="delete-message">
            <p>Are you sure you want to delete this Tank?</p>
        </div>
        <div className="delete-buttons">
            <button type="submit" className="delete-button">Delete</button>
            <button onClick={closeModal} className="cancel-button">Cancel</button>
        </div>
    </form>
</div>
  )
}

export default DeleteTank

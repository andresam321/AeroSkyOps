const LOAD_ALL_HISTORY_THAT_CORRESPONDS_TO_PARKING_SPOT = "loadAllHistoryThatCorrespondsToParkingSpot/LOAD_ALL_HISTORY_THAT_CORRESPONDS_TO_PARKING_SPOT"

const getAllHistoryFromParkingSpot = (history) => ({
    type:LOAD_ALL_HISTORY_THAT_CORRESPONDS_TO_PARKING_SPOT,
    payload:history
})


export const thunkGetAllHistoryFromParkingSpot = (parking_spot_id) => async (dispatch) => {
    try {
        const res = await fetch(`/api/history/${parking_spot_id}`);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch history ');
        }

        const data = await res.json();
        // console.log("line13 history thunk, action", data);

        if (!data.errors) {
            await dispatch(getAllHistoryFromParkingSpot(data.history));
        }
    } catch (error) {
        console.error('Error fetching history:', error);
    
    }

}

function parkingHistoryReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_ALL_HISTORY_THAT_CORRESPONDS_TO_PARKING_SPOT: {
            const newState = { ...state };

            // Ensure action.payload is an array before using forEach
            if (Array.isArray(action.payload)) {
                const parking_spot_id = action.payload[0]?.parking_spot_id; // Get the parking_spot_id from the first history entry
                newState[parking_spot_id] = action.payload; // Store the array of history for that parking spot
            } else {
                console.error("Payload is not an array:", action.payload);
            }

            return newState;
        }

        default:
            return state;
    }
}

export default parkingHistoryReducer
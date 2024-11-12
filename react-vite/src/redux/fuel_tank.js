const LOAD_ALL_TANKS = "loadAllTanks/LOAD_ALL_TANKS"
const LOAD_ONE_TANK = "loadOneTank/LOAD_ONE_TANK"
const CREATE_TANK = "createTank/CREATE_TANK"

const getAllTanks = (tank) => ({
    type:LOAD_ALL_TANKS,
    payload:tank

})

const loadOneTank = (tank) => ({
    type:LOAD_ONE_TANK,
    payload: tank,
})

const createTank = (tank) => ({
    type:CREATE_TANK, 
    payload:tank
})


export const thunkLoadAllTanks = (tank) => async (dispatch) => {
    try {
        const res = await fetch(`/api/fuel_tank/all/tanks`)
        if (!res.ok) {
            const  errorData = await res.json();
            throw new Error(errorData.message || "failed to fetch tanks")
        }        

        const data = await res.jso()
        if(!data.errors) {
            await dispatch(getAllTanks(data))
        }
    } catch (error) {
        console.error('Error fetching tanks', error)
    }

}

export const thunkLoadOneTank = (id) => async (dispatch) => {
    try {
        const res = await fetch(`/api/fuel_tank/${id}`)
        if (!res.ok) {
            const  errorData = await res.json();
            throw new Error(errorData.message || "failed to fetch tank")
        }        

        const data = await res.jso()
        if(!data.errors) {
            await dispatch(loadOneTank(data))
        }
    } catch (error) {
        console.error('Error fetching tank', error)
    }
}

export const thunkCreateTank = (tank) => async (dispatch) => {
    try {
        const res = await fetch(`/api/fuel_tank/new`, {
            method: "POST",
            body:tank
        })
        if (!res.ok) {
            const  errorData = await res.json();
            throw new Error(errorData.message || "failed to create tank")
        }        

        const data = await res.jso()
        if(!data.errors) {
            await dispatch(createTank(data))
        }
    } catch (error) {
        console.error('Error creating tank', error)
    }

}


function fuelTankReducer(state = {}, action){
    switch(action.type){
        case LOAD_ALL_TANKS: {
            return {...state, allTanks: action.payload}
        }
        case LOAD_ONE_TANK: {
            const newState = { ...state, [action.payload.id]: action.payload };
            return newState;
        }
        case CREATE_TANK: {
            const newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        }
        default:
            return state;
    }
}

export default fuelTankReducer
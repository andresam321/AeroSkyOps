const LOAD_ALL_FUEL_PRICE = "loadAllFuelPrices/LOAD_ALL_FUEL_PRICE"
const EDIT_FUEL_PRICE = "editFuelPrice/EDIT_FUEL_PRICE"

const getAllFuelPrices = (price) => ({
    type:LOAD_ALL_FUEL_PRICE,
    payload:price
})


export const thunkGetAllFuelPrices = () => async (dispatch) => {
    try {

        const res = await fetch(`/api/prices/all_fuel_prices`)
        if (res.ok) {
        const data = await res.json()
        if (data.errors){
            return;
        }
        await dispatch(getAllFuelPrices(data.fuel_prices))
        console.log("line19", data)
    }        
    } catch (error) {
        console.log(error)
        
    }

}


function fuelPriceReducer(state = {}, action) {

    switch(action.type){
        case LOAD_ALL_FUEL_PRICES: {
            return {
                ...state,
                fuelPrices: action.payload
            }

        }
        default:
            return state;

    }


}

export default fuelPriceReducer
import { createSlice } from '@reduxjs/toolkit'


const initiateState = {
    user: ''
}



const userSlice = createSlice({
    name: "userDetails",
    initialState: initiateState,
    reducers: {
        getUserDetails: (state, action) => {
            state.user = action.payload
        },

    }
})


export const { getUserDetails } = userSlice.actions;
export default userSlice.reducer
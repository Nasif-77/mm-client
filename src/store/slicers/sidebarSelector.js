import { createSlice } from '@reduxjs/toolkit'

const sidebarSlice = createSlice({
    name: "sidebarSelector",
    initialState: {
        selected: ''
    },
    reducers: {
        handleSelected: (state, action) => {
            state.selected = action.payload
        }
    }
})


export const { handleSelected } = sidebarSlice.actions;
export default sidebarSlice.reducer
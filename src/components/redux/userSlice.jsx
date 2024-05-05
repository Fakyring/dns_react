import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'loggedUser',
    initialState: {
        role: undefined
    },
    reducers: {
        changeStatus: (state, role) => {
            state.role = role.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {changeStatus} = userSlice.actions

export default userSlice.reducer
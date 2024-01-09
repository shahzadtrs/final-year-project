import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    success: false,
    error: null,
}

const loaderSlice = createSlice({
    name: 'loader/loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
    },
})

const { actions, reducer } = loaderSlice
export const { setLoading } = actions
export default reducer

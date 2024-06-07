import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState:{
    currentUser : null
  },
  reducers: {
   setUser: (users, action) => {
    // console.log(usersSlice.reducer)
    // console.log('action ', action)
    // console.log('setUser ', setUser)
    console.log(users)
    users.currentUser = action.payload;
   }
  }
})

export const { setUser } = usersSlice.actions;
// console.log('actions ',usersSlice.actions)

export const selectUsers = state => state.users;

export default usersSlice.reducer;

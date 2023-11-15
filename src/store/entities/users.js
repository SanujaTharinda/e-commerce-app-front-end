import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../apiActions';
import { createSelector } from 'reselect';
import configData from '../../config.json';
import moment from 'moment';

//users slice
const slice = createSlice({
    name: "users",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        //Events => EventHandlers

        usersRegisterRequested(users, action) {
            delete users.registerSuccessful;
            users.registering = true;
        },

        usersRegisterRequestFailed(users, action) {
            users.registering = false;
        },

        usersRegisterRequestSucceeded(users, action) {
            delete users.registering;
            users.registerSuccessful = true;
            users.list.push(action.payload.data);
        },

        usersRequested(users, action){
            users.loading = true;
        },

        usersRequestFailed(users, action){
            users.loading = false;
            
        },

        usersReceived(users, action){
            users.list = action.payload.data;
            users.loading = false;
            users.lastFetch = Date.now();
        },


        // userRemoved(users, action){
            //const index = users.list.findIndex(p => p.userId !== action.payload);
            //users = users.list.splice(index, 1);   
        // },

        //userUpdated(users, action){
            // const index = users.list.findIndex(p => p.userId === action.payload.userId);
            // users.list.splice(index, 1);
            // users.list.push(action.payload);
        // },

        usersDeactivated(users, action){
            const { userId } = action.payload.data;
            const index = users.list.findIndex(u => u.userId === userId );
            users.list[index].activeStatus = false;
        },
        
        usersActivated(users, action){
            const { userId } = action.payload.data;
            const index = users.list.findIndex(u => u.userId === userId );
            users.list[index].activeStatus = true;
        },

        userMadeAdmin(users, action){
            console.log(action.payload);
            const { userId } = action.payload.data;
            const index = users.list.findIndex(u => u.userId === userId);
            users.list[index].usertype = "Administrator";
        }
    }
});

//Reducer
export default slice.reducer;

//Action Creators
export const { 
    usersRequested, 
    usersReceived,
    userCreated, 
    userRemoved, 
    userUpdated,
    usersRequestFailed,
    usersRegisterRequested,
    usersRegisterRequestFailed,
    usersRegisterRequestSucceeded,
    usersActivated, 
    usersDeactivated,
    userMadeAdmin } = slice.actions;

const usersURL = "user";
const refreshTime = configData.REFRESH_TIME;

//Action Invokers
export const loadUsers = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.users;

    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    if (diffInMinutes < refreshTime) return;
    
    return dispatch(
        apiCallBegan({
            url: usersURL + '/view',
            onStart: usersRequested.type,
            onSuccess: usersReceived.type,
            onError: usersRequestFailed.type
        })
    );
};

export const getAllUsers = createSelector(
    state => state.entities.users,
    users => users
);

export const registerUser = (user) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: `${usersURL}/register`,
            method: "post",
            data: user,
            onStart: usersRegisterRequested,
            onSuccess: usersRegisterRequestSucceeded.type,
            onError: usersRegisterRequestFailed
        })
    );
}


export const deactivateUser = (userId) =>{
    return apiCallBegan({
        url: `${usersURL}/change-account-status`,
        method: "put",
        data: {userId, activeStatus: false},
        onSuccess: usersDeactivated.type,
    });
}

export const activateUser = (userId) =>{
    return apiCallBegan({
        url: `${usersURL}/change-account-status`,
        method: "put",
        data: {userId, activeStatus: true},
        onSuccess: usersActivated.type,
    });
}

export const makeUserAdmin = (userId) => {
    return apiCallBegan({
        url: `${usersURL}/make-admin`,
        method: "put",
        data: { userId },
        onSuccess: userMadeAdmin.type,
    });
}


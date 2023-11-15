import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../apiActions';
import { createSelector } from 'reselect';
import configData from '../../config.json';
import moment from 'moment';

//Customers slice
const slice = createSlice({
    name: "customers",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        //Events => EventHandlers

        customersRegisterRequested(customers, action) {
            delete customers.registerSuccessful;
            customers.registering = true;
        },

        customersRegisterRequestFailed(customers, action) {
            customers.registering = false;
        },

        customersRegisterRequestSucceeded(customers, action) {
            delete customers.registering;
            customers.registerSuccessful = true;
            customers.list.push(action.payload.data);
        },

        customersRequested(customers, action){
            customers.loading = true;
        },

        customersRequestFailed(customers, action){
            customers.loading = false;
            
        },

        customersReceived(customers, action){
            customers.list = action.payload.data;
            customers.loading = false;
            customers.lastFetch = Date.now();
        },

        customerDeactivated(customers, action){
            const { customerId } = action.payload.data;
            const index = customers.list.findIndex(c => c.customerId === customerId );
            customers.list[index].activeStatus = false;
        },
        
        customerActivated(customers, action){
            const { customerId } = action.payload.data;
            const index = customers.list.findIndex(c => c.customerId === customerId );
            customers.list[index].activeStatus = true;
        },

        customersUpdated(customers, action){
            const { customerId } = action.payload.data;
            const index = customers.list.findIndex(c => c.customerId === customerId);
            customers.list[index] = action.payload.data;
            
        },

        customerUsernameUpdated(customers,action){
            const { username} = action.payload.data;
            const index = customers.list.findIndex(c => c.username=== username);
            customers.list.splice(index, 1);
            customers.list.push(action.payload);
        },

        customerPasswordUpdated(customers,action){
            const { customerId} = action.payload.data;
            console.log(action.payload.data);
            const index = customers.list.findIndex(c => c.customerId=== customerId);
            customers.list.splice(index, 1);
            customers.list.push(action.payload);
        }

    }
});

//Reducer
export default slice.reducer;

//Action Creators
export const { 
    customersRequested, 
    customersReceived,
    customerCreated,
    customerActivated, 
    customerDeactivated,
    customersUpdated,
    customersRequestFailed,
    customersRegisterRequested,
    customersRegisterRequestFailed,
    customersRegisterRequestSucceeded,
    customerUsernameUpdated ,
    customerPasswordUpdated   } = slice.actions;

const customersURL = "customer";
const refreshTime = configData.REFRESH_TIME;

//Action Invokers
export const loadCustomers = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.customers;

    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    if (diffInMinutes < refreshTime) return;
    
    return dispatch(
        apiCallBegan({
            url: customersURL + '/view',
            onStart: customersRequested.type,
            onSuccess: customersReceived.type,
            onError: customersRequestFailed.type
        })
    );
};

export const getAllCustomers = createSelector(
    state => state.entities.customers.list,
    customers => customers
);

export const registerCustomer = (customer) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: `${customersURL}/register`,
            method: "post",
            data: customer,
            onStart: customersRegisterRequested,
            onSuccess: customersRegisterRequestSucceeded.type,
            onError: customersRegisterRequestFailed
        })
    );
}

export const deactivateCustomer = (customerId) =>{
        return apiCallBegan({
            url: `${customersURL}/change-account-status`,
            method: "put",
            data: {customerId, activeStatus: false},
            onSuccess: customerDeactivated.type,
        });
}


export const activateCustomer = (customerId) =>{
    return apiCallBegan({
        url: `${customersURL}/change-account-status`,
        method: "put",
        data: {customerId, activeStatus: true},
        onSuccess: customerActivated.type,
    });
}

export const updateCustomerDetails = (customer) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: `${customersURL}/update-details`,
            method: "put",
            data: customer,
            onSuccess: customersUpdated.type,
        })
    );
}

export const updateCustomerUsername = (username) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: `${customersURL}/change-username`,
            method: "put",
            data: username,
            onSuccess: customerUsernameUpdated.type,
        })
    );
}

export const updateCustomerPassword = (customerId) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: `${customersURL}/change-password`,
            method: "put",
            data: customerId,
            onSuccess: customerPasswordUpdated.type,
        })
    );
}
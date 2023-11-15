import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../apiActions';
import { createSelector } from 'reselect';
import configData from '../../config.json';
import moment from 'moment';


//Categories Slice
const slice = createSlice({
    name: 'customAttributes',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {

        // Events => EventHandlers
        customAttributesRequested(customAttributes, action) {
            customAttributes.loading = true;
        },

        customAttributesRequestFailed(customAttributes, action) {
            customAttributes.loading = false;
        },

        // // payload: [message: , data: ]
        customAttributesReceived(customAttributes, action) {
            customAttributes.list = action.payload.data;
            customAttributes.loading = false;
            customAttributes.lastFetch = Date.now();
        },

        addCustomAttributeRequested(customAttributes, action) {
            customAttributes.adding = true;
            customAttributes.added = false;
        },

        addCustomAttributeRequestFailed(customAttributes, action) {
            customAttributes.adding = false;
        },

        addCustomAttributeRequestSucceeded(customAttributes, action) {
            customAttributes.adding = false;
            customAttributes.added = true;
            customAttributes.list.push(action.payload.data);
        }
    }
});

//Reducer
export default slice.reducer;

//Action Creators
export const {
    customAttributesRequested,
    customAttributesRequestFailed,
    customAttributesReceived,
    addCustomAttributeRequested,
    addCustomAttributeRequestFailed,
    addCustomAttributeRequestSucceeded } = slice.actions;

const customAttributesURL = "product";
const refreshTime = configData.REFRESH_TIME;




//Action Invokers
export const loadCustomAttributes = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.customAttributes;

    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    if (diffInMinutes < refreshTime) return;

    return dispatch(
        apiCallBegan({
            url: customAttributesURL + '/custom-attribute-view',
            onStart: customAttributesRequested.type,
            onSuccess:  customAttributesReceived.type,
            onError: customAttributesRequestFailed.type
        })
    );
};


export const addCustomAttribute = (name, type) => {

    return (apiCallBegan({
        url: customAttributesURL + '/custom-attribute-register',
        data: { name, dataType: type },
        method: 'post',
        onStart: addCustomAttributeRequested.type,
        onSuccess: addCustomAttributeRequestSucceeded.type,
        onError: addCustomAttributeRequestFailed.type
    }))
}


//Selectors 

export const getAllCustomAttributes = createSelector(
    state => state.entities.customAttributes.list,
    attributes => attributes
)
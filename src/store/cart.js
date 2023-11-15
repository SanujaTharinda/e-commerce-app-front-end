import { createSelector, createSlice } from '@reduxjs/toolkit';

//Cart Slice 
const slice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        
        /**
         * action.payload: productObject
         */  
        itemAdded(items, action){
            const newItem = action.payload
            const index = items.findIndex(i => i.productId === newItem.productId && i.variantName === newItem.variantName);
            if(index === -1){
                items.push(newItem);
                return;
            }
            let itemInCart = items[index];
            const updatedItem = { ...itemInCart, quantity: itemInCart.quantity + newItem.quantity, total: itemInCart.total + newItem.total};
            items[index] = updatedItem;
        },
  
        /**
         * action.payload: productID
         */
        itemRemoved(items, action){
            const index = items.findIndex(i => i.productId === action.payload.productId && i.variantName === action.payload.variantName);
            if(index !== -1){
                items = items.splice(index, 1);
            }
        },

        /**
         * action.payload: {productId, count: New Count,}
         */
        itemCountUpdated(items, action){
            const index = items.findIndex(i => i.product.productId === action.payload.productId);
            if (index !== -1) {
                items[index].count = action.payload.count; 
            }
        },

        /**
         * action.payload: None
         */
        cartEmptied(items, action){
            items = items.splice(0, items.length);
        }
    }
});


//Reducer
export default slice.reducer;

//Action Creators
export const { itemAdded, itemRemoved, cartEmptied, itemCountUpdated } = slice.actions;

//Action Invokers
export const addToCart = item => itemAdded(item);

export const removeFromCart = (productId,variantName) => itemRemoved({productId, variantName});

export const updateItemCount = (productId, newCount) => itemCountUpdated({productId, count:newCount})

export const emptyCart = () => cartEmptied();

export const getItemsInCart = createSelector(
    state => state.cart,
    cart => cart
);

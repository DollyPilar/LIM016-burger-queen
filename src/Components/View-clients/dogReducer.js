import {Types} from './dogAction.js'
export const shoppingInitialSate = {
    products:[
        {id: 1, name: 'correa', price:100 },
        {id: 2, name: 'correa 2', price:200 },
        {id: 3, name: 'correa 3', price:300 },
        {id: 4, name: 'correa 4', price:400 },
        {id: 5, name: 'correa 5', price:500 },
        {id: 6, name: 'correa 6', price:600 }
    ],
    cart:[],
}

export function shoppingReducer (state, actions) {
    switch (actions.type){
        case Types.AddToCart:{
            let newItem = state.products.find(product => product.id === actions.payload);
            // console.log(newItem)
            let itemInCart = state.cart.find(item => item.id === newItem.id);

            return itemInCart 
            ? {
                ...state,
                cart: state.cart.map((item) => 
                item.id === newItem.id 
                ? {...item, quantity: 
                item.quantity + 1} : item), 
            }
            :
            { ...state,
                 cart: [...state.cart, {...newItem, quantity: 1}]}
        
           
        }

        case Types.RemoveOneFromCart:{
        let itemToDelete = state.cart.find(item => item.id === actions.payload)
        return itemToDelete.quantity > 1 
        ? {
           
             ...state,
             cart: state.cart.map((item) => 
             item.id === actions.payload 
             ? {...item, quantity: 
             item.quantity -1 } : item), 
        }
        :{
            ...state,
            cart: state.cart.filter((item) => item.id !== actions.payload),
        }
            
        }
        case Types.RemoveAllFromCart:{
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== actions.payload),
            }
            
        }
        case Types.ClearCart:
            return shoppingInitialSate;
        default:
            return state
    }
}
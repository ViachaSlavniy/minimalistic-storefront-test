const initialState = {
    activeCurrency: {},
    cartProducts: [],
    totalPrice: 0,
    currentCurrency: {},
}

const getTotalPrice = (cartProducts, state, curr = null) => {
    let totalPrice = 0
    const newCurrency = curr ? curr.name : state.currentCurrency.name
    cartProducts.forEach(product => {
        product.prices.forEach(price => {
            if (price.currency === newCurrency) {
                totalPrice = totalPrice + (price.amount * product.count)
            }
        })
    })
    return Math.round(totalPrice * 100) / 100
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            const selectedProduct = action.payload.product
            const selectedActiveAttrItems = action.payload.activeAttrItems
            const addedProduct = {
                ...selectedProduct,
                activeAttributes: [...selectedActiveAttrItems],
                count: 1
            }

            const getNewCartProducts = () => {
                let isDouble;
                state.cartProducts.forEach(prod => {
                    isDouble = prod.activeAttributes.every(item => {
                        return selectedActiveAttrItems.find(selectedItem => {
                            return selectedItem.id === item.id
                        })
                    })
                })

                if (state.cartProducts.length > 0 && isDouble) {
                    return state.cartProducts.map(prod => {
                        const doubleProd = prod.activeAttributes.every(item => {
                            return selectedActiveAttrItems.find(selectedItem => selectedItem.id === item.id)
                        })
                        if (doubleProd) {
                            return {
                                ...prod,
                                count: prod.count + 1
                            }
                        } else {
                            return prod
                        }
                    })
                }
                return [...state.cartProducts, addedProduct]
            }


            const newCartProducts = getNewCartProducts()
            const totalPrice = getTotalPrice(newCartProducts, state)
            return {
                ...state,
                cartProducts: newCartProducts,
                totalPrice
            }
        case 'SET_CURRENCY': {
            const totalPrice = getTotalPrice(state.cartProducts, state, action.payload.currency)
            return {
                ...state,
                currentCurrency: action.payload.currency,
                totalPrice
            }
        }
        case 'DELETE_PRODUCT':
            return state
        case 'INCREMENT': {
            const newCartProducts = state.cartProducts.map(prod => {
                if (prod === action.payload.product) {
                    return {
                        ...prod,
                        count: prod.count + 1
                    }
                } else {
                    return prod
                }
            });
            const totalPrice = getTotalPrice(newCartProducts, state)

            return {
                ...state,
                cartProducts: [...newCartProducts],
                totalPrice
            }
        }
        case 'DECREMENT': {
            const newCartProducts = state.cartProducts.map(prod => {
                if (prod === action.payload.product) {
                    return {
                        ...prod,
                        count: prod.count === 1 ? 1 : prod.count - 1
                    }
                } else {
                    return prod
                }
            });
            const totalPrice = getTotalPrice(newCartProducts, state)
            return {
                ...state,
                cartProducts: [...newCartProducts],
                totalPrice
            }
        }
        default:
            return state
    }
}


export const increment = (product) => ({type: 'INCREMENT', payload: {product}});
export const decrement = (product) => ({type: 'DECREMENT', payload: {product}});
export const setCurrency = (currency) => ({type: 'SET_CURRENCY', payload: {currency}});
export const addProduct = (product, activeAttrItems) => ({type: 'ADD_PRODUCT', payload: {product, activeAttrItems}});
export const deleteProduct = (productName) => ({type: 'DELETE_PRODUCT', payload: {productName}});
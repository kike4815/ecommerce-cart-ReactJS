import React, { useState, useEffect } from 'react'
import TopMenu from './componentes/TopMenu'
import { URL_API, STORAGE_PRODUCTS_CART } from './utils/constants'
import useFetch from './Hooks/useFetch'
import Products from './componentes/Products'
import { ToastContainer, toast } from 'react-toastify'

function App () {
    const products = useFetch(URL_API)
    const [ productsCart, setProductsCart ] = useState([])

    useEffect(() => {
        getProductsCart()
    }, [])

    /* FUNCTION BELOW WE DO IT BECAUSE WHEN WE RECHARGE THE PAGE, WE WILL LOOSE DATA OF USESTATE*/

    const getProductsCart = () => {
        const idProducts = localStorage.getItem(STORAGE_PRODUCTS_CART)

        if (idProducts) {
            const idProductsSplit = idProducts.split(',') //CONVERT TO ARRAY
            setProductsCart(idProductsSplit)
        } else {
            setProductsCart([])
        }
    }

    const addProductCart = (id, name) => {
        const idsProducts = productsCart
        idsProducts.push(id)
        setProductsCart(idsProducts)
        localStorage.setItem(STORAGE_PRODUCTS_CART, productsCart)
        getProductsCart()
        toast.success(`${name} añadido correctamente!!`)
    }

    return (
        <div className="App">
            <TopMenu productsCart={productsCart} getProductsCart={getProductsCart} products={products} />
            <Products products={products} addProductCart={addProductCart} />
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange={false}
                draggable
                pauseOnHover={false}
            />
        </div>
    )
}

export default App

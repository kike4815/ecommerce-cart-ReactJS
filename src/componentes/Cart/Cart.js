import React,{useState,useEffect} from 'react'
import {Button} from 'react-bootstrap'
import {ReactComponent as CartEmpty} from '../../assets/svg/cart-empty.svg'
import {ReactComponent as CartFull} from '../../assets/svg/cart-full.svg'
import {ReactComponent as CartCross} from '../../assets/svg/close.svg'
import {ReactComponent as Garbage} from '../../assets/svg/garbage.svg'
import {STORAGE_PRODUCTS_CART,BASE_PATH} from '../../utils/constants'
import {removeArrayDuplicates,countDuplicatedItemArray, removeItemArray} from '../../utils/arrayFunctions'

import './Cart.scss'

export default function Cart(props) {
    const {productsCart,getProductsCart,products} = props
    const [cartOpen, setCartOpen] = useState(false)
    const widthCartContent = cartOpen ? 400 : 0
    const [singleProductCart, setSingleProductCart] = useState([])
    const [cartTotalPrice, setCartTotalPrice] = useState(0)

    useEffect(() => {
        const allProductsId = removeArrayDuplicates(productsCart)
        setSingleProductCart(allProductsId)    
    },[productsCart])

    useEffect(() => {
       const productData = [] 
       let totalPrice = 0
       const  allProductsId = removeArrayDuplicates(productsCart)
       allProductsId.forEach(productId => {
           const quantity = countDuplicatedItemArray(productId, productsCart)
           const productValue = {
                id:productId,
                quantity:quantity
           }
        productData.push(productValue)   
       }); 
       if(!products.loading && products.result){
           products.result.forEach(product => {
            productData.forEach(item => {
                if(product.id == item.id){
                    const totalValue = product.price * item.quantity
                    totalPrice = totalPrice + totalValue
                }
            })
           });
       }
       setCartTotalPrice(totalPrice)
    },[productsCart,products])

    const openCart = ()=> {
        setCartOpen(true)
        document.body.style.overflow = 'hidden' // para no poder hacer scroll hasta que cerremos el div del carrito 
    }

    const closeCart = ()=> {
        setCartOpen(false)
        document.body.style.overflow = 'scroll'
    }

    const emptyCart =()=> {
        localStorage.removeItem(STORAGE_PRODUCTS_CART)
        getProductsCart()
    }

    const increaseQuantity = (id) => {
        const arrayItemsCart = productsCart
        arrayItemsCart.push(id)
        localStorage.setItem(STORAGE_PRODUCTS_CART, arrayItemsCart)
        getProductsCart()
    }

    const decreaseQuantity = (id) => {
        const arrayItemsCart = productsCart
        const result = removeItemArray(arrayItemsCart,id.toString())
        localStorage.setItem(STORAGE_PRODUCTS_CART, result)
        getProductsCart()
    }

    return (
        <>
           <Button variant='link' className='cart'>
               {productsCart.length > 0 ? (
                   <CartFull onClick={openCart} />
               ):(

               <CartEmpty onClick={openCart}/>
               )}
            </Button>
            <div className='cart-content'style={{width:widthCartContent}}>
            <CartContentHeader closeCart={closeCart} emptyCart={emptyCart}/>
            <div className='cart-content__products'>

            {singleProductCart.map((idPproductsCart,index) => (
            <CartContentProducts 
            key={index} 
            products={products} //objeto array de la API
            idsProductsCart={productsCart} //array productos repetidos
            idProductCart={idPproductsCart} //array productos eliminando productos repetidos
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            />
            ))}
            </div>
            <CartContentFooter cartTotalPrice={cartTotalPrice}/>
            </div> 
        </>
    )
}

function CartContentHeader (props) {
    const {closeCart,emptyCart} = props
    return (
        <div className='cart-content__header'>
            <div>
                <CartCross onClick={closeCart}/>
                <h2>Carrito</h2>
            </div>
            <Button variant='link'onClick={emptyCart}>
                Vaciar
            <Garbage />
            </Button>
        </div>
    )
}

function CartContentProducts (props) {
    const {
        products:{loading,result},
        idsProductsCart,   //array productos repetidos
        idProductCart, //array productos eliminando productos repetidos
        increaseQuantity,
        decreaseQuantity
    } = props

    if(!loading && result ){
        return result.map((product,index) => {
            if(idProductCart == product.id){
                const quantity = countDuplicatedItemArray(product.id, idsProductsCart)
                return (
                    <RenderProduct 
                    key={index}
                    product={product}
                    quantity={quantity}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    />
                );
            }
        });
    }

    return null
}

function RenderProduct (props) {
    const {product, quantity,increaseQuantity,decreaseQuantity} = props
    
    return (
        <div className='cart-content__product'>
            <img src={`${BASE_PATH}/${product.image}`} alt={product.name}/>
            <div className='cart-content__product-info'>
                <h3>{product.name.substr(0, 25)}...</h3>
                <p>{product.price.toFixed(2)} €/Unidad</p>
            <div>
                <p>En el carrito: {quantity} ud.</p>
                <div>
                    <button onClick={() => increaseQuantity(product.id)}>+</button>
                    <button onClick={()=> decreaseQuantity(product.id)}>-</button>
                </div>
            </div>
            </div>
        </div>
    )
}

function CartContentFooter (props) {
    const {cartTotalPrice} = props

    return  (
        <div className='cart-content__footer'>
            <div>
                <p>Precio total: </p>
                <p>{cartTotalPrice.toFixed(2)} €</p>
            </div>
            <Button>Tramitar pedido</Button>
        </div>
    )
}
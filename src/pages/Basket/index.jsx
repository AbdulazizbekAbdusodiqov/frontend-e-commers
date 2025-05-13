"use client"

import { useState, useEffect } from "react"
import ProductTable from "./ProductTable"
import { HiOutlineArrowRight } from "react-icons/hi"
import { HiTag } from "react-icons/hi2"
import "./Basket.scss"

const Basket = () => {
  
  const [products, setProducts] = useState([])
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    discount: 0,
    deliveryFee: 0,
    total: 0,
  })

  useEffect(()=>{
    try {
      let storageProducts = localStorage.getItem("products") || "[]"
      console.log(JSON.parse(storageProducts));
      storageProducts = JSON.parse(storageProducts)
      setProducts(storageProducts)
    } catch (error) {
      console.log(error);
      
    }
  },[])

  const calculateOrderSummary = () => {
    const subtotal = products.reduce((sum, product) => {
      const price = Number.parseFloat(product.price) || 0
      const quantity = product.quantity || 1
      return sum + price * quantity
    }, 0)

    const discountRate = 0.2 
    const discount = promoApplied ? subtotal * discountRate : 0

    const freeDeliveryThreshold = 500
    const deliveryFeeAmount = 15
    const deliveryFee = subtotal === 0 ? 0 : subtotal >= freeDeliveryThreshold ? 0 : deliveryFeeAmount

    const total = subtotal - discount + deliveryFee

    setOrderSummary({
      subtotal,
      discount,
      discountRate: promoApplied ? discountRate : 0,
      deliveryFee,
      total,
      isFreeDelivery: subtotal >= freeDeliveryThreshold && subtotal > 0,
    })
  }

  useEffect(() => {
    calculateOrderSummary()
  }, [products, promoApplied])

  const handleQuantityChange = (id, newQuantity) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    );
  
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };
  
  const handleRemoveProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
  
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };
  
  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "discount20") {
      setPromoApplied(true)
    } else {
      alert("Invalid promo code")
      setPromoApplied(false)
    }
  }

  return (
    <div className="basket-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/">Home</a>
        <span className="separator">&gt;</span>
        <span className="current">Cart</span>
      </div>

      <h1 className="basket-title">YOUR CART</h1>

      <div className="basket-content">
        <div className="products-container">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-item">
                <ProductTable
                  product={product}
                  onQuantityChange={(quantity) => handleQuantityChange(product.id, quantity)}
                  onRemove={() => handleRemoveProduct(product.id)}
                />
              </div>
            ))
          ) : (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <a href="/shop" className="continue-shopping">
                Continue Shopping
              </a>
            </div>
          )}
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span className="price">${orderSummary.subtotal.toFixed(2)}</span>
          </div>

          {promoApplied && (
            <div className="summary-row discount">
              <span>Discount (-20%)</span>
              <span className="price discount-amount">-${orderSummary.discount.toFixed(2)}</span>
            </div>
          )}

          {orderSummary.subtotal > 0 && !orderSummary.isFreeDelivery && (
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span className="price">${orderSummary.deliveryFee.toFixed(2)}</span>
            </div>
          )}

          {orderSummary.isFreeDelivery && (
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span className="price free-delivery">Free</span>
            </div>
          )}

          <div className="summary-row total">
            <span>Total</span>
            <span className="price">${orderSummary.total.toFixed(2)}</span>
          </div>

          <div className="promo-code">
            <div className="promo-input">
              <HiTag className="promo-icon" />
              <input
                type="text"
                placeholder="Add promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
            </div>
            <button className="apply-button" onClick={handleApplyPromo} disabled={!promoCode}>
              Apply
            </button>
          </div>

          <button className="checkout-button" disabled={products.length === 0}>
            Go to Checkout
            <HiOutlineArrowRight className="arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Basket

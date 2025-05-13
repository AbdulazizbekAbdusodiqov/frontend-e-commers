"use client"

import { useState } from "react"
import { HiTrash } from "react-icons/hi2"
import { FaPlus, FaMinus } from "react-icons/fa6"

import "./ProductTable.scss"

const ProductTable = ({ product, onQuantityChange, onRemove }) => {
  const [quantity, setQuantity] = useState(product?.quantity || 1)

  const handleIncrease = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    if (onQuantityChange) {
      onQuantityChange(newQuantity)
    }
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      if (onQuantityChange) {
        onQuantityChange(newQuantity)
      }
    }
  }

  const handleRemove = () => {
    if (onRemove) {
      onRemove()
    }
  }

  return (
    <div className="product-wrapper">
      <div className="product-image">
        <img
          src={product?.images[0]}
          alt={product?.title || "Product"}
        />
      </div>
      <div className="product-info">
        <h4 className="product-title">{product?.title || "Gradient Graphic T-shirt"}</h4>
        <p className="product-detail">
          Size: <span>{product?.size || "Large"}</span>
        </p>
        <p className="product-detail">
          Color: <span>{product?.color || "White"}</span>
        </p>
        <h3 className="product-price">${product?.price || "145"}</h3>
      </div>
      <div className="product-actions">
        <button className="delete-button" aria-label="Remove item" onClick={handleRemove}>
          <HiTrash size={18} />
        </button>
        <div className="quantity-control">
          <button
            className="quantity-button decrease"
            onClick={handleDecrease}
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
          >
            <FaMinus size={14} />
          </button>
          <span className="quantity-value">{quantity}</span>
          <button className="quantity-button increase" onClick={handleIncrease} aria-label="Increase quantity">
            <FaPlus size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductTable

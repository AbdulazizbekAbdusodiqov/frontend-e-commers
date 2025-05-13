"use client"

import { useEffect, useState } from "react"
import ReactRangeSliderInput from "react-range-slider-input"
import { HiChevronRight, HiChevronDown } from "react-icons/hi2"
import { getProductsCategoryFilterApi } from "../../../api/product"

import "react-range-slider-input/dist/style.css"
import "./CategoryDetails.scss"

const CategoryDetails = ({ onFilterChange, initialCategory = "" }) => {
  const [priceRange, setPriceRange] = useState([50, 500])
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedStyles, setSelectedStyles] = useState([])

  const [expandedSections, setExpandedSections] = useState({
    colors: true,
    size: true,
    dressStyle: true,
  })

  const [availableColors, setAvailableColors] = useState([])
  const [availableSizes, setAvailableSizes] = useState([])
  const [availableStyles, setAvailableStyles] = useState([])

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const handleColorSelect = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    } else {
      setSelectedColors([...selectedColors, color])
    }
  }

  const handleSizeSelect = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size))
    } else {
      setSelectedSizes([...selectedSizes, size])
    }
  }

  const handleStyleSelect = (style) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== style))
    } else {
      setSelectedStyles([...selectedStyles, style])
    }
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  const applyFilters = () => {
    const filters = {
      category: selectedCategory,
      priceRange,
      colors: selectedColors,
      sizes: selectedSizes,
      styles: selectedStyles,
    }

    if (onFilterChange) {
      onFilterChange(filters)
    }
  }

  const resetFilters = () => {
    setPriceRange([50, 500])
    setSelectedColors([])
    setSelectedSizes([])
    setSelectedStyles([])
  }

  useEffect(() => {
    const el = document.querySelectorAll(".range-slider__thumb")

    if (!!el[0] && !!el[1]) {
      el[0].innerHTML = `<span class="price-thumb-label">$${priceRange[0]}</span>`
      el[1].innerHTML = `<span class="price-thumb-label">$${priceRange[1]}</span>`
    }
  }, [priceRange])

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const products = await getProductsCategoryFilterApi(selectedCategory)

        const colors = [...new Set(products.map((p) => p.color).filter(Boolean))]
        const sizes = [...new Set(products.map((p) => p.size).filter(Boolean))]
        const styles = [...new Set(products.map((p) => p.style).filter(Boolean))]

        setAvailableColors(
          colors.map((color, index) => ({
            id: index + 1,
            name: color,
            value: getColorHex(color),
          })),
        )

        setAvailableSizes(
          sizes.map((size, index) => ({
            id: index + 1,
            name: size,
          })),
        )

        setAvailableStyles(
          styles.map((style, index) => ({
            id: index + 1,
            name: style,
          })),
        )
      } catch (error) {
        console.error("Error fetching filter options:", error)
      }
    }

    fetchFilterOptions()
  }, [selectedCategory])

  useEffect(() => {
    applyFilters()
  }, [priceRange, selectedColors, selectedSizes, selectedStyles, selectedCategory])

  const categories = [
    { id: 1, name: "T-shirt" },
    { id: 2, name: "Men's-shoes" },
    { id: 3, name: "Pants" },
    { id: 4, name: "Socks" },
  ]

  const getColorHex = (colorName) => {
    const colorMap = {
      White: "#ffffff",
      Black: "#000000",
      Red: "#e74c3c",
      Blue: "#3498db",
      Green: "#2ecc71",
      Yellow: "#f1c40f",
      Orange: "#e67e22",
      Purple: "#9b59b6",
      Pink: "#fd79a8",
      Brown: "#795548",
      Gray: "#95a5a6",
    }

    return colorMap[colorName] || "#cccccc"
  }

  return (
    <div className="filter-sidebar">
      <h2 className="filter-header">Filters</h2>

      {/* Categories */}
      <div className="filter-section">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-item ${selectedCategory === category.name ? "active" : ""}`}
            onClick={() => handleCategorySelect(category.name)}
          >
            <span>{category.name}</span>
            <HiChevronRight className="chevron-icon" />
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className="filter-section">
        <h3 className="section-title">Price</h3>
        <div className="price-slider-container">
          <ReactRangeSliderInput
            className="price-slider"
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onInput={setPriceRange}
          />
        </div>
      </div>

      {/* Colors */}
      <div className="filter-section">
        <div className="section-header" onClick={() => toggleSection("colors")}>
          <h3 className="section-title">Colors</h3>
          {expandedSections.colors ? (
            <HiChevronDown className="chevron-icon" />
          ) : (
            <HiChevronRight className="chevron-icon" />
          )}
        </div>

        {expandedSections.colors && (
          <div className="color-options">
            {availableColors.length > 0
              ? availableColors.map((color) => (
                  <button
                    key={color.id}
                    className={`color-option ${selectedColors.includes(color.name) ? "selected" : ""}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleColorSelect(color.name)}
                    aria-label={color.name}
                  />
                ))
              : // Default colors if none available from API
                [
                  { id: 1, name: "Green", value: "#2ecc71" },
                  { id: 2, name: "Red", value: "#e74c3c" },
                  { id: 3, name: "Orange", value: "#e67e22" },
                  { id: 4, name: "Yellow", value: "#f1c40f" },
                  { id: 5, name: "Blue", value: "#3498db" },
                  { id: 6, name: "Purple", value: "#9b59b6" },
                  { id: 7, name: "Pink", value: "#fd79a8" },
                  { id: 8, name: "White", value: "#ffffff" },
                  { id: 9, name: "Black", value: "#000000" },
                ].map((color) => (
                  <button
                    key={color.id}
                    className={`color-option ${selectedColors.includes(color.name) ? "selected" : ""}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleColorSelect(color.name)}
                    aria-label={color.name}
                  />
                ))}
          </div>
        )}
      </div>

      {/* Size */}
      <div className="filter-section">
        <div className="section-header" onClick={() => toggleSection("size")}>
          <h3 className="section-title">Size</h3>
          {expandedSections.size ? (
            <HiChevronDown className="chevron-icon" />
          ) : (
            <HiChevronRight className="chevron-icon" />
          )}
        </div>

        {expandedSections.size && (
          <div className="size-options">
            {availableSizes.length > 0
              ? availableSizes.map((size) => (
                  <button
                    key={size.id}
                    className={`size-option ${selectedSizes.includes(size.name) ? "selected" : ""}`}
                    onClick={() => handleSizeSelect(size.name)}
                  >
                    {size.name}
                  </button>
                ))
              : // Default sizes if none available from API
                [
                  { id: 1, name: "XS Small" },
                  { id: 2, name: "S Small" },
                  { id: 3, name: "Small" },
                  { id: 4, name: "Medium" },
                  { id: 5, name: "Large" },
                  { id: 6, name: "X Large" },
                  { id: 7, name: "XX Large" },
                  { id: 8, name: "4X Large" },
                ].map((size) => (
                  <button
                    key={size.id}
                    className={`size-option ${selectedSizes.includes(size.name) ? "selected" : ""}`}
                    onClick={() => handleSizeSelect(size.name)}
                  >
                    {size.name}
                  </button>
                ))}
          </div>
        )}
      </div>

      {/* Dress Style */}
      <div className="filter-section">
        <div className="section-header" onClick={() => toggleSection("dressStyle")}>
          <h3 className="section-title">Dress Style</h3>
          {expandedSections.dressStyle ? (
            <HiChevronDown className="chevron-icon" />
          ) : (
            <HiChevronRight className="chevron-icon" />
          )}
        </div>

        {expandedSections.dressStyle && (
          <div className="style-options">
            {availableStyles.length > 0
              ? availableStyles.map((style) => (
                  <div
                    key={style.id}
                    className={`style-item ${selectedStyles.includes(style.name) ? "active" : ""}`}
                    onClick={() => handleStyleSelect(style.name)}
                  >
                    <span>{style.name}</span>
                    <HiChevronRight className="chevron-icon" />
                  </div>
                ))
              : // Default styles if none available from API
                [
                  { id: 1, name: "Casual" },
                  { id: 2, name: "Formal" },
                  { id: 3, name: "Party" },
                  { id: 4, name: "Gym" },
                ].map((style) => (
                  <div
                    key={style.id}
                    className={`style-item ${selectedStyles.includes(style.name) ? "active" : ""}`}
                    onClick={() => handleStyleSelect(style.name)}
                  >
                    <span>{style.name}</span>
                    <HiChevronRight className="chevron-icon" />
                  </div>
                ))}
          </div>
        )}
      </div>

      {/* Apply and Reset Filter Buttons */}
      <div className="filter-actions">
        <button className="reset-filter-btn" onClick={resetFilters}>
          Reset
        </button>
        <button className="apply-filter-btn" onClick={applyFilters}>
          Apply Filter
        </button>
      </div>
    </div>
  )
}

export default CategoryDetails

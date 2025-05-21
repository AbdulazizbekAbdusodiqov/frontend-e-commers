"use client"

import { useState, useEffect } from "react"
import CategoryDetails from "./CategoryDetails"
import Card from "../../components/Card"
import { getProductsCategoryFilterApi } from "@/api/product"
import { HiX, HiAdjustments } from "react-icons/hi"

import "./CategoryPage.scss"

const CategoryPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeCategory, setActiveCategory] = useState("T-shirt")
  const [totalProducts, setTotalProducts] = useState(0)
  const [query, setQuery] = useState({
    category: "T-shirt",
  })

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const data = await getProductsCategoryFilterApi(query)
        setProducts(data)
        setTotalProducts(data.length)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [query])

  // Toggle filter drawer on mobile
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
    // Prevent body scrolling when filter is open
    document.body.style.overflow = !isFilterOpen ? "hidden" : "auto"
  }

  // Handle filter changes from CategoryDetails
  const handleFilterChange = (filters) => {
    setQuery(filters)
    if (filters.category && filters.category !== activeCategory) {
      setActiveCategory(filters.category)
    }
  }

  // Handle sort change
  const handleSortChange = (e) => {
    const sortBy = e.target.value

    setProducts((prevProducts) => {
      const sortedProducts = [...prevProducts]

      switch (sortBy) {
        case "price-low-high":
          sortedProducts.sort((a, b) => a.price - b.price)
          break
        case "price-high-low":
          sortedProducts.sort((a, b) => b.price - a.price)
          break
        case "rating":
          sortedProducts.sort((a, b) => b.rating - a.rating)
          break
        case "newest":
          // In a real app, you would sort by date
          // For now, we'll just randomize
          sortedProducts.sort(() => Math.random() - 0.5)
          break
        default:
          // Most popular (default)
          sortedProducts.sort((a, b) => b.ratingCount - a.ratingCount)
      }

      return sortedProducts
    })
  }

  return (
    <div className="category-page container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/">Home</a>
        <span className="separator">&gt;</span>
        <span className="current">{activeCategory}</span>
      </div>

      <div className="hr-line" />

      <div className="category-content">
        {/* Desktop filter sidebar */}
        <div className={`category-sidebar ${isMobile ? "mobile-hidden" : ""}`}>
          <CategoryDetails onFilterChange={handleFilterChange} initialCategory={activeCategory} />
        </div>

        {/* Mobile filter drawer */}
        {isMobile && (
          <div className={`filter-drawer ${isFilterOpen ? "open" : ""}`}>
            <div className="filter-drawer-header">
              <h3>Filters</h3>
              <button className="close-filter" onClick={toggleFilter}>
                <HiX size={20} />
              </button>
            </div>
            <div className="filter-drawer-content">
              <CategoryDetails onFilterChange={handleFilterChange} initialCategory={activeCategory} />
            </div>
          </div>
        )}

        {/* Overlay for mobile filter */}
        {isMobile && isFilterOpen && <div className="filter-overlay" onClick={toggleFilter}></div>}

        <div className="product-listing">
          <div className="header">
            <div className="header-left">
              <h2>{activeCategory}</h2>
              {isMobile && (
                <button className="filter-button" onClick={toggleFilter}>
                  <HiAdjustments size={20} />
                </button>
              )}
            </div>
            <div className="info">
              <p className="title">
                {loading
                  ? "Loading products..."
                  : `Showing 1–${Math.min(products.length, 9)} of ${totalProducts} Products`}
              </p>
              <div className="option-wrapper">
                <p>Sort by:</p>
                <select onChange={handleSortChange}>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading-products">
              <p>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="no-products">
              <p>No products found matching your filters.</p>
              <button
                className="reset-filters-btn"
                onClick={() => setQuery({ category: activeCategory, priceRange: [50, 500] })}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="cards">
              {products.slice(0, 9).map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          )}

          {products.length > 0 && (
            <>
              <div className="hr-botom" />

              <div className="pagination">
                <div className="pages">
                  <h4 className="active">1</h4>
                  <h3>2</h3>
                  <h3>3</h3>
                  <h3>...</h3>
                  <h3>8</h3>
                  <h3>9</h3>
                  <h3>10</h3>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage

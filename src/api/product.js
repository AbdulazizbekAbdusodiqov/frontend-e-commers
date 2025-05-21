import { toast } from "react-toastify";
import instance from "./instance";

export const getProductsApi = async () => {
    try {
        const res = await instance.get("/products")
        console.log(res);
        return res.data

    } catch (error) {
        toast.error("Failed to fetch products")
    }
}

export const getProductsCategoryFilterApi = async (query = "") => {
    try {
        const categoryQuery = `category=${query.category}`
        const res = await instance.get(`/products?${categoryQuery}`)
        return res.data
    } catch (error) {
        toast.error("Failed to fetch products")
    }
}
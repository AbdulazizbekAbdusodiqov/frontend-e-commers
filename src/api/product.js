import { toast } from "react-toastify";
import instance from "./instance";

export const getProductsApi = async()=>{
    try {
        const res = await instance.get("/Products")
        console.log(res);
        return res.data
        
    } catch (error) {
        
        toast.error("Failed to fetch products")
    }
}
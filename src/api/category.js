import { toast } from "react-toastify";
import instance from "./instance";

export const getCategoriesApi = async()=>{
    try {
        const res = await instance.get("/category")
        return res.data
        
    } catch (error) {
        console.log(error);
        
        toast.error("Failed to fetch categories")
    }
}


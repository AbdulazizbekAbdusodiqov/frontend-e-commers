import { useQuery } from "@tanstack/react-query"
import { getCategoriesApi } from "../api"

export const useCategories = () => {
    return useQuery({
        queryFn: getCategoriesApi,
        queryKey: ["categories"],
    })        
}

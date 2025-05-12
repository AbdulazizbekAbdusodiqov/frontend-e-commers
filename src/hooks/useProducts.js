import { useQuery } from "@tanstack/react-query"
import { getProductsApi } from "../api"

export const useProducts = () => {
    return useQuery({
        queryFn: getProductsApi,
        queryKey: ["Products"],
    })        
}

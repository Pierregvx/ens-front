import axios, { AxiosResponse } from "axios";
import { useQuery } from "wagmi";

export default function useRessource<T>(url:string) {
    console.log(url)

    return useQuery<T, undefined>([url,"klkl"], {
        queryFn: async () => {
            try {
                const response = await axios.get<T, AxiosResponse<T>>(url)

                return response.data;
            } catch (error: any) {
                console.log(error)
                throw new Error(`query error: ${error.message}`);
            }
        },
    });
}
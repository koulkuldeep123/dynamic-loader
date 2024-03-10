import { useState } from 'react';
import {Item} from "../components/common-type.ts";

interface FetchResult {
    data: Item[];
    loading: boolean;
    error: unknown;
    fetchData: (url:string)=>void;
}

const useFetchData = (): FetchResult => {
    const [data, setData] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    const fetchData = async (url:string) => {
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setData(jsonData);
        }
        catch (error) {
            setError(error);
        }
        finally {
            setLoading(false);
        }
    };
    return { data, loading, error, fetchData };

};

export default useFetchData;
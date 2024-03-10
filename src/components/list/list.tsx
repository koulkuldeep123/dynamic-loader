import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import {ListProps, Item} from '../common-type.ts';
import useFetchData from '../../hooks/useFetchData.ts';
import { storePageData, storePageIndex } from './../../store/features/list/list-slice.ts'
import {RootState} from "../../store/store.ts";
import Loader from "../loader/loader.tsx";
import ListItem from "../list-item/list-item.tsx";

const List: React.FC<ListProps> = ({ favorites, toggleFavorite }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState<number>(1);
    const { data, loading, fetchData } = useFetchData();
    const [loadedPage, setLoadedPage] = useState<number[]>([]);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [scrollingApi, setScrollingApi] = useState<boolean>(true);
    const getUrl = `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`;
    const dispatch = useDispatch();
    const {pages,pageIndex} = useSelector((state:RootState)=>state.list);
    const pageStored = Object.keys(pages).length === 0;

    //scroll handling on window object
    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY+1 >= document.body.offsetHeight &&
            (!loading || !isLoadingMore)
        ) {
            setIsLoadingMore(true);
            setPage(prevPage => prevPage + 1);
        }else{
            setIsLoadingMore(false);
        }
    };

    //add scroll when loading
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoadingMore, loading]);

    //first on load
    useEffect(() => {
        if(pageStored){
            fetchData(getUrl);
        }
        else{
            //load stored data till saved index
            const loadedData = [];
            for (let i = 1; i <= pageIndex; i++) {
                const pageData = pages[i] || []; // Use empty array if data for page i is not available
                const mappedData = pageData.map(item => ({ id: item.id, title: item.title, url: item.url }));
                loadedData.push(...mappedData);
            }
            setItems(loadedData);
            setPage(pageIndex);
            setLoadedPage(Array.from({ length: pageIndex }, (_, index) => index + 1))
        }

    }, []);

    //storing in store and end scroll loading
    useEffect(() => {
        if(data){
            if(data.length===0 && isLoadingMore){
                setScrollingApi(false);
                setIsLoadingMore(false);
                return;
            }
            if (!loadedPage.includes(page)) {
                setLoadedPage(prevPage => [...prevPage, page]);
            }
            if(data.length!==0){
                setItems(prevItems => [...prevItems, ...data]);
                dispatch(storePageIndex(page));
                dispatch(storePageData({page,data}));
            }
            // if (pages[pageIndex] && pages[pageIndex].length>0) {
            // }
        }
    }, [data]);

    useEffect(()=>{
        if(!loading && isLoadingMore){
            setIsLoadingMore(false);
        }
    },[isLoadingMore, loading]);

    //update page index
    useEffect(() => {
        if (page > 1 && scrollingApi && !loadedPage.includes(page)) {
            fetchData(getUrl);
        }
        else{
            setIsLoadingMore(false);
            }
        }, [page]);

    return (

        <div className="container">
            <h1>List</h1>
            <Link to="/" className="link">Back to Dashboard</Link>
            {items.map((item, index) => (
                <div key={item.id + index} className="list-item">
                    <ListItem id={item.id} title={item.title} url={item.url} />
                    <button onClick={() => toggleFavorite(item)}>
                        {favorites.some(fav => fav.id === item.id) ? 'Delete favorites' : 'Add favorites'}
                    </button>
                </div>
            ))}
            {(loading || isLoadingMore) && pageStored && <div className="loader-container"><Loader /></div>}
            {isLoadingMore && <div className="loader-container"><Loader /></div>}
        </div>
    );
};

export default List;

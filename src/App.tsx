import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import Dashboard from './components/dashboard/dashboard.tsx';
import List from './components/list/list.tsx';
import {Item} from "./components/common-type.ts";
import NavBar from "./components/navbar/navbar.tsx";

const App: React.FC = () => {
    const [favorites, setFavorites] = useState<Array<Item>>([]);

    const toggleFavorite = (item:Item) => {
        if (favorites.some((fav) => fav.id === item.id)) {
            setFavorites(favorites.filter((fav) => fav.id !== item.id));
        } else {
            setFavorites([...favorites, item]);
        }
    };

    return (
        <Provider store={store}>
            <Router>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Dashboard favorites={favorites} toggleFavorite={toggleFavorite} />} />
                    <Route path="/list" element={<List favorites={favorites} toggleFavorite={toggleFavorite}/>} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
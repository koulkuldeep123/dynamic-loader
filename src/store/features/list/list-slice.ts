import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../../components/common-type';

interface ListState {
    pages: Record<number, Item[]>;
    pageIndex: number;
}

const initialState: ListState = {
    pages: {},
    pageIndex: 1,
};

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        storePageData: (state, action: PayloadAction<{ page: number; data: Item[] }>) => {
            const { page, data } = action.payload;
            state.pages = {
                ...state.pages,
                [page]: data,
            };
        },
        storePageIndex: (state, action: PayloadAction<number>) => {
            state.pageIndex = action.payload;
        },
    },
})

export const { storePageData, storePageIndex } = listSlice.actions

export default listSlice.reducer

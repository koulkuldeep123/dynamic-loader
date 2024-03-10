export const fetchData = (page) => ({
    type: 'FETCH_DATA',
    payload: page,
});

export const storeData = (page, data) => ({
    type: 'STORE_DATA',
    payload: { page, data },
});
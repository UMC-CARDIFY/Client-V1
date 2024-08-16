import axiosInstance from '..';

export const searchLib = async (searchTxt, categoryList) => {
    if (categoryList.length === 0) {
        try {
            const response = await axiosInstance.post('/library/searchLib', {
                searchTxt: searchTxt
            });
            return response.data.resultNote;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    else {
        try {
            const response = await axiosInstance.post('/library/searchLib', {
                searchTxt: searchTxt,
                categoryList: categoryList
            });
            return response.data.resultNote;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

};

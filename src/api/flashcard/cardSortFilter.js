import axiosInstance from '..';

export const cardSortFilter = async (color, order, status) => {
    console.log(color, order, status);
    try {
        const response = await axiosInstance.get(`/cards/sort-filter`, {
            params: {
                order: order,
                color: color,
                studyStatus: status
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching filtering:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export default cardSortFilter;


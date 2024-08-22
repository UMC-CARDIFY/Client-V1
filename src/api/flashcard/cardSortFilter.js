import axiosInstance from '..';

export const cardSortFilter = async (color, order, studyStatus) => {
    console.log(color, order, studyStatus);
    try {
        const response = await axiosInstance.get(`/cards/sort-filter`, {
            params: {
                order: order,
                color: color,
                studyStatus: studyStatus
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching filtering:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export default cardSortFilter;


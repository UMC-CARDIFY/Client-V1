// api/editor/card/imagecard.js
import axios from 'axios';
import config from '../../config';
import axiosInstance from '../..';



export const uploadImageCard = async (imageFile, imageCard) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('imageCard', JSON.stringify(imageCard));

    console.log(imageFile)
    console.log(JSON.stringify(imageCard))
    try {
        const response = await axiosInstance.post(`/cards/add/Image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Ensure the correct content type is set
            },
        });
        console.log('Success:', response.data);
        return response.data; // Return data for further processing if needed
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
            // Request was made but no response received
            console.error('Error request data:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error message:', error.message);
        }
        throw error; // Rethrow error to handle it at the call site
    }
};


export const getImageCard = async (cardId) => {
    
    try {
        const response = await axiosInstance.get(`/cards/view/${cardId}/Image`);
        console.log('Success:', response.data);
        return response.data;
    }	    
    catch (error) {	   
        console.error("Error fetching folders:", error.response?.data || error.message);
        throw error;
    }	    
};
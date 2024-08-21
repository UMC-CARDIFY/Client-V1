// api/editor/card/imagecard.js
import axios from 'axios';
import config from '../../config';
import axiosInstance from '../..';

export const uploadImageCard = async (imageFile, imageCard) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('imageCard', JSON.stringify(imageCard));
    try {
        const response = await axiosInstance.post(`/cards/add/Image`, formData);
        console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error);
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
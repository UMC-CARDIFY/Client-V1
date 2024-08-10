// api/editor/card/imagecard.js
import axios from 'axios';
import config from '../../config';

export const uploadImageCard = async (imageFile, imageCard) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('imageCard', JSON.stringify(imageCard));
    try {
        const response = await axios.post(`${config.apiBaseUrl}/cards/add/Image`, formData, {
            headers: {
                Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInR5cGUiOiJBY2Nlc3MiLCJzdWIiOiJBY2Nlc3NUb2tlbiIsImlhdCI6MTcyMzI3MDYxNiwiZXhwIjoxNzIzMjc0MjE2fQ.d33RXBtk9JCJqPgB6DCA-jgNypclLHsIBJJ0qvwitmw',
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
};

export const getImageCard = async (cardId) => {
    try {
        const response = await axios.get(`${config.apiBaseUrl}/cards/view/${cardId}/Image`, {
            headers: {
                Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInR5cGUiOiJBY2Nlc3MiLCJzdWIiOiJBY2Nlc3NUb2tlbiIsImlhdCI6MTcyMzI3MDYxNiwiZXhwIjoxNzIzMjc0MjE2fQ.d33RXBtk9JCJqPgB6DCA-jgNypclLHsIBJJ0qvwitmw',
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Success:', response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error:', error);
    }
};
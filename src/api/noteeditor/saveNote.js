import axios from 'axios';
import config from '../config';

export const saveNote = async (noteId, name, contents, token) => {
  try {
    const formData = new FormData();

    const requestData = {
      noteId: noteId,
      name: name,
      contents: contents,
    };

    // requestData 객체를 JSON 문자열로 변환하여 FormData에 추가합니다.
    formData.append('request', JSON.stringify(requestData));

    // 만약 이미지 같은 파일을 업로드해야 한다면, 여기에 추가합니다.
    // formData.append('images', fileInput.files[0]);

    const response = await axios.post(`${config.apiBaseUrl}/notes/write`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    alert(error.message);
    console.log("Error during save:", error);
  }
};
import axios from 'axios';
import config from '../config';

export const saveNote = async (noteId, name, contents, imageFile, token) => {
  try {
    const formData = new FormData();

    const requestData = {
      noteId: noteId,
      name: name,
      contents: contents,
    };
    console.log("Request Data:", requestData);

    // requestData 객체를 JSON 문자열로 변환하여 FormData에 추가합니다.
    formData.append('request', JSON.stringify(requestData));

    // 이미지 파일이 실제로 파일인지 확인
    if (imageFile) {
      if (imageFile instanceof File) {
        console.log("Valid image file detected:", imageFile.name);
        formData.append('image', imageFile);
      } else {
        console.warn("imageFile is not a valid File object:", imageFile);
      }
    }

    // formData 내용을 출력합니다.
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

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

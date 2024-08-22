// getNote.js
export const getNoteIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('noteId');
};

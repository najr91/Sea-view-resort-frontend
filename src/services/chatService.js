import axios from 'axios';

export async function sendChatMessage(message) {
    const text = String(message || '').trim();
    if (!text) return '';
    try {
        const response = await axios.post('/chat', { message: text });
        return response?.data?.reply || '';
    } catch (error) {
        throw error;
    }
}



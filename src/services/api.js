import axios from 'axios';

const API_BASE_URL = 'http://localhost:5029/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const participantesService = {
    // Obtener todos los participantes
    getParticipantes: async (query = '') => {
        const url = query ? `/listado?q=${query}` : '/listado';
        const response = await api.get(url);
        return response.data;
    },

    // Obtener participante por ID
    getParticipante: async (id) => {
        const response = await api.get(`/participante/${id}`);
        return response.data;
    },

    // Registrat nuevo participante
    createParticipante: async (participanteData) => {
        const response = await api.post('/registro', participanteData);
        return response.data;
    },
};

export default api;
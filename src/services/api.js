import axios from 'axios';

const API_BASE_URL = 'https://examenparcial2-1-wo8z.onrender.com/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const participantesService = {
    // Obtener todos los participantes
    getParticipantes: async (query = '') => {
        const url = query ? `/participantes/listado?q=${query}` : '/participantes/listado';
        const response = await api.get(url);
        return response.data;
    },

    // Obtener participante por ID
    getParticipante: async (id) => {
        const response = await api.get(`/participantes/participante/${id}`);
        return response.data;
    },

    // Registrar participante
    createParticipante: async (participanteData) => {
        const response = await api.post('/participantes/registro', participanteData);
        console.log(response)
        return response.data;
    },
};

export default api;
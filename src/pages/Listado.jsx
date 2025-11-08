import React, { useEffect, useState } from 'react'
import { participantesService } from '../services/api';

const Listado = () => {
    const [participantes, setParticipantes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchParticipantes = async (query = '') => {
        setLoading(true)
        try
        {
            const data = await participantesService.getParticipantes(query) 
            setParticipantes(data)
        }
        catch (error)
        {
            console.error('Error fetching participantes: ', error)
        }   
        finally
        {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchParticipantes()
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        fetchParticipantes(searchQuery)
    }

  return (
    <div>
        <h2>
            Listado de participantes
        </h2>
        <form onSubmit={handleSearch} className='mb-4'>
            <div className='input-group'>
                <input 
                    type="text"
                    className='form-control'
                    placeholder='Buscar Participante'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className='btn btn-primary' type='submit'>
                    Buscar
                </button>
            </div>
        </form>
        {loading ? (
            <div className='text-center'>
                <div className='spinner-border' role='status'>
                    <span className='visually-hidden'>
                        Cargando...
                    </span>
                </div>
            </div>
        ) : (
            <div className='row'>
                {participantes.map((participante) => (
                    <div key={participantes.id} className='col-md-6 col-lg-4 mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>
                                    {participante.nombre} {participante.apellidos}
                                </h5>
                                <p className='card-text'>
                                    <strong>
                                        Email:
                                    </strong>
                                    {participante.email}
                                    <br />
                                    <strong>
                                        Twitter: 
                                    </strong>
                                    {participante.usuarioTwitter}
                                    <br />
                                    <strong>
                                        Ocupación:
                                    </strong>
                                    {participante.ocupacion}
                                </p>
                                <a href={`/gafete/${participante.id}`} className='btn btn-outline-primary btn-sm'>
                                Ver Gafete
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default Listado
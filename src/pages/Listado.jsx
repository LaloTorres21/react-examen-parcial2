import React, { useEffect, useState } from 'react'
import { participantesService } from '../services/api';
import Navbar from '../components/Navbar';

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
    <>
        <Navbar />
        <div className="container mt-4">
            <h2>Listado de participantes</h2>
            
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
                        <span className='visually-hidden'>Cargando...</span>
                    </div>
                </div>
            ) : (
                <div className='row'>
                    {participantes.map((participante) => (
                        <div key={participante.id} className='col-md-6 col-lg-4 mb-3'>
                            <div className='card h-100'>
                                <div className='card-body d-flex flex-column'>
                                    <div className="d-flex align-items-center mb-3">
                                        <img 
                                            src={participante.avatar || `https://ui-avatars.com/api/?name=${participante.nombre}+${participante.apellidos}&background=random&size=50`}
                                            alt={`Avatar de ${participante.nombre}`}
                                            className="rounded-circle me-3"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <div>
                                            <h5 className='card-title mb-0'>
                                                {participante.nombre} {participante.apellidos}
                                            </h5>
                                            {participante.usuarioTwitter && (
                                                <small className="text-muted">
                                                    @{participante.usuarioTwitter}
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className='card-text'>
                                            <strong>Email:</strong> {participante.email}
                                            <br />
                                            <strong>Ocupación:</strong> {participante.ocupacion}
                                        </p>
                                    </div>
                                    <div className="mt-auto">
                                        <a 
                                            href={`/gafete/${participante.id}`} 
                                            className='btn btn-outline-primary btn-sm w-100'
                                        >
                                            Ver Gafete
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </>
  )
}

export default Listado
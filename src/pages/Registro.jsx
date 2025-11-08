import React, { useState } from 'react'
import { participantesService } from '../services/api'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Registro = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        usuarioTwitter: '',
        ocupacion: '',
        avatar: '',
        aceptaTerminos: false
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        })) 
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try{
            await participantesService.createParticipante(formData)
            alert('Particiante registrado exitosamente')
            navigate('/listado')
        }
        catch (error)
        {
            setError(error.response?.data?.message || 'Error al registrar participante')
        }
        finally 
        {
            setLoading(false)
        }
    }

  return (
    <>
    <Navbar />
        <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6'>
                <h2>
                    Registro de participante
                </h2>
                {error && (
                    <div className='alert alert-danger' role='alert'>
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor="nombre" className='form-label'>
                                    Nombre
                                </label>
                                <input 
                                    type="text"
                                    className='form-control'
                                    id='nombre'
                                    name='nombre'
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor="apellidos" className='form-label'>
                                    Apellidos
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="apellidos"
                                    name="apellidos"
                                    value={formData.apellidos}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email *</label>
                        <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="usuarioTwitter" className="form-label">Usuario de Twitter</label>
                        <div className="input-group">
                        <span className="input-group-text">@</span>
                        <input
                            type="text"
                            className="form-control"
                            id="usuarioTwitter"
                            name="usuarioTwitter"
                            value={formData.usuarioTwitter}
                            onChange={handleChange}
                        />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="ocupacion" className="form-label">Ocupación *</label>
                        <input
                        type="text"
                        className="form-control"
                        id="ocupacion"
                        name="ocupacion"
                        value={formData.ocupacion}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="avatar" className="form-label">Avatar URL</label>
                        <input
                        type="url"
                        className="form-control"
                        id="avatar"
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleChange}
                        placeholder="https://ejemplo.com/avatar.jpg"
                        />
                    </div>

                    <div className="mb-3 form-check">
                        <input
                        type="checkbox"
                        className="form-check-input"
                        id="aceptaTerminos"
                        name="aceptaTerminos"
                        checked={formData.aceptaTerminos}
                        onChange={handleChange}
                        required
                        />
                        <label className="form-check-label" htmlFor="aceptaTerminos">
                        Acepto los términos y condiciones *
                        </label>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Registrar Participante'}
                    </button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Registro
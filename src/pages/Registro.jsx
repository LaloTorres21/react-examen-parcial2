import React, { useState } from 'react'
import { participantesService } from '../services/api'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Registro = () => {
    const avatares = [
        "https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg",
        "https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671126.jpg",
        "https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671132.jpg",
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas_23-2149436185.jpg",
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona_23-2149436182.jpg",
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas_23-2149436185.jpg",
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona_23-2149436182.jpg",
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona_23-2149436179.jpg",
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona_23-2149436188.jpg"
    ];

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        usuarioTwitter: '',
        ocupacion: '',
        avatar: '',
        AceptaTerminos: false
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [avatarSeleccionado, setAvatarSeleccionado] = useState(0);

    const seleccionarAvatar = (avatarUrl) => {
        setAvatarSeleccionado(avatarUrl);
        setFormData(prev => ({
            ...prev,
            avatar: avatarUrl
        }));
    };

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
            console.log('Datos a enviar:', JSON.stringify(formData, null, 2)) 
            console.log('AceptaTerminos value:', formData.AceptaTerminos) 
            console.log('AceptaTerminos type:', typeof formData.AceptaTerminos) 
            console.log(formData)
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
                        <label className="form-label">
                            Selecciona tu avatar
                        </label>
                        <div className='row'>
                            {avatares.map((avatar, index) => (
                                <div key={index} className='col-4 col-md-2 mb-3'>
                                    <div 
                                        className={`avatar-option ${avatarSeleccionado === avatar ? 'selected' : ''}`} 
                                        onClick={() => seleccionarAvatar(avatar)} 
                                        style={{cursor: 'pointer'}}
                                    >
                                        <img 
                                            src={avatar} 
                                            alt={`Avatar ${index +1}`} 
                                            className='img-fluid rounded-circle border' 
                                            style={{
                                                width: '80px', 
                                                height: '80px', 
                                                objectFill: 'cover', 
                                                border: avatarSeleccionado === avatar ? '3px solid #007bff' : '2px solid #dee2e6', 
                                                opacity: avatarSeleccionado === avatar ? 1 : 0.7, 
                                                transition: 'all 0.3s ease'}} 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {avatarSeleccionado && (
                            <div className='mt-2'>
                                <small className='text-muted'>
                                    Avatar Seleccionado
                                </small>
                            </div>
                        )}
                    </div>

                    <div className="mb-3 form-check">
                        <input
                        type="checkbox"
                        className="form-check-input"
                        id="AceptaTerminos"
                        name="AceptaTerminos"
                        checked={formData.AceptaTerminos}
                        onChange={handleChange}
                        required
                        />
                        <label className="form-check-label" htmlFor="AceptaTerminos">
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
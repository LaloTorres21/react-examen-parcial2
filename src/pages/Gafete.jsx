import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { participantesService } from '../services/api'
import Navbar from '../components/Navbar'

const Gafete = () => {
  const { id } = useParams()
  const [participante, setParticipante] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchParticipante = async () => {
      try {
        console.log('Buscando participante con ID:', id)
        const data = await participantesService.getParticipante(id)
        console.log('Datos recibidos:', data)
        setParticipante(data)
      } catch (error) {
        console.error('Error fetching participante:', error)
        console.error('Detalles del error:', error.response?.data)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchParticipante()
    }
  }, [id])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando gafete...</p>
        </div>
      </>
    )
  }

  if (!participante) {
    return (
      <>
        <Navbar />
        <div className="container mt-4">
          <div className="alert alert-danger">
            <h4>Participante no encontrado</h4>
            <p>El participante con ID {id} no existe.</p>
            <Link to="/listado" className="btn btn-primary">
              Volver al listado
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            {/* Botón volver */}
            <div className="mb-3">
              <Link to="/listado" className="btn btn-outline-secondary">
                ← Volver al listado
              </Link>
            </div>

            {/* Gafete estilo tarjeta profesional */}
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4">
                
                {/* Encabezado con nombre grande */}
                <div className="text-center mb-4">
                  <h1 className="display-5 fw-bold text-dark mb-2">
                    {participante.nombre} {participante.apellidos}
                  </h1>
                  
                  {/* Código o título profesional */}
                  <div className="mb-3">
                    <small className="text-uppercase text-muted letter-spacing-2">
                      {participante.ocupacion || 'PROFESIONAL'}
                    </small>
                  </div>
                  
                  {/* Descripción breve */}
                  <p className="text-muted mb-4">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt
                  </p>
                </div>

                {/* Avatar grande */}
                <div className="text-center mb-4">
                  <img
                    src={participante.avatar || `https://ui-avatars.com/api/?name=${participante.nombre}+${participante.apellidos}&size=200&background=random&color=fff&bold=true`}
                    alt={`Avatar de ${participante.nombre}`}
                    className="rounded-circle border shadow"
                    style={{ 
                      width: '180px', 
                      height: '180px', 
                      objectFit: 'cover' 
                    }}
                  />
                </div>

                {/* Información de contacto */}
                <div className="text-center mb-4">
                  <h5 className="text-uppercase text-dark mb-3">
                    {participante.nombre} {participante.apellidos}
                  </h5>
                  <p className="text-primary mb-2">
                    {participante.email}
                  </p>
                  <p className="text-uppercase text-muted fw-bold">
                    {participante.ocupacion}
                  </p>
                </div>

                {/* Redes sociales */}
                {participante.usuarioTwitter && (
                  <div className="text-center mb-4">
                    <div className="d-flex justify-content-center gap-3">
                      <span className="text-muted">@{participante.usuarioTwitter}</span>
                    </div>
                  </div>
                )}

                {/* Línea divisoria */}
                <hr className="my-4" />

                {/* Footer con marca */}
                <div className="text-center">
                  <small className="text-uppercase text-muted">
                    {participante.ocupacion} logo™
                  </small>
                </div>

              </div>
            </div>

            {/* Información adicional */}
            <div className="text-center mt-3">
              <small className="text-muted">
                Registrado el {new Date(participante.fechaRegistro).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </small>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .letter-spacing-2 {
          letter-spacing: 2px;
        }
        .card {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
      `}</style>
    </>
  )
}

export default Gafete
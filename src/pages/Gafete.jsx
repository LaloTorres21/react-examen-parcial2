import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { participantesService } from '../services/api'

const Gafete = () => {
  const { id } = useParams()
  const [participante, setParticipante] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchParticipante = async () => {
      try {
        const data = await participantesService.getParticipante(id)
        setParticipante(data)
      } catch (error) {
        console.error('Error fetching participante:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchParticipante()
  }, [id])

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  if (!participante) {
    return <div className="alert alert-danger">Participante no encontrado</div>
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body text-center">
            <img
              src={participante.avatar || `https://ui-avatars.com/api/?name=${participante.nombre}+${participante.apellidos}&size=200`}
              alt="Avatar"
              className="rounded-circle mb-3"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
            <h3 className="card-title">
              {participante.nombre} {participante.apellidos}
            </h3>
            <p className="card-text">
              <strong>Email:</strong> {participante.email}<br/>
              {participante.usuarioTwitter && (
                <>
                  <strong>Twitter:</strong> @{participante.usuarioTwitter}<br/>
                </>
              )}
              <strong>Ocupación:</strong> {participante.ocupacion}
            </p>
            <div className="mt-4">
              <small className="text-muted">
                Registrado el: {new Date(participante.fechaRegistro).toLocaleDateString()}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gafete
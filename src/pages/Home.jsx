import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='text-center'>
        <h1>
            Congreso de Tecnologías de la Información
        </h1>
        <p className='lead'>
            Registrate para asistir al congreso de tecnologías de la información
        </p>
        <div className='row mt-5'>
            <div className='col-md-6'>
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            Registrate al congreso
                        </h5>
                        <Link to="/registro" className='btn btn-primary'>
                            Registrate
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
import React from 'react'
import { Link } from 'react-router-dom'
import congreso from '../img/iconoCongress.jpg';
import uni from '../img/icono_utl.png';

const Home = () => {
  return (
    <div className='text-center'>
        <h1>
            Congreso de Tecnologías de la Información
        </h1>
        <p className='lead'>
            Registrate para asistir al congreso de tecnologías de la Información
        </p>
        <div className='row justify-content-center mt-5 col'>
            <div className='card mb-3 col-md-5'>
                <div className='card-body'>
                    <img src={congreso} alt="Congreso" className='img-fluid' style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                </div>
            </div>
            <div className='card mb-3 col-md-5'>
                <div className='card-body'>
                    <img src={uni} alt="Unidad Tecnológica de La Rioja" className='img-fluid'style={{ width: '180px', height: '180px' }}/>
                </div>
            </div>
        </div>
        <div className='row mt-5'>
            <div className='col text-center justify-content-center'>
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
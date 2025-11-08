import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Congreso de Tecnologías de la Información
        </Link>
        
        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Inicio
          </Link>
          <Link className="nav-link" to="/registro">
            Registro
          </Link>
          <Link className="nav-link" to="/listado">
            Listado
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
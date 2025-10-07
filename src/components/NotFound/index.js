import './index.css'

const NotFound = () => (
  <div className="NotFoundContainer">
    <div className="NotFoundCard">
      <img
        src="https://res.cloudinary.com/dpiu7mohv/image/upload/v1759296697/Group_7504_x3hrs4.png"
        className="notfoundImg"
        alt="not found"
      />
      <h1 className="notfoundHead">Page Not Found</h1>

      <p className="notfoundPara">
        We are sorry, the page you are requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound

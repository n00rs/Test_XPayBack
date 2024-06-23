const Banner = ({imgSrc}) => {
    return (
        <div className="card bg-dark text-white">
            <img className="card-img img-fluid" src={imgSrc} alt="Card" />
            <div className="card-img-overlay">
            </div>
        </div>

    )
}

export default Banner
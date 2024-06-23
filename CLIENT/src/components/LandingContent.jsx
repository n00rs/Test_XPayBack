import React from 'react'
import { Container, Row } from 'react-bootstrap'

const LandingContent = ({title, content, imgSrc}) => {
    return (
        <Container >
            <Row >
                <div className="col-md-6 col-12 m-3 ">
                    <strong className='display-6 m-5'>{title}</strong>
                    <p className='mt-5'>{content}</p>
                </div>
                <div className="col-md-5 col-12">
                    <img src={imgSrc} className='img-fluid' alt='' />
                </div>
            </Row>
            <Row >
                <div className="col-md-5 col-12">
                    <img src={imgSrc} className='img-fluid' alt='' />
                </div>
                <div className="col-md-6 col-12 m-3 ">
                    <strong className='display-6 m-5'>{title}</strong>
                    <p className='mt-5'>{content}</p>
                </div>
            </Row>
        </Container>
    )
}

export default LandingContent
'use client'

import Slider from "react-slick"
import Image from 'next'

const CertificateSlider = ({
  images
}:{
  images: JSX.Element[]
}) => {
  return (
    <Slider>
      {
        images
      }
    </Slider>
  )
}

export default CertificateSlider
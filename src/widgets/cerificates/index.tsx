import Slider from "react-slick";

const Certificates = () => {
  return (
    <div className='container mx-auto text-center py-24'>
      <div className="w-full col-span-1">
        <span className="text-[#6F7F89] uppercase font-semibold">
          Сертификаты и лицензии
        </span>
        <h2 className="text-[#2D3941] mt-2 uppercase font-bold text-3xl">
          Сертификаты соответствия
          ISO 45001, 14001, 9001
        </h2>
        <div className="bg-[#558D94] h-[2px] w-24 mt-2 mx-auto"></div>
        <p className="mt-6">
          Сертификаты соответствия
          ISO 45001, 14001, 9001
        </p>
        <Slider
      </div>
    </div>
  )
}

export default Certificates
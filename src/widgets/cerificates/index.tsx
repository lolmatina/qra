import { promises as fs } from 'fs';
import path from 'path';
import CertificateSlider from '@/src/entities/slider';

const Certificates = async () => {
  const imageDirectory = path.join(process.cwd(), '/public/certificates');
  const imageFilenames = await fs.readdir(imageDirectory);

  return (
    <div id="certificates" className="max-w-[1280px] px-5 mx-auto text-center py-24">
      <div className="w-full col-span-1">
        <span className="text-[#6F7F89] uppercase font-semibold">Сертификаты и лицензии</span>
        <h2 className="text-[#2D3941] mt-2 uppercase font-bold text-3xl">
          Сертификаты соответствия ISO 45001, 14001, 9001
        </h2>
        <div className="bg-[#558D94] h-[2px] w-24 mt-2 mx-auto"/>
        <p className="mt-6 mb-6">Сертификаты соответствия ISO 45001, 14001, 9001</p>
        <div className="w-[800px] mx-auto">
          <CertificateSlider
            images={imageFilenames.map((image, index) => (
              <div className="flex justify-center items-center w-full">
                <img src={`certificates/${image}`} key={index} alt={image} className="w-[400px] mx-auto" />
              </div>
            ))}
          />
        </div>
      </div>
    </div>
  );
};

export default Certificates;

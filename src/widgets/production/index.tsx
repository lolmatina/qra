const Production = () => {
    return (
      <div id="about" className="flex flex-row-reverse w-full">
        <div className="w-full relative">
          <div className="w-full h-full bg-[url(/ipu.png)] bg-cover bg-no-repeat bg-center"/>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10"/>
        </div>
        <div className="w-full">
          <div className="bg-[#7A2220]">
            <div className="p-[73px] pb-[120px] max-w-[768px] mr-auto">
              <span className="uppercase text-lg text-[#889BA9] font-semibold">Продукция</span>
              <h2 className="text-3xl mt-2 text-white font-bold uppercase">МПЦ-QZ</h2>
              <div className="bg-[#558D94] h-[2px] w-7 mt-2"/>
              <p className="text-white mt-5">
              Система МПЦ-QZ представляет собой новое поколение микропроцессорных централизаций, с применением управляющего вычислительного комплекса, созданного на базе современных диверсифицированных процессоров, с полным горячим резервированием.
              </p>
            </div>
          </div>
          <div className="-mt-[60px] pl-[73px] max-w-[768px]">
            <div className="p-7 pl-14 bg-[#3A4950] text-white">
              <span className="uppercase text-lg font-semibold">МПЦ-QZ – Микропроцессорная централизация стрелок и светофоров, с интегрированными функциями</span>
              <ul className="list-disc">
                <li>автоматической блокировки (АБ).</li>
                <li>автоматической локомотивной сигнализации (АЛСО)</li>
                <li>автоматической сигнализации железнодорожных переездов (АПС)</li>
                <li>линейного пункта диспетчерской централизации (ДЦ)</li>
                <li>полуавтоматической блокировки (ПАБ)</li>
              </ul>
            </div>
          </div>
          <div className="p-[73px] bg-[#F0F4F7] text-[#8B9EA9] uppercase font-semibold">
          Инновационная система объектных контроллеров решает вопросы унификации и минимизации типов компонентов в составе аппаратно-программных комплексов управления напольным и постовым оборудованием перегонных и станционных систем железнодорожной автоматики (ЖАТ).
          </div>
        </div>
      </div>
    );
  };
  
  export default Production;
  
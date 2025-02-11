const About = () => {
  return (
    <div id="about" className="flex w-full">
      <div className="w-full bg-[url(/about.jpg)] bg-cover bg-no-repeat bg-center"></div>
      <div className="w-full">
        <div className="bg-[#3A4950]">
          <div className="p-[73px] pb-[120px] max-w-[768px] mr-auto">
            <span className="uppercase text-lg text-[#889BA9] font-semibold">О компании</span>
            <h2 className="text-3xl mt-2 text-white font-bold uppercase">Qaz Rail Automatic</h2>
            <div className="bg-[#558D94] h-[2px] w-7 mt-2"></div>
            <p className="text-white mt-5">Мы – ведущий казахстанский производитель систем автоматизации для железных дорог. Наша миссия – создание инновационных решений, которые обеспечивают безопасность, скорость и надежность железнодорожного сообщения.</p>
          </div>
        </div>
        <div className="-mt-[60px] pl-[73px] max-w-[768px]">
          <div className="p-7 pl-14 bg-[#7A2220] text-white">
            <span className="uppercase text-lg font-semibold">Ценности компании</span>
            <ul className="list-disc">
              <li>Постоянное развитие.</li>
              <li>Высокие стандарты качества.</li>
              <li>Доверие и долгосрочные отношения с клиентами.</li>
            </ul>
          </div>
        </div>
        <div className="p-[73px] bg-[#F0F4F7] text-[#8B9EA9] uppercase font-semibold">
          Среди наших клиентов – крупнейшие предприятия железнодорожной отрасли, включая АО «НК «КТЖ».
        </div>
      </div>
    </div>
  )
}

export default About
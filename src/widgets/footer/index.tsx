const Footer = () => {
  return (
    <div id="contacts" className="bg-[#405561] py-10">
      <div className="max-w-[1280px] px-5 mx-auto flex gap-16">
        <div>
          <span className="uppercase text-lg text-[#889BA9] font-semibold">Свяжитесь с нами!</span>
          <h2 className="text-xl mt-2 text-white font-bold uppercase">
            Мы готовы ответить на ваши вопросы и предложить оптимальные решения для вашего бизнеса
          </h2>
          <div className="bg-[#fff] h-[2px] w-7 mt-2"/>
          <p className="text-white mt-5">Товарищество с ограниченной ответственностью</p>
        </div>
        <div className="text-white mt-5">
          <ul className="list-disc flex flex-col gap-2">
            <li>«Qaz Rail Automatic» БИН 220940015223</li>
            <li>
              e-mail: <a href="mailto:info@qazrailautomatic.kz">info@qazrailautomatic.kz</a>
            </li>
            <li>Тел.: +7 717 225 59 00</li>
            <li>Юридический адрес: Республика Казахстан, город Астана, ул. Коктал, 33, 010000</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import ServiceItem from "@/src/entities/service-item"
import { Cpu, FolderCode, LandPlot, Wrench } from "lucide-react"

const Services = () => {
  const data = [
    {
      icon: <LandPlot size={60}/>,
      title: 'Проектирование',
      label: 'Разработка индивидуальных решений для управления движением.'
    },
    {
      icon: <FolderCode size={60}/>,
      title: 'Адаптация программного обеспечения',
      label: 'Интеграция ПО, адаптированного к специфике вашего объекта.'
    },
    {
      icon: <Wrench size={60}/>,
      title: 'Строительно-монтажные работы',
      label: 'Выполнение работ любой сложности для обеспечения функционирования системы'
    },
    {
      icon: <Cpu size={60}/>,
      title: 'Техническое обслуживание',
      label: 'Поддержка, диагностика и ремонт устройств.'
    },
  ]
  return (
    <div id="services" className="max-w-[1280px] mx-auto grid grid-cols-3 py-20 gap-8 items-stretch justify-stretch">
      <div className="w-full col-span-1">
        <span className="text-[#6F7F89] uppercase font-semibold">
          Услуги
        </span>
        <h2 className="text-[#2D3941] mt-2 uppercase font-bold text-3xl">
          Комплексные решения
        </h2>
        <div className="bg-[#558D94] h-[2px] w-7 mt-2"></div>
        <p className="mt-6">
          Для модернизации железнодорожной инфраструктуры
        </p>
      </div>
      <div className="w-full col-span-2 grid grid-cols-2 gap-5 items-stretch justify-evenly auto-rows-[1fr]">
        {data.map((item, index) => (
          <ServiceItem icon={item.icon} title={item.title} label={item.label}/>
        ))}
      </div>
    </div>
  )
}

export default Services
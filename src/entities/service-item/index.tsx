interface Props {
  icon: JSX.Element;
  title: string;
  label: string;
}

const ServiceItem = ({ icon, title, label }: Props) => {
  return (
    <div className="border shadow-md py-4 px-6 flex gap-8 items-center">
      <div>{icon}</div>
      <div>
        <h3 className="text-[#2D3941] uppercase text-lg font-bold">{title}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default ServiceItem;

const Error = ({ title, description }) => {
  return (
    <div className="shadow-2 flex max-w-[30rem] flex-row gap-5 rounded-lg border border-[#F5C5BB] bg-[#FCEDEA] px-5 py-4">
      {/* <div className="h-15 w-15 flex items-center justify-center rounded-md bg-[#EA4E2C] p-2">
        <Warning className="h-8 w-8 fill-white" />
      </div> */}
      <div className="flex flex-col">
        <h4 className="mb-0.5 text-lg font-medium text-black">{title}</h4>
        <p className="text-sm font-medium text-body">{description}</p>
      </div>
    </div>
  );
};

export default Error;

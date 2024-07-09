

function ListPage() {
  return (
  <div className="bg-black">
    <div> 
      <button className="bg-surfaceDark font-semibold rounded-full px-5 py-2 m-2">전체</button>
    <button className="bg-surfaceDark font-semibold rounded-full px-5 py-2 m-2 border">발라드</button>
    <button className="bg-brandPrimary font-semibold text-black rounded-full px-5 py-2 m-2">발라드</button>
    </div>
    <div className="m-8 p-6 border-dashed border border-purple-600 rounded-lg">
    <li className="px-8 py-3 flex items-center space-x-4">
        <span>1</span> 
        <img
        className=""
        src="https://via.placeholder.com/100"
        alt="Placeholder Image"
        width={52}
        height={52}
      />
      <div className="flex flex-col">
        <span className="font-semibold text-lg">Play It Safe</span>
        <span className="text-sidebarSubtitle">Julia Wolf</span>
        </div>
        <span className="flex flex-col flex-grow items-center">Play It Safe</span>
        <div className="ml-auto">
          <span>하트</span>
          <span>곡의 분/초</span>
        </div>
      </li> 
      <li className="px-8 py-3 flex items-center space-x-4">
        <span>2</span> 
        <img
        className=""
        src="https://via.placeholder.com/100"
        alt="Placeholder Image"
        width={52}
        height={52}
      />
      <div className="flex flex-col">
        <span className="font-semibold text-lg">Play It Safe</span>
        <span className="text-sidebarSubtitle">Julia Wolf</span>
        </div>
        <span className="flex flex-col flex-grow items-center">Play It Safe</span>
        <div className="ml-auto">
          <span>하트</span>
          <span>곡의 분/초</span>
        </div>
      </li>
      <li className="px-8 py-3 flex items-center space-x-4">
        <span>3</span> 
        <img
        className=""
        src="https://via.placeholder.com/100"
        alt="Placeholder Image"
        width={52}
        height={52}
      />
      <div className="flex flex-col">
        <span className="font-semibold text-lg">Play It Safe</span>
        <span className="text-sidebarSubtitle">Julia Wolf</span>
        </div>
        <span className="flex flex-col flex-grow items-center">Play It Safe</span>
        <div className="ml-auto">
          <span>하트</span>
          <span>곡의 분/초</span>
        </div>
      </li>
    </div>
    </div>
    );
}

export default ListPage;
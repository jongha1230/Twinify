function MusicSearchPage() {
  return (
    <div className="w-[1440px] mx-auto flex">
      <div className="w-[240px] h-screen bg-gray-300 flex-shrink-0">
        <div className="text-lg font-bold p-4">임시 사이드바</div>
      </div>

      <div className="flex flex-col flex-grow">
        {/* 임시 헤더 자리 */}
        <div className="h-[130px] bg-gray-200 flex items-center p-4">
          <div className="text-lg font-bold">임시 헤더</div>
        </div>

        <div className="p-4">
          <div className="text-2xl font-bold mb-4">검색 결과</div>
          <div className="search-results">결과 리스트</div>
        </div>
      </div>
    </div>
  );
}

export default MusicSearchPage;

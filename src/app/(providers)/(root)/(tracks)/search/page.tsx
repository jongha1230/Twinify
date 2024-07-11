export default async function MusicSearchPage(props) {
  console.log(props);

  const keyword = props.searchParams.keyword;

  return (
    <div className="p-8 mt-16">
      <div className="text-[32px] font-bold mb-20">검색 결과</div>
      <div className="dd">List</div>
      <div>{keyword}</div>
    </div>
  );
}

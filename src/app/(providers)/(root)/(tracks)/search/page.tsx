import SearchResults from "@/app/(providers)/(root)/(tracks)/search/_components/SearchResults";

export default function SearchPage({ searchParams }: { searchParams: { keyword: string } }) {
  const query = searchParams.keyword || "";

  return (
    <div className="p-8 mt-16">
      <div className="text-[32px] font-bold mb-10">검색 결과: {query}</div>
      {query && <SearchResults query={query} />}
    </div>
  );
}

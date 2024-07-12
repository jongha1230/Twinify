"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (query.length < 2) {
      alert("두 글자 이상 입력해 주세요.");
      return;
    }
    router.push(`/search?keyword=${encodeURIComponent(query)}`);
  };

  return (
    <div className="w-full max-w-md relative">
      <Image src="/icons/search.png" alt="Search icon" width={20} height={20} className="absolute left-4 top-1/2 transform -translate-y-1/2" />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search"
          className="w-full px-12 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:border-transparent"
        />
      </form>
    </div>
  );
}

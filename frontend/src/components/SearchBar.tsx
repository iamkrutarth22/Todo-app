import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { ITask } from "../models/Task";

type Props = {
  onSearch?: (results: ITask[]) => void;
  placeholder?: string;
};

const SearchBar: React.FC<Props> = ({ onSearch, placeholder }) => {
  const tasks = useSelector((state: { tasks: ITask[] }) => state.tasks);
  const [query, setQuery] = useState("");

  const normalized = (s: string) => s.trim().toLowerCase();

  const filtered = useMemo(() => {
    const q = normalized(query);
    if (!q) return tasks;
    return tasks.filter((t) => {
      const title = t.title ? normalized(t.title) : "";
      const desc = t.description ? normalized(t.description) : "";
      return title.includes(q) || desc.includes(q);
    });
  }, [query, tasks]);

   useEffect(() => {
    if (onSearch) onSearch(filtered);
  }, [filtered, onSearch]);

 

  return (
    <div className="w-full max-w-2xl md:pr-10 flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search by title or description"}
        className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
};

export default SearchBar;

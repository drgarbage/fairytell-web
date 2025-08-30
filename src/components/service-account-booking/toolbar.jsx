'use client'
import { useTalentList } from "./context"
import { useDrawer } from "./drawer";

export default function Toolbar(){
  const { query, setQuery } = useTalentList();
  const { setShowDrawer } = useDrawer();
  return (
    <div className="flex flex-row rounded-xl bg-white p-2 items-center z-20">
      <input 
        type="text" 
        className="border-none flex-grow p-0"
        placeholder="輸入名字搜尋..."
        value={query} 
        onChange={e => setQuery(e.target.value)} 
        />
      <span 
        className="icon-[material-symbols--tune] text-2xl cursor-pointer" 
        onClick={() => setShowDrawer(true)}
        />
    </div>
  )
}
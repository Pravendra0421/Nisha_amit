"use client";
import { useState } from "react";
import { bookSangeetApiRepository } from "@/services/BookSangeet.api";
const SangeetList = ({ data }) => {
  const [playingId, setPlayingId] = useState(null);
  const [loading,setLoading]=useState(false);
const [list,setList] = useState(data);
  const handlePlay = (id) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };
  const handleDelete = async(id)=>{
    const answer = window.confirm("Are you sure you want to delete this?");
    if (!answer) return;

   try {
        setLoading(true)
      await bookSangeetApiRepository.delete(id);
      setList((prevList) => prevList.filter((item) => item.id !== id)); 
    } catch (error) {
      console.error("Failed to delete item", error);
    }finally{
        setLoading(false);
    }
  }

  return (
    <div className="w-full h-screen">
      <h1 className="text-2xl text-center font-bold mt-2">SangeetList</h1>
      <table className="table-auto border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Side</th>
            <th className="border px-4 py-2">Audio</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.phone}</td>
              <td className="border px-4 py-2">{item.Side}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handlePlay(item.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  {playingId === item.id ? "Pause" : "Play"}
                </button>
                {playingId === item.id && (
                  <audio autoPlay controls className="mt-2">
                    <source src={item.Song} type="audio/mpeg" />
                    Your browser does not support the audio tag.
                  </audio>
                )}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  {loading ? "Deleting ...":"DELETE"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SangeetList;

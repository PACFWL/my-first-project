import { useEffect, useState } from "react";
import { getAllMusic } from "@/app/lib/music/musicApi";

const useMusicList = () => {

const [musicList, setMusicList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  

useEffect(() => {
    fetchMusic();
  }, []);
  
  const fetchMusic = async () => {
    setLoading(true);
    try {
      const data = await getAllMusic();
      setMusicList(data);
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
    }
    setLoading(false);
  };

  return {
    musicList,
    loading
  };

};

export default useMusicList;
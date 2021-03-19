import{useState,useEffect} from "react";

const useFetch =(url) =>{
  const abortCont=new AbortController();
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error,setError] =useState(null);
   
    useEffect(() => {
        setTimeout(() => {
          fetch(url,{signal:abortCont.signal})
          .then(res => {
            if(!res.ok)
            {
              throw Error("cant fetch the data")
            }
            return res.json();
          })
          .then(data => {
            setIsPending(false);
            setData(data);
            setError(false);
          })
          .catch(err=>{
            if(err.name==='AbortError')
            {
              console.log('fetch aborted')
            }
            else{
              setIsPending(false);
              setError(err.message);
            }
            
    
          })
        
        }, 1000);
        return ()=>abortCont.abort();
      }, [url])
      return {data,isPending,error}
}
export default useFetch;
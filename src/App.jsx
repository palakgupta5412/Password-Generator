import { useCallback, useEffect, useState , useRef } from "react"


function App() {

  {/* constants to keep track of length , is number checkbox is checked , if characters allowed or not */}
    const [length , setLength] = useState(8);
    const [isNumberAllowed ,  setNumberAllowed] = useState(false);
    const [isCharacterAllowed , setCharacterAllowed] = useState(false);
    const [password , setPassword] = useState("");

    //Making and initializing the reference variable 
    const passwordRef = useRef(null);

    //Now making funcction which generated password randomly acc to what length is asked
    const generatePassword=useCallback( ()=> {
      let pass="";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrst";

      if(isNumberAllowed) { str+="0123456789" };
      if(isCharacterAllowed) {str+="!@#$%^&*"} ;

      for(let i=1 ; i<=length ; i++){
        let char = Math.floor(Math.random()*str.length+1);
        pass += str.charAt(char);
      }

      setPassword(pass);
    } , [length , isNumberAllowed , isCharacterAllowed , setPassword] )

    useEffect(()=>{
      generatePassword() 
    } , [length , isCharacterAllowed , isNumberAllowed , generatePassword])

    const copyText = useCallback(()=>{
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,10);
      window.navigator.clipboard.writeText(password);
    })
  return (
    <>

      <div className="w-full h-screen dlex justify-center items-center">
      <div className="my-36 p-8 flex flex-col justify-center items-center">
        <h1 className="text-4xl text-center font-serif font-bold m-6 text-white">Password Generator</h1>

        <div className="w-96 max-w-md mx-auto rounded-lg px-4 my-8 h-20 text-center flex overflow-hidden max-sm:w-60">
          
          <input 
          className="w-full h-8 p-2 outline-2 rounded-l-lg flex-grow" 
          type="text" 
          placeholder="Password" 
          value={password} 
          readOnly
          ref={passwordRef}
          />
          
          <button onClick={copyText} className="outline-none hover:bg-blue-800 bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-r-lg h-8">Copy</button>
        
        </div>

        <div className="flex text-sm gap-x-2 items-center justify-center gap-1 flex-col">
          <div className="flex items-center gap-1">
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            //running a function to change length on changing slider 
            onChange={(e)=>{setLength(e.target.value)}} 
             />
             <label className="text-orange-500 font-bold">Length : {length} </label>
          </div>
          <div className="flex items-center gap-x-1 mx-10">
            <input 
              type="checkbox" 
              defaultChecked={isNumberAllowed} 
              id="numberInput" 
              onChange={()=>{setNumberAllowed(prevValue => !prevValue)}}
              />
            <label htmlFor="numberInput" className="text-orange-500 font-bold p-2">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1 mx-8">
            <input 
              type="checkbox" 
              defaultChecked={isCharacterAllowed} 
              id="numberInput" 
              onChange={()=>{setCharacterAllowed(prevValue => !prevValue)}}
              />
            <label htmlFor="numberInput" className="text-orange-500 font-bold p-2">Characters</label>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default App

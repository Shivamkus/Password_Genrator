import { useState, useEffect, useRef, useCallback } from "react"
import {toast,  ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const PasswordGenrator = () => {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const[password, setPassword]= useState('');
  const [copy , setCopy]= useState('copy')

  // useRef hooks
  const  passwordRef= useRef(null);

  const passwordCopyToclipBoard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99)

    window.navigator.clipboard.writeText(password);
    toast.success('password copied');

    setCopy('copied');
    {
      setTimeout (()=>{setCopy('copy')} , 3000)
    }


  },[password])

  const passwordGenrator = useCallback(()=>{
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(numAllowed) str += '1234567890';
    if(charAllowed) str += '!@#$%^&*()_+=-;:.,></?';

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);


    }

     setPassword(pass)


  },[length, numAllowed, charAllowed, setPassword]);


  useEffect(() =>{
    passwordGenrator();
  },[length, numAllowed, charAllowed, passwordGenrator])
  return (
    <>
    <div className="w-full h-full max-w-md mx-auto shadow-lg rounded-md px-4 my-8 py-5 text-orange-700 bg-gray-900">
     <h1 className="text-white text-center mb-2 mt-1 "> Password Genrator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
    <input type="text"
    value={password}
    placeholder="password"
    readOnly
    ref={passwordRef}
    className="outline-none w-full py-1 px-3"
    />
    <button
    onClick={passwordCopyToclipBoard}
    className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
    {copy}
    </button>
    </div>

    <div className="flex text-sm gap-x-2">
    <div className="flex items-center gap-x-1">
    <input 
    type="range"
    min={6}
    max={15}
    value={length}
    onChange={(e)=>{setLength(e.target.value)}}
    className="cursor-pointer"
    />
    <label>Length : {length}</label>
    
    </div>

    <div className="flex items-center gap-x-1">
     <input
     type="checkbox"
     defaultChecked={numAllowed}
     id='numberInput'
     onChange={()=>{
      setNumberAllowed((prev) => !prev)
     }}
     />
     <label>Numbers</label>
     </div>

     <div className="flex items-center gap-x-1">

     <input
     type="checkbox"
     defaultChecked={charAllowed}
     id='characterInput'
     onChange={()=>{
      setCharAllowed((prev) => !prev)
     }}
     />
     <label>characters</label>
    </div>
    </div>
    </div>   
     <ToastContainer />

    </>
  )
}

export default PasswordGenrator

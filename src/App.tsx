import Naviform from './Naviform'
import { useState } from 'react';

import './App.css'



function App() {  
  const [status, setStatus] = useState(false);

  return (
    <>
     <div>
      <p>여기는 부모 컴포넌트 위치 상태변수 status : {status ? "true" : "false"}</p>
      <button onClick={()=>{
        setStatus(true); 
        // 나는 true만 값으로 처리
      }}>나는 부모컴포넌트 상태변수관리 트리거</button>
      <Naviform status={status} setStatus={setStatus}></Naviform>
     </div>
    </>
  )
}

export default App

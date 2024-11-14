import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './views/Login';

function App() {
  return (  
    <>
      <BrowserRouter>
        <Routes>
            <Route exact path='/login' element={ <Login/> }/>
        </Routes>
      </BrowserRouter>
    </>



    // <div className="App">
    //   <div className='view-container'>
    //     <div className='section-container' >
    //       <div className='btn-primary btn' >
    //         Click Here
    //       </div>
    //       <div className='btn-secondary btn' >
    //         Or Here
    //       </div>

    //     </div>
    //   </div>
    // </div>
  );
}

export default App;

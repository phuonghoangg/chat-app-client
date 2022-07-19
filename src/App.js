import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import {PublicRouter} from './router'
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {
            PublicRouter.map((route,index)=>{
              const Page = route.element
              return <Route key={index} path={route.path} element={<Page />}/>
            })
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;

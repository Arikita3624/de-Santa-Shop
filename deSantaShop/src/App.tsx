import useAuth from "./components/Views/Client/Pages/Auth/UseAuth"
import Router from "./routers"

function App() {

   const { user } = useAuth();
   console.log(user);



  return (
     <div>
        <Router />
     </div>
  )
}

export default App

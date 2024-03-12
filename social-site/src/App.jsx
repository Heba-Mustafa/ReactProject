import{BrowserRouter,Routes,Route} from 'react-router-dom'
import { MyContext } from './components/MyContext'; 
import SignUp from './components/sign-up/SignUp';
import Home from './components/home/Home';
import Main from './components/home/Main';
import LogIn from './components/login/Login';
import AddPost from './components/addPost/AddPost';
import Profile from './components/profile/Profile';
import ImageUpload from './components/imgUpload/ImageUpload';
import EditPost from './components/editPost/editPost';
const App =() => {
  return (
     
    <BrowserRouter>
    <MyContext>
    <Routes>
      <Route path='/signup' element= {<SignUp/>}></Route>
      <Route path='/' element= {<Main/>}></Route>
      <Route path='/login' element= {<LogIn/>}></Route>
      <Route path='/home' element= {<Home/>}></Route>
      <Route path='/addpost' element= {<AddPost/>}></Route>
      <Route path='/profile' element= {<Profile/>}></Route>
      <Route path='/imgupload' element= {<ImageUpload/>}></Route>
      <Route path='/editpost/:postId' element={<EditPost/>} />




    </Routes>
    </MyContext>
    </BrowserRouter>
    
    
    
    
  );
}

export default App;
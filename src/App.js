
import React, { useEffect } from 'react';
import AOS from 'aos';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import EmailVerify from './components/EmailVerify/EmailVerify';
import routes from './pages';
import Page404 from './pages/404';
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './components/ResetPassword/ResetPassword';
import '../src/assets/binasea.css';
import '../src/assets/font-awesome.css';

function App() {
	const user = localStorage.getItem("token");

    useEffect(() => {
        AOS.init({
          duration : 2000
        }); 
      }, []);

    return (
        <>

            <Header />

            <Routes>
            <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
                <Route path='/forgot-password' element={<ForgotPassword />}/>
                <Route path='/reset_password/:id/:token' element={<ResetPassword />}/>
                
                {
                    routes.map((data,idx) => (
                        <Route key={idx} path={data.path} element={data.component} exact />

                    ))
                }

                <Route path='*' element={<Page404 />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;

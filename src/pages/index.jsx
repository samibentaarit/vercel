import  { useState } from 'react';

import Blog01 from "./Blog01";
import Blog02 from "./Blog02";
import BlogDetails01 from "./BlogDetails01";
import BlogDetails02 from "./BlogDetails02";
import Collection from "./Collection";
import Contact from "./Contact";
import Create from "./Create";
import Dashboard from "./Dashboard";
import Explore01 from "./Explore01";
import Explore02 from "./Explore02";
import Explore03 from "./Explore03";
import Explore04 from "./Explore04";
import Faqs from "./Faqs";
import HelpCenter from "./HelpCenter";
import Home01 from "./Home01";
import ShowUser from "./ShowUser";
import ItemDetails01 from "./ItemDetails01";
import ItemDetails02 from "./ItemDetails02";
//import LiveAutions01 from "./LiveAutions01";
import LiveAutions02 from "./LiveAutions02";
import Login from "../components/Login/Login";
import Ranking from "./Ranking";
import Register from "../components/Register/Register"
import Wallet from "./Wallet";
import ViewUser from "./viewUser";
import ViewQuestion from "./viewQuestion";
import Dash from "./Dash";  
import Profile from "./profile";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import ViewLesson from "./viewLesson";
import ViewCalendar from "./ViewCalendar";
import './index.css';
import ViewFreeTime from "./viewFreeTime";
import Holidays from "./viewHolidays";
import ViewCalendarTeacher from "./ViewCalendarTeacher";
import EventView from "./EventView"
import EventDetail from "./EventDetail";
import EFrontDetail from "./EFrontDetail";
import EventSuccess from "./EventSuccess";
import EventFail from "./EventFail";
import EventTickets from "./EventTickets";
import EventTest from './EventTest'
import EventsDashComments from "./EventsDashComments";
import EventsDashReplies from "./EventDashReplies";
import ViewQuizz from "./ViewQuizz";
import QuizzComp from "./QuizzComp";
import QuestionDetail from "./QuestionDetail";
import QuizzDetail from "./QuizzDetail";
import ViewResult from "./ViewResult";
import Quiz from "./Quiz";
import ResultDetail from "./ResultDetail";
import QuizzValide from "./QuizzValide";
import ViewClassroom from './ViewClassroom';
import ViewCalendarStudent from './ViewCalendarStudent';
import ViewCourse from './ViewCourse';
import View1 from './1';
import EventSatisfaction from './EventSatisfaction';

   
function getUserInfoFromCookie() {
  // Obtenez la valeur du cookie actuel (vous pouvez remplacer document.cookie par la méthode que vous utilisez pour récupérer les cookies)
  var cookieValue = document.cookie.match(/(?:^|;) ?user=([^;]*)(?:;|$)/);

  if (cookieValue) {
    // Décodez la chaîne JSON
    var decodedValue = decodeURIComponent(cookieValue[1].replace(/\+/g, ' '));

    // Convertissez la chaîne JSON en objet JavaScript
    var userObject = JSON.parse(decodedValue);

    // Retournez l'objet utilisateur
    return userObject;
  } else {
    // Retournez null si le cookie n'est pas trouvé
    return null;
  }
}

// Utilisez la fonction pour obtenir les informations de l'utilisateur
var currentUser = getUserInfoFromCookie();

// Vérifiez si les informations de l'utilisateur existent
if (currentUser) {
  // Affichez les informations de l'utilisateur
  console.log("First Name:", currentUser.firstName);
  console.log("Last Name:", currentUser.lastName);
  console.log("Email:", currentUser.email);
  console.log("Role:", currentUser.role);
  console.log("Phone Number:", currentUser.phoneNumber);
  console.log("Image:", currentUser.image);
  console.log("Level:", currentUser.level);
  console.log("Speciality:", currentUser.speciality);
} else {
  console.log("Les informations de l'utilisateur ne sont pas disponibles.");
}

const DashWrapper = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getUserInfoFromCookie();
    if (user) {
      setCurrentUser(user);
    } else {
      // Redirect to 404 page if user data is not found in cookies
      navigate('/404', { replace: true });
    }
  }, [navigate]);

  return currentUser ? <Dash /> : null;
};
const routes = [
  { path: '/', component: <Home01 />},

  { path: '/explore-v1', component: <Explore01 />},
  { path: '/explore-v2', component: <Explore02 />},
  { path: '/explore-v3', component: <Explore03 />},
  { path: '/explore-v4', component: <Explore04 />},
  { path: '/collection', component: <Collection />},
//  { path: '/live-auctions-v1', component: <LiveAutions01 />},
  { path: '/live-auctions-v2', component: <LiveAutions02 />},
  { path: '/item-details-v1', component: <ItemDetails01 />},
  { path: '/item-details-v2', component: <ItemDetails02 />},
  { path: '/ranking', component: <Ranking />},
  { path: '/help-center', component: <HelpCenter />},
  { path: '/faqs', component: <Faqs />},
  { path: '/wallet', component: <Wallet />},
  { path: '/login', component: <Login />},
  { path: '/register', component: <Register />},
  { path: '/create', component: <Create />},
  { path: '/blog-v1', component: <Blog01 />},
  { path: '/blog-v2', component: <Blog02 />},
  { path: '/blog-details-v1', component: <BlogDetails01 />},
  { path: '/blog-details-v2', component: <BlogDetails02 />},
  { path: '/contact', component: <Contact />},

  { path: '/users', component: <ViewUser />},
  { path: '/question', component: <ViewQuestion />},

  { path: '/dash', component: <Dash /> },
  { path: '/dashboard', component: <Dashboard />},

  { path: '/profile', component: <Profile />},

  { path: '/showUser/:id', component: <ShowUser />},

  { path: '/lesson', component: <ViewLesson />},
  { path: '/calendar', component: <ViewCalendar />},
  { path: '/freetime', component: <ViewFreeTime />},
  { path: '/holidays', component: <Holidays />},
  { path: '/mycalendarTeacher', component: <ViewCalendarTeacher />},
  { path: '/mycalendarStudent', component: <ViewCalendarStudent />},
  { path: '/classroom', component: <ViewClassroom />},
  { path: '/course', component: <ViewCourse />},
  { path: '/1', component: <View1 />},


 { path: '/quizz', component: <ViewQuizz/>},
  { path: '/test', component: <QuizzComp/>},
  { path: '/questionDetail/:id', component: <QuestionDetail />},
  { path: '/quizzDetail/:id', component: <QuizzDetail />},
  { path: '/results', component: <ViewResult />},
  { path: '/resultDetail/:id', component: <ResultDetail />},
  { path: '/quizz/:id', component: <Quiz />},
  { path: '/quizz/validation/:id', component: <QuizzValide />},
  { path: '/event', component: <EventView />},
  { path: '/eventDetail/:id', component: <EventDetail />},
  { path: '/FronteventDetail/:id', component: <EFrontDetail />},
  { path: '/success', component: <EventSuccess />},
  { path: '/fail', component: <EventFail />},
  { path: '/ticket', component: <EventTickets />},
  { path: '/testEvent', component: <EventTest />},
  { path: '/comments', component: <EventsDashComments />},
  { path: '/replies/:id', component: <EventsDashReplies />},
  { path: '/satisfaction', component: <EventSatisfaction />},

]

export default routes;
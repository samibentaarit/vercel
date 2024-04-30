// ... (your existing imports)
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook inside the component
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Function to check if the user is authenticated (you can implement your own logic)
const isAuthenticated = () => {
  // Check if the user is authenticated based on your criteria (e.g., checking cookies)
  // Replace the following line with your actual authentication check
  return !!Cookies.get('user');
};



const menus = [
  {
    id: 1,
    name: 'Home',
    links: '/',
  },
  {
    id: 5,
    name: 'About Us',
    links: '/create',
  },
  {
    id: 6,
    name: 'Contact',
    links: '/contact',
  },

];


// Add the "Login"/"Register" or "Profile"/"Logout" links based on authentication status
if (isAuthenticated()) {
  menus.push(
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {
      id: 9,
      name: 'Profile',
      links: '/profile',
    },


  );
} else {
  menus.push(
    {

    },
    {

    },
    {

    },
    {

    },
    {
      id: 7,
      name: 'Login',
      links: '/login',
    },
    {
      id: 8,
      name: 'Register',
      links: '/register',
    }
  );
}



export default menus;

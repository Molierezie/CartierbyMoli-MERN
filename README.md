

# Application E-commerce 
(I use the free version of render. so If you close the page and we come-back later there will be 1 minute to loading… sorry)

Preview image on the application


<img width="721" alt="Capture d’écran 2024-09-19 à 12 19 43" src="https://github.com/user-attachments/assets/219291a3-c6c6-48ef-931d-ccb233c1d36c">


Link for visite the application ->  [cartierbymoli-mern.onrender.com](https://cartierbymoli-mern.onrender.com)


# Stack

Stack MongoDB, Express JS, React, NodeJS, tailwind, Javascript

<a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a>
 <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a>
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a>
 <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/>
  <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a>
   <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>

---

# What's CartierByMoli ?

This is a clone of the real website Cartier [Carter.fr](https://www.cartier.com/fr-fr/. ) I build this for improve my skills using MERN STACK and tailwind CSS

---
# Installation :

We could see the entirely installation here I created a repo specifically for that and I also explain the usage of all the package that I download for this project here :


- [myNotesTaking - setUp](https://github.com/Molierezie/myNotesTakings-Lesson-Project/blob/main/6_MERN-JS-mNT/1_General/1_setUp-Config/1_setUp.md#-setup--configuartion)


---
# Database :

- First of all I using mongoDB Compass for handles the database to my project and after I realize for deploy my project in the production I might to use mongoDB Atlas. So I created  an account and let’s go.

---
# Back-end


## `RestApi`

- For handle the user , products and categories  management for my app I use the classic CRUD with express, node and mongoDB

--

## `Authentication with HttpOnly Cookie` :

- I use the rest apis for handle the back-end of this application and for the authentication, after I decide to use HttpOnly Cookie with JWT

Why ?

`📔 Ressource`

- [📖 - cheatcode.co](https://cheatcode.co/blog/how-to-implement-secure-httponly-cookies-in-node-js-with-express )
- [📖 - rdegges.com](https://www.rdegges.com/2018/please-stop-using-local-storage/)
- [🎥 - mini playlist webpwinzed](https://www.youtube.com/playlist?list=PLZOToVAK85Mp7_iZsMgPKKL6UE0LyP6JX/)

--

- I see lot of docs or video explaining why store the user data in localStorage is sensitive 
- HttpOnly cookie with JWT can resolve security fails, obviously don't resolve all the issues but prevent lot of them, good choice and simply implementation
- more detail in the ressource
--

## `Testing API` :

- Before go through the front-end, I tested the api requests with Postman

--

## `Handle image` :

- At the beginning I using mutter but I ran lot of issues when I have to deploy my app 
- I decided to switch with Cloudinary and it’s very simple for the usage and the setup in my projects. I don’t ran a issue for the deployment


---
# Style CSS :

`📔 Ressource fro subgrid`
- 🎥 [Slaying the dragon Ytb](https://www.youtube.com/watch?v=Yl8hg2FG20Q)
- ressource for tailwind the official doc
--

- I use Tailwind CSS for the style and I love it especially for the media queries it’s very simple
- For handle the box (the shop where there is the product) in this app I use lot of time subgrid, it’s a good alternative to flexbox more information here 
- I use some of animation with react-scroll and react-multi-carousel

---

# State Management and handle Request from API 

`RTQ Query`

`📔 Ressource understand easly RTQ Query`
- 🎥 [SAP developpers Ytb](https://www.youtube.com/watch?v=Wy8HWC2LSo0)
- 🎥 [Oliver the Dev Ytb](https://www.youtube.com/watch?v=7KkNZffq21Y&t=1491s)
- RTK Query doc

--

- I decide to use RTK Query because it’s a fancy way to fetching data, handle the cache, invalidation.
- I build an e-commerce website, I need to have the data (products etc) up to date and with the feature on RTK Query it’s possible to keep it
- For add the products on the favorites and in the cart and for the user have always the good number of product in favorite and in cart It’s was also a good things to use it with the createSlice 
- The using of RTK Query is very cool in general with the store build on top of the app for displaying  the data with useSelector and send the req in the Slice with useDispatch. It’s also for avoid the props drilling, there is another fancy state management and we could see another projects with this soon in my GitHub…

---

# Feature on the application :

## Invite (no user , no admin)

- The invite user which has not an account and every another user (admin, user) can add the products in the favorites , in the cart, create an account
- I don’t add a functionality for order, I think I will add later because I’m learning 

--

## User

- The user can login, logout with a classic CRUD
- The user can edit this profile
- He can add a ratings and comments the products only once review by products (for this feature I help in internet I don’t add this feature myself)

--

## Admin

- The admin thanks to the CRUD again can remove, add, edit the user on the application
- He can add , edit and remove the users, products and the categories

--

# Deployment :

- Before the deployment I ran lot of glitch. particularly on the mobile devices the browser don’t supported the new features  of JS. I resolve them by using the package [vite@legacy](https://www.npmjs.com/package/@vitejs/plugin-legacy)
- I use also react-lazy() for using th data of the components only when it’s mount
- For the deployment I use render.com because I would like to deploy the back-end and the front-end in the same domain

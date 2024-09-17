# AOS


## How use Aos in react ?

- Step 1

    - website https://michalsnik.github.io/aos/
    - npm i aos

- Step 2 - in my folder dist/html

```html


    <!-- ANIMATION SCROLL AOS CSS -->
    <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">

  </head>
  <body>
    <div id="root"></div>

    <!-- ANIMATION SCROLL AOS JS -->
    <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>

    <script>
      AOS.init();
    </script>
    
  </body>


</html>


```

- Step 3 - in my component React


```jsx

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from 'react'

const Home = () => {
  
  useEffect(() => {
    AOS.init({

      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);


```


- import AOS and initialize with useEffect



difference flex / grid


```js


                     <div className='h-[50vh] grid'>

                      <div className='h-[50vh] grid-cols-grid-test'>


// // add  this in the tailwind.config if I want the responsive
//   gridTemplateColumns : {
//       'grid-test' : 'repeat(auto-fit , minmax(300px,1fr))',    
//     },


                    <div className='h-[50vh] flex'>

  
        
                {topProducts.map((love)=>(




// add subgrid in the tailwind.config

  //  gridTemplateRows : {

  //     'sub' : 'subgrid',
    
  //   },


// row-[1/6]  If I want all in one line
// row-[span_5] If I want responsive


                        <div key={love._id} className="sm:w-[25vw] md:w-[15vw] grid grid-rows-sub row-[1/6] mx-auto text-center  hover:bg-white hover:border-2 border-solid border-black/20">

                        <HeartFav product={love}/>
                        <img src={love.image} alt='image-bijoux' className="sm:mx-auto h-[20vh] w-[30vw] md:w-[15vw] p-2 object-cover"/>

                        <h3 className='uppercase font-bold text-[0.7rem]'>{love.name} hhhhhhhhhhhhhhhh</h3>

                        <p>{love.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>

                        <Link to={`/product-details/${love._id}`}
                        className="sm:w-[15vw] h-[4vh] mx-auto md:w-[8vw] bg-black items-center text-white justify-center flex shadow-lg hover:bg-white  hover:text-black hover:border-2 border-black duration-300 cursor-pointer active:scale-[0.98]"
                        >
                        <button className="px-5 py-2"><a className="" href="">Acheter</a></button>
                        </Link>

                        </div>

                ))}

```
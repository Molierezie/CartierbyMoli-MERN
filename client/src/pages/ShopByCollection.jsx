import React from 'react'

// ----------- Hook provide by React -----------
import { useEffect } from 'react'

// ----------- Hook provide by react-router-dom -----------
import { useParams } from 'react-router'
import { useGetProductByCollectionQuery } from '@/redux/api/productApiSlice'
import { useGetAllCategoryQuery } from '../redux/api/categoryApiSlice'

// --------------- Reusable components  ---------------
import GoBackHome from '@/components/GoBackHome'
import ImageAndDesc from '@/components/ImageAndDesc.jsx'
import Shop from '@/components/Shop.jsx'

// --------------- Style & Animation  ---------------

// ----------Image


import LunettesCollection from '/assets/LunettesCollection.png'
import CollierCollection from '/assets/CollierCollection.png'
import BraceletCollection from '/assets/BraceletCollection.png'
import SacCollection from '/assets/SacCollection.png'
import BaguesCollection from '/assets/BagueCollection.png'
import MontreCollection from '/assets/MontreCollection.png'
import BoucleCollection from '/assets/BoucleOreilleCollection.png'


// ------------ AOS Scroll Animation
import AOS from "aos";
import "aos/dist/aos.css";





  

const ShopByCollection = () => {

  
  // We configure the scroll animation
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out-cubic",

    });
  }, []);



  // We use UseParams for retrieve the id in the url
  const { id } = useParams();
  
  // We get the data from the API using the function create by RTQ Query
  const { data : productsByCategory, isLoading : isLoadingTest1, error : errorTest1} = useGetProductByCollectionQuery(id)
  
  // We get the categories because we using for the conditional in JSX
  const { data : categories, isLoading : isLoadingCategories, error : errorCategories} = useGetAllCategoryQuery()


  if(isLoadingTest1 || isLoadingCategories) return `Loading...`
  if(errorTest1 || errorCategories) return `Error`
  
  console.log(productsByCategory[0].category);


  return (
   


    <div className='w-[100vw] bg-white p-4'>
      <GoBackHome/>
    
    
    {/* The logic here when we are in the navbar and we click in a specific category / collection
    We display the exact category 
    How ? If the category in the url corresponds to the id of the model category we display the exact category with information */}

    {

      productsByCategory[0].category === categories[0]._id ? (

        <ImageAndDesc

        image={BaguesCollection}
        title="Toutes les bagues"
        description="Le bracelet Love quand la fonctionnalité devient ornement."
        />
  
      ) :

      productsByCategory[0].category === categories[1]._id ? (

        <ImageAndDesc

        image={BoucleCollection}
        title="Toutes les Boucles d'oreilles"
        description="Or blanc, or jaune, or rose : la trilogie chromatique est la signature de Trinity, comme la pureté et la simplicité de son design."
        />

       ) 
       :  productsByCategory[0].category === categories[2]._id ? (

        <ImageAndDesc

        image={BraceletCollection}
        title="Tous les Bracelets"
        description="Trois anneaux spectaculaires qui répliquent, à l’échelle du poignet, l’ampleur, la mobilité et la fluidité de la bague."
        />

        
       ) : 
       productsByCategory[0].category === categories[3]._id ? (

      <ImageAndDesc

      image={CollierCollection}
      title="Tous les colliers"
      description="Un animal emblématique pour un collier qui aimante le regard."
      />

       ) : 
       productsByCategory[0].category === categories[4]._id ? (

        <ImageAndDesc

        image={MontreCollection}
        title="Toutes les montres"
        description="  Créée en 1904, la montre Santos repose sur le concept de forme, le goût du minimalisme, la précision des proportions et le souci du détail."
        />

        
       ) : 
       productsByCategory[0].category === categories[5]._id ? (

     
        <ImageAndDesc

        image={SacCollection}
        title="Tous les sacs"
        description=" Une collection pensée pour offrir des portés différents, épaule, porté main ou croisé le long du corps, grâce à sa bandoulière ajustable."
        />

       ) :  productsByCategory[0].category === categories[6]._id ? (

        <div className='bg-[#f9f9f9] h-[50vh] w-full flex'>

    
          <img src={LunettesCollection} className='w-[50%] object-fill object-center'/>

          <div data-aos="fade-up" className='bg-[#f9f9f9] h-[50vh] w-[50%] flex flex-col justify-center items-center gap-y-12 text-center'>

            <h3 className='sm:uppercase font-bold text-[1.2rem] max-w-[28vw] md:text-[2rem] md:max-w-[38vw] bg-[#f9f9f9]'>SIGNATURE C DE CARTIER</h3>

            <p className='sm:max-w-[25vw] text-[0.7rem] md:text-[1rem]'>
            Les verres biseautés et les couleurs intenses démultiplient l'impact des modèles Signature C de Cartier.
            </p>

          </div>

        </div>
       )  : null

  }



  
    <Shop 
    product={productsByCategory}
  
    />
 

    

      </div>

      
        
      
    
  )
}

export default ShopByCollection
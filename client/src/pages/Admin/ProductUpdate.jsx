import React from 'react'

import { useState, useEffect, useRef } from "react";
import {useNavigate, useParams} from "react-router-dom"
import {useFetchProductQuery, useUpdateProductMutation,useUploadProductImageMutation, useDeleteProductMutation } from "../../redux/api/productApiSlice";
import { useGetAllCategoryQuery } from "../../redux/api/categoryApiSlice";
import usePreviewImg from "../../utils/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { PiImagesSquareDuotone } from "react-icons/pi";

import GoBackHome from '@/components/GoBackHome';



const ProductUpdate = () =>{


  const navigate = useNavigate()

  
  // We retrieve the id from the path of the url
  const { id : productId } = useParams()

  // we display the nformation of the specific product from the api
   const { data : product } = useFetchProductQuery(productId)

  
  // We get also the categories because on your product schema we have category
   const { data : categories = []} = useGetAllCategoryQuery()


   // iamge same Logic createProduct
   const imageRef = useRef(null)
   const { handleImageChange, imgUrl, setImgUrl} = usePreviewImg();

   useEffect(()=>{

    if(imgUrl){
      setImage(imgUrl)
    }


  }, [imgUrl])

 



   const [uploadProductImage] = useUploadProductImageMutation();
   const [updateProduct] = useUpdateProductMutation()
   const [deleteProduct] = useDeleteProductMutation()


   console.log(product);
   


  // We create each state for the information in our product
  const [ name, setName ] = useState("")
  const [ price, setPrice ] = useState("")
  const [ image, setImage ] = useState(product?.image || "")
  const [description, setDescription] = useState("");
  const [ category, setCategory ] = useState("")
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");


  

  // We create a side effect for always keep the data of our product in the browser
  
  useEffect(()=>{
    
    if (product && product._id ){

  

        setName(product.name || " ");
        setDescription(product?.description);
        setPrice(product?.price || " ");
        setCategory(product.category?._id || " ");
        setQuantity(product?.quantity || " ");
        setBrand(product?.brand || " ");
        setStock(product?.countInStock || " ");
        setImage(product?.image || " ");
      
    }
  }, [product]);






  // ------------------------------- HANDLE UPDATE PRODUCT ------------------------------- //

const handleSubmit = async (e) =>{

  e.preventDefault()

  try{



// As we work with a from we usiung the method with new FormData for send the data to our API
// As is a specific product we send the id and the data from the form
    const formData = new FormData()

    formData.append('description', description)
    formData.append('name', name)
    formData.append('image', imgUrl)
    formData.append('price', price)
    formData.append('category', category)
    formData.append('quantity', quantity)
    formData.append('brand', brand)
    formData.append('countInStock', stock)


    const res = await updateProduct({ id : productId, formData });

    if(res?.error){

      console.error
      toast.error( res.error, 'something wrong')
      
    }else{

      toast.success(`${name} is updated`)
      setImage(res?.image)
      navigate('/admin/all-product-list')

    }


  }catch(error){

     console.error
      toast.error('something wrong')
  }
}



  // ------------------------------- HANDLE DELETE PRODUCT ------------------------------- //

const handleDelete = async ()=>{




    const confirm = window.confirm("Do you want to delete this product?");
    if (!confirm) return;


    try{

    // const {data} = await deleteProduct(params._id)
    await deleteProduct(productId)
    toast.success(`${name} is deleted`)
    navigate('/admin/all-product-list')


  }catch(error){
    console.log(error);
    toast.error("Delete failed. Try again.")

  }



}




  return(


    <>
      <div className="container  xl:mx-[9rem] sm:mx-[0]">
        <GoBackHome/>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/4 p-3">
            <div className="h-12">Update / Delete Product</div>

            {/* {image && (
              <div className="text-center">
                <img
                  src={image}
                  alt="product"
                  className="block mx-auto w-full h-[40%]"
                />
              </div>
            )} */}


            { product?.image ? (

                <div className="text-center">
                <img
                  src={image}
                  alt="product"
                  className="block mx-auto w-full h-[40%]"
                />
                </div>
            ):(
              <h1>No Image</h1>
             
            )}

            <div className="mt-6 flex flex-col ">

              <p className="ml-[1rem]">Changer d'image</p>
             
              <input type='file' ref={imageRef} hidden onChange={handleImageChange}/>

            
                <BsFillImageFill
        
                  className="text-black w-[20vw] h-[10vh] cursor-pointer ml-[-2rem]"
                  onClick={() => imageRef.current.click()}
                />
            </div>

            <div className="p-3">
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name">Name</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="two">
                  <label htmlFor="name block">Price</label> <br />
                  <input
                    type="number"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                    value={price}

                    onChange={(e) => setPrice(e.target.value)}
                  />
             
                </div>
              </div>

              <div className="flex flex-wrap">
                <div>
                  <label htmlFor="name block">Quantity</label> <br />
                  <input
                    type="number"
                    min="1"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="name block">Brand</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <label htmlFor="" className="my-5">
                Description
              </label>
              <textarea
                type="text"
                className="p-2 mb-3 bg-[#101011]  border rounded-lg w-[95%] text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="flex justify-between">
                <div>
                  <label htmlFor="name block">Count In Stock</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="">Category</label> <br />
                  <select
                    placeholder="Choose Category"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                    onChange={(e) => setCategory(e.target.value)}
                  >

                    <option>Choisir une catégorie</option>
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="">
                <button
                  onClick={handleSubmit}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-green-600 mr-6"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-pink-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>





  )
}   

export default ProductUpdate

// ----------- Hook provide by React -----------
import {useRef, useState } from "react";

// ----------- Hook provide by react-router-dom -----------
import { useNavigate } from "react-router-dom";


// --------------- Export function from specific apiSlice  ---------------
import {
    useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";

import { useGetAllCategoryQuery } from "../../redux/api/categoryApiSlice";

// --------------- Reusable Components ---------------

// ----- For the handle image
import usePreviewImg from "../../utils/usePreviewImg";

import GoBackHome from '@/components/GoBackHome';


// --------------- Style & Animation  ---------------

// -------- react icons
import { BsFillImageFill } from "react-icons/bs";

// -------- Toast
import { toast } from "react-toastify";


const ProductList = () => {
 
  
  // for create the product we set all the information in a state with empty string

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);



  const navigate = useNavigate();


  // For the handle image we use our Hook and useRef 
  const imageRef = useRef(null)
  const { handleImageChange, imgUrl } = usePreviewImg();

  

  // For the product we need a specific category so we use the useGetAllCategoryQuery
  // We use the powerful of RQRT Query for trigger an API with a specific function here createProduct

  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useGetAllCategoryQuery();




  // ------------------------------- HANDLE CREATE PRODUCT -------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();


    // As we work with a from we usiung the method with new FormData for send the data to our API
    // in the left the name of the element in our model in back-end and in the right the name of the element in our front-end
    try {
      const productData = new FormData();
      productData.append("image", imgUrl);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

       

        const res = await createProduct(productData).unwrap()
    
        if (res?.error) {
            
         
          toast.error(res?.error);
          
        
        } else {

            toast.success(` ${name} is created`);
            navigate("/admin/all-product-list");
           
        }


    } catch (error) {
      console.error(error);
      const errorMessage = error.data?.message
      toast.error(errorMessage);
      
    }
  };





  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">

      <GoBackHome/>
      <div className="flex flex-col md:flex-row">
        
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>

          {imgUrl && (
            <div className="text-center">
              <img
                src={imgUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

      

          <input type='file' hidden ref={imageRef} onChange={handleImageChange} />

							<BsFillImageFill
								style={{ marginLeft: "5px", cursor: "pointer" }}
								size={26}
								onClick={() => imageRef.current.click()}
							/>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name block">Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="name block">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
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
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">Count In Stock</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
# <font color="#00b0f0">1️⃣ -  Create Product</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

### <font color="#95b3d7">1 - Code before</font>

🧩 in productApiSlice

```js


```

🧩 in productList.jsx

```js


```

### <font color="#95b3d7">1 - Task</font>

- a
- b
- c 

### <font color="#4f81bd">1  - Solution ✅ </font>

#### <font color="#b2a2c7">🧩 - in productApiSlice </font>

##### <font color="#a5a5a5">💻 - Code</font>


```js

import express from express

import checkid from ''


const rouer = express.Router()

app.post('/fetch-all-product', fetchAllproduct)

```


🧩`productController ` file

```js


export const createProduct = asyncHandler(

    async(req, res)=>{

      
      try{     
        
              const { name, price } = req.fields
        
        
              switch(true){
        
                case !name: 
                return res.json({ error : 'a name is required'}),
                break;
        
                case !price: 
                return res.json({ error : 'a price is required'}),
                break;
              }


              const addProduct = new Product({ ...req.fields})

              await addProduct.save()

              res.json(addProduct)


      }catch(err){

        res.status(400)
        throw new Error()
      }
    }
)



export const updateProduct = asyncHandler(

    async(req, res)=>{

      
      try{     

              const { id } = req.params
              const { name, price } = req.fields
        
        
              switch(true){
        
                case !name: 
                return res.json({ error : 'a name is required'}),
                break;
        
                case !price: 
                return res.json({ error : 'a price is required'}),
                break;
              }


              const updateProduct = await Product.findByIdAndUpdate({
                
                id,
                {...req.fields},
                { new : true}
                
                })

              await updateProduct.save()

              res.json(updateProduct)


      }catch(err){

        res.status(400)
        throw new Error()
      }
    }
)



export const deleteProduct = asyncHandler(

    async(req, res)=>{

      
      try{     

              const { id } = req.params
             
              const deleteProduct = await Product.findByIdAndDelete(id).select('name')

              res.json(`${deleteProduct} is deleted`)


      }catch(err){

        res.status(400)
        throw new Error()
      }
    }
)


export const fetchAllproduct = asyncHandler(

    async( req, res)=>{
      

      try{


        const keyword = req.query.keyword ? 
  
          name : {
  
            $regex : req.query.keyword,
            $option : "i"
          } :
          {}
        


        const count = await Product.countDocument({...keyword})
        const product = await Product.find({ ...keyword}).limit(6)


        res.json({

          page : 1,
          pages : Math.ceil(count/6),
          isMore : false
        })

      }catch(error){
        
        res.status(400)
         throw new Error()

      }

    }
);

export const getProducts = asyncHandler(

  async (req, res)=>{


    

    const products = await Product.find({}).populate({ path : 'category' select : 'name'}).limite(10).sort({ createAt : -1})

  }
)




```


🧩`apiProductSlice ` file

```jsx

import { PRODUCT_URL, UPLOAD } from ''
import { apiSlice } from ''


export const productApiSlice = apiSlice.injectEndpoints({



    endpoints : (builder)=>({


      fetchAllProducts : builder.query({


        query : ({ keyword})=>({

          url : `${PRODUCT_URL}/fetch-all-products`,
          req.query : keyword
        }), providesTags : ['USER']
      }),



       getProducts : builder.query({


        query : ()=>({

          url : `${PRODUCT_URL}/get-products`,
        }), invalidatesTags : ['USER']
      }),


       createProduct : builder.mutation({


        query : (data)=>({

          url : `${PRODUCT_URL}/create-products`,
          method : 'POST',
          body : data
        }), invalidatesTags : ['USER']
      }),


      getUpload : builder.mutatation({

          query : (data)=>({

          url : `${UPLOAD}/create-products`,
          method : 'POST',
          body : data
        })

      }),

      updateProduct : builder.mutation({


        query : (data, id)=({

          url : `${PRODUCT_URL}/update-product/${id}`,
          method : 'PUT',
          data : data
        }), invalidatesTags : ['PRODUCT']
      }),



      deleteProduct : builder.mutation({

         query : (data)=({

          url : `${PRODUCT_URL}/delete-product/${id}`,
          method : 'DELETE',
          
        })
      }),
      })


})

    })


const { 
  usefetchAllProductsQuery,
  useCreateProductsMutation,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  }

```


🧩`createProduct.jsx ` file

```js

import { useState} from ''
import {useGetProductQuery, useCreateProductsMutation, useUploadImageMutation} from ''
import { useCategoryQuery } from ''
import toast from ''


const productList = ()=>{


  const [ uploadImage, setUploadImage] = useState()
  const [ name, setName] = useState()
  const [ price, setPrice] = useState()
  const [ stock, setStock] = useState()


  const { data : products, isLoading, isError} = useGetProductQuery()

  const { data : category } = useCategoryQuery()

  const [ uploadImage ] = useUploadImageMutation()
  const [ createProduct] = useCreateProductsMutation()


  const addImage = async (e)=>{

      e.preventDefault()

      try{

        const imageForm = new FormData()

      // the 1st files selected by the user
        imageForm.append('image', e.target.files[0])

        const { data } = imageForm

        const res = await uploadImage(data)

        await uploadImage(data)

        if(res?.error){

          toast.sucess('image upload')

        }else{
             toast.sucess('image upload')
        
        }


      }catch(error){

        error.message
        toast.error
      }



  }

  const addProduct = async (e) =>{




    try{

      const productForm  = new FormData()

      productForm.append('name', name)
      productForm.append('price', price)
      productForm.append('getInStock', stock)

      const data = productForm(data)

      await createProduct(data)

        if(data){

          toast.sucess('image upload')

        }else{

          console.error
          toast.error('something wrong when try to upload')

        }


      }catch(error){

        error.message
        toast.error
      }

    }



  }

  



  return(


    
    <div>

  {products?.map ((products)=>(

    <div>
    <img  src={p.image}
    
    
    />

    <input
    onClick={addImage} 
    >

    </input>

    </div>



    <label htmlFor='Name'>

    </label>

    <input

    id='text'
    value={name}
    type='text'
    onChange={(e)=> setName(e.target.name)}
    
    >


  { categories?.map( (cat)=>(
    
    
    <select 
    key={cat._id}
    onChange={}
    >

    <option>
    {cat?.name}
    </option>


    </select>
  ))}


    </input>

    <button type='submit' onClick={addProduct}>

    </button>



  ))}


    </div>





  )
}
```


🧩`updateProduct.jsx ` file





```jsx

import { useState, useEffect } from ''
import {useNavigate, useParams} from ''
import {useGetProductQuery, useUpdateProductsMutation,useUploadImageMutation, useDeleteProductMutation } from ''
import { useCategoryQuery } from ''
import toast from ''



const UpdateProduct = () =>{


  const navigate = useNavigate()

  const params = useParams()

  const { data : product } = useGetProductQuery(params._id)

   const { data : categories } = useCategoryQuery()


   const [updateProduct] = useUpdateProductsMutation()
   const [deleteProduct] = useDeleteProductMutation()

  const [ name, setName ] = useState(product?.name || " ")
  const [ price, setPrice ] = useState(product?.price || " ")
  const [ image, setImage ] = useState(product?.image || " ")
  const [ category, setCategory ] = useState(categories?.name || " ")



  useEffect(()=>{

    setName(name)
    setPrice(price)
  }, [product])


const handleSubmit = async (e) =>{

  e.preventDefault()

  try{

    const udpateForm = new FormData()

    updateForm.append('name', name)


    const { data } = udpateForm

    const res = await updateProduct({ id : params._id, data})

    if(res?.error){

      console.error
      toast.error('something wrong')
      
    }else{

      toast.success(`${name} is updated`)
      navigate('/admin/all-product-list')

    }


  }catch(error){

     console.error
      toast.error('something wrong')
  }
}


const handleDelete = async ()=>{


  const window  = window.prompt('Do you want delete this product ?')

  if(!window) return;

  try{


    const {data} = await deleteProduct(id : params._id)
    toast.success()
    navigate()


  }catch(error){


  }



}




  return(




    <div>

    {imageUrl ? (

      <img src={image}  />
    )
      :
  (
      <input
      onChange={handleUpload}
      >


      </input>

    )
    
    }

    </div>

    <label htmtFor=''>
    Name
    </label>


    <input

    type='text'
    value={name}
    id='name'
    onChange={(e)=> setName(e.target.value)}
    
    >
    {name}
    </input>


    <input

    type='number'
    value={price}
    id='number'
    onChange={(e)=> setPrice(e.target.value)}
    
    >
    {name}
    </input>



      <select
      placeHolder='choose category'
      onChange={ (e)=> setCategory(e.target.value)}
      >
    {categories?.map((c)=>(

      <option key={categories._id}>
        {c.name}
      </option>
    )) }
    
      </select>


      <button onClick={handleSubmit}>

      Update Product

      </button>

       <button onClick={handleDelete}>

      Delete Product

      </button>
  



  )
}



```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `elementOfCode`

	- 


#### <font color="#b2a2c7">🧩-  in userRouter </font>

##### <font color="#a5a5a5">💻 - Code</font>

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `elementOfCode`

	- 


#### <font color="#b2a2c7">🧩 - in ProductUpdate </font>

##### <font color="#a5a5a5">💻 - Code</font>

```js

```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `elementOfCode`

	- 


- useState() condition 
- useEffect



## <font color="#492d050">Question about this topic</font>

### <font color="#c3d69b">Question 1</font>

Is there possible to hide the password in the payload of the browser ?

#### answer

type="password" only cosmetically hides the password. The input value is always accessible via JS (using it's .value property). So when someone opens DevTools, he or she will be able to get the password regardless.






# <font color="#00b0f0">1️⃣ -  Favorites</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

### <font color="#95b3d7">1 - Code before</font>

`Code Before & Task`

```jsx

```

### <font color="#4f81bd">1  - Solution ✅ </font>

#### <font color="#b2a2c7">🧩 - in redux/feature/FavoriteSlice </font>

##### <font color="#a5a5a5">💻 - Code</font>

```jsx

import { createSlice } from "@reduxjs/toolkit";


export const favoritesSlice = createSlice({


    name : 'favorites',

    initialState : [],

    reducers : {


        addFavorite : (state, action)=>{

            if (!state.some( (product) => product._id === action.payload._id)) {
                state.push(action.payload)
            }
        },

        removefavorite : (state, action )=>{

            return state.filter( (product) => product._id !== action.payload._id)
        },

        setfavorites : (state, action)=>{

            return action.payload
        }
    }
})

export const { addFavorite, removefavorite, setfavorites } = favoritesSlice.actions

export const selectfavorite = (state)=> state.favorites

export default favoritesSlice.reducer

```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `elementOfCode`

	- 
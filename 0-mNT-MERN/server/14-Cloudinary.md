# Learn Cloudinary


## SetUp

## Back-end

### 🧩`index.js & .env` file

- Step 1 : 
    - login in Cloudinary

- step 2 : npm i Cloudinary

- step 3
    - add the cloudinary name, api key and api secret in .env
- setp 4 : 
    - add cloudinary config in index/server.js


### 🧩`controller.js` file

- the ressult of cloudinary.uploader.upload return an object and he has one filed called secureUrl
- we have to put the req.body.img in a let variable because for now it was in a const destructuring and we cannot use yet

Resume :

- If you upload an image we are going to upload it to cloudinary by using this method seen and this method in the response return an object if it's succesful = secure_url field

❗️- But now there is an issue with this code
`scenario`
imagine I change image the first time it's good but if after I change again and again how cloudinary set the last new image ?

- Understand code 
    - Image the user have already a image or profil picture we need to destroy the old one and upload the new 

## Front-end

## 🧩`usePreviewImg` component




```js

import { useState, useEffect, useParams}
import { useCreateMutation } from ' '
import { useSelector, useDispatch} from ''


const User = ()=>{



    const userInfo = useSelector((state)=> state.auth.userInfo)

    const dispatch = useDispatch()


    const [ name, setName ] = useState("")
    const [ email, setEmail] = useState('')
    const [ password, setPassword ] = useState('')
    const [ verifPassword, setVerifPassword ] = useState("")



    const { id : userId } = useParams()

    
    const [ createUser, { isLoading, error }] = useCreateMutation()
    
    
    
    const handleForm =  async ()=>{
    


        if(password !== verifPassword){

            const res = toast.error('password incorrect')

            return res
        }
    
        try{


            const res = await createUser({ 
                id : userID,
                name : name,
                email : email,
                password : password

                }).unwrap()

            
            if(res?.error){

                toast.error( error.message)

            }else{


                toast.sucess("Gradualation")
                dispatch(auth({ ...res}))
                navigate("/home")
            }




        }catch(error){


            toast.error
        }
    
    
    
    }

    return(



        <>


        <form onSubmit={handleForm}>


        <label>
        Name
        <label/>
        <input

        type="text"
        id="text"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        
        >


        </>

        </form>


        </>
    )


}


```







Hey this is my component for create, update and delete the category why I can create and update but when I try to delete I have a error message and also the message the toast success of the update function display on the browser ?

my categoryList component

```jsx

import { useState, useEffect} from "react";
import { useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoryQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";


import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";



const CategoryList = ()=>{

    const { data: categories, refetch } = useGetAllCategoryQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    
    }
  };


  const handleUpdateCategory = async (e) => {
    e.preventDefault();


    try {
      const result = await updateCategory({
        id : selectedCategory._id,
        data : {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
        refetch()
      }
    } catch (error) {
      console.error(error);
      toast.error("updating category failed, try again.");
    }
  };

  const handleDeleteCategory = async () => {
    try {


      const result = await deleteCategory(selectedCategory._id).unwrap();

    
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(toast.error || "Deleting category failed, try again.");
    }
  };

    

    return(

        <div className="sm:flex-row mr-auto ml-auto  flex flex-col justify-center items-center ">

        <div className="sm: w-[65vw] p-3 flex flex-col justify-center items-center ">
          <div className="sm :h-12">Manage Categories</div>
          <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
          />
          <br />
          <hr />
  
          <div className="flex flex-wrap">
            {categories?.map((category) => (
              <div key={category._id}>
                <button
                  className="bg-white border border-red-500 text-red-500 py-2 px-4 rounded-lg m-3 hover:bg-red-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                  onClick={() => {
                    {
                      setModalVisible(true);
                      setSelectedCategory(category);
                      setUpdatingName(category.name);
                    }
                  }}
                >
                  {category.name}
                </button>
              </div>
            ))}
          </div>

          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
        </div>
      </div>
    )
       
       
    

    

}

export default CategoryList

```

my categoryForm component

```jsx

const CategoryForm = ({
    value,
    setValue,
    handleSubmit,
    buttonText = "Submit",
    handleDelete,
  }) => {
    return (
      <div className="p-3 flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="sm: flex flex-col justify-center items-center space-y-3">
          <input
            type="text"
            className="py-3 px-4 border rounded-lg w-full"
            placeholder="Write category name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
  
          <div className="flex justify-between">
            <button type="submit" className=" bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50">
              {buttonText}
            </button>
  
            {handleDelete && (
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 foucs:ring-red-500 focus:ring-opacity-50"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    );
  };
  
  export default CategoryForm;

```

my function for delete in the back-end

```js
export const deleteCategory =
asyncHandler(
    async(req, res)=>{


        try {

            const { id } = req.params

            const category = await Category.findById(id)

            await Category.deleteOne(id)
    
            res.status(200).json( `${category.name} is deleted`)
            
        } catch (error) {

            res.status(400)
            throw new Error("Category not found")
            
        }
    })
       

```


```ts


type Schema = {

    image : String,
    desc : String,
    date : number
}


const func = ( type : Schema) : any =>{

    return `the ${type.image} is very ${type.desc} at this date : ${type.date}`

}


func{
    image : "url",
    desc : "blablaba",
    date : 1990
}



```


```jsx



<Link to="/wishlist">

</Link>


```

// ----------- Hook provide by React -----------
import { useState, useEffect} from "react";


// --------------- Export function from apiCategorySlice  ---------------
import { useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoryQuery } from "../../redux/api/categoryApiSlice";

// --------------- Reusable Components  ---------------
import GoBackHome from '@/components/GoBackHome';
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";

// --------------- Style & Animation  ---------------

// -------- Toast
import { toast } from "react-toastify";





const CategoryList = ()=>{



  // We get all the categories and we use refetch for have the data up to date when i create, edit or delete
  // without use useEffect

  const { data: categories, refetch } = useGetAllCategoryQuery();


  const [name, setName] = useState("");

// wee create an state for selected  a specidic category 
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [updatingName, setUpdatingName] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  // We use the specific object mutation provide by redux toolkit query for
  // direcly trigger the api for create, update and delete

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();



 

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    try {

      // we use the trigger createCategory for trigger th the apiSliceCategory file
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch()
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    
    }
  };


  const handleUpdateCategory = async (e) => {
    e.preventDefault();


    try {


      // result we take an id and data which is specify in the apiSliceCategory file
      // in the id we use the selectedCategory because in the map selectedCategory is the specidic category
      // in the data we specify the name on the back-end and the updating name from the front-end 
      // After send the response we update the UI with update name empty, modal false and refetch the categories

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

      // here we set direcly the id is the trigger we not use this syntax { id : selectedCategory._id } because - DELETE requests typically don't have a body. The id is expected to be part of the URL, not the body. This is why passing an object doesn't work as expected. 
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
      toast.error("Category delection failed. Tray again.");
    }
  };

  useEffect(() => {
    if (!modalVisible) {
      setSelectedCategory(null);
      setUpdatingName("");
    }
  }, [modalVisible]);





    return(

      <>
          <GoBackHome/>
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

          {/* We create a modal here for update or delete the categories */}

          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>

          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleUpdate={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />

        </Modal>
        </div>
      </div>
      
      
      </>
    )
       
       
    

    

}

export default CategoryList
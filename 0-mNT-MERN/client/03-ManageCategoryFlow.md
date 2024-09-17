# <font color="#00b0f0">1️⃣ - Register</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

### <font color="#95b3d7">1 - Code before</font>

🧩 in categoryApiSlice

```js

```

### <font color="#95b3d7">1 - Task</font>

- a
- b
- c

### <font color="#4f81bd">1 - Solution ✅ </font>

#### <font color="#b2a2c7">🧩 in categoryApiSlice</font>

##### <font color="#a5a5a5">💻 - Code</font>

```js

```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `elementOfCode`

  -

🧩 in categoryApiSlice

```jsx
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "";
```

#### <font color="#b2a2c7">🧩 in categoryList.jsx</font>

##### <font color="#a5a5a5">💻 - Code</font>

```jsx

import { useState } from "react";
import { useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoryQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";


import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";



const CategoryList = ()=>{

    const { data: categories } = useGetAllCategoryQuery();
  const [name, setName] = useState("");
 1️⃣ const [selectedCategory, setSelectedCategory] = useState(null);
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
        toast.success(`${result.updatingName} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category delection failed. Tray again.");
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

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `const [selectCategory, setSelectCategory] = useState(null)`

  - 1.  state declaration :
        - The <span style="background:#b1ffff">selectedCategory</span> state in this component is used to keep track of which category the user has selected for editing or deleting. Let's look at how it's used
  - 2. Setting the selected category:

       - ```js
             onClick={() => {
             setModalVisible(true);
             setSelectedCategory(category);
             setUpdatingName(category.name);
             }}
         `
         This code is inside the button for each category. When a category is clicked, it:
         ```

       Opens the modal
       Sets the <span style="background:#b1ffff">selectedCategory</span> to the clicked category
       Sets the <span style="background:#b1ffff">updatingName</span> to the current name of the selected category

  - 3.  Using the selected category:

    - ```js
         const result = await updateCategory({
          id: selectedCategory._id,
          data: {
              name: updatingName,
          },
          }).unwrap();
      `
      ```

    selected category is use to specify which category is update and this is the same use for delete

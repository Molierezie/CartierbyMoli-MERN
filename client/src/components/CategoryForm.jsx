import React from 'react'
// here we use a component outside the page category for more readable code

// we use the form for handle at the same time creation , update and delete
const CategoryForm = ({
  
    // If I click on the button for create value is the value name, if I click for the button for update value is editinhName
    value,
    setValue,
    handleSubmit,
    handleUpdate,
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
            <button onClick={handleUpdate} className=" bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50">
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
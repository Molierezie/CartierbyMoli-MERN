import React from 'react'
// ----------- Hook provide by React -----------
import { useState } from "react"

// --------------- Export function from apiUserSlice  ---------------
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from "../../redux/api/userApiSlice"

// --------------- Reusable Components  ---------------
import Message from "../../components/Message"

// --------------- Style & Animation  ---------------

// -------- react icons
import { FaCheckToSlot } from "react-icons/fa6";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";

// -------- react Toast
import { toast } from 'react-toastify'






const UserList = () => {

  // const { userInfo } = useSelector( (state)=> state.auth)

  const { data : users, isLoading, error} = useGetUsersQuery()
  const [ deleteUser ] = useDeleteUserMutation()
  const [ updateUser ] = useUpdateUserMutation()


  // We creata a specific state for the editId set to null and later take the specific ID

  const [ editUserId, setEditUserId] = useState(null)
  const [ editUserName, setEditUserName] = useState("")
  const [ editUserEmail, setEditUserEmail] = useState("")



const deleteHandler = async (id) => {
  if (window.confirm("Are you sure")) {
    try {
      await deleteUser(id);
      
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
};


// we create a function for edit
const toggleEdit = (id, username, email) => {
  setEditUserId(id);
  setEditUserName(username);
  setEditUserEmail(email);
};

const updateHandler = async(id)=>{

  try {

    await updateUser({id : id, username : editUserName, email : editUserEmail})
    setEditUserId(null)
    
    toast.success('User Updated successfully')
  } catch (error) {
    toast.error(error.data?.message || error.message)
    
  }


}


  return (
    
    <div className="p-4">

      <h1 className="text-2xl font-semibold mb-4">Users List</h1>

      { isLoading ? 

      (<p>is Loading</p>) 

      : error ? 
      (
        <Message variant="danger">
          {error.data?.message || error.message }
        </Message>
      )
      :
      (
        <div className="bg-green-200 flex flex-col md:flex-row">

          <table className=" w-full md:w-4/5 mx-auto">

          <thead className="bg-blue-400">
            <tr className="bg-orange-400">
              <th className="px-4 py-2 text-left text-red-500">Id</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u)=>(
              

              <tr key={u._id} className="">
                <td className="px-4 py-2 bg-orange-700">{u._id}</td>


                {/* Now we we click in the toggle the state editUserID will have a specific ID
                 If the ID match to the id in the map when we edit or delete we track the ID */}

                <td className="px-4 py-2 bg-yellow-300">
                  {editUserId === u._id ?

                  (

                <div className="flex items-center">
                  
                      <input
            
                      type ='text'
                      value={editUserName}
                      onChange={e => setEditUserName(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      />

                      <button onClick={()=> updateHandler(u._id)}
                      className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">

                      <FaCheckToSlot />
              
                      </button>
                    
                    </div>
                  ):
                  (
                    <div className="flex items-center justify-around">

                        {u.username} { '' }
                        <button onClick={()=> toggleEdit(u._id, u.username, u.email)}>

                          <FaEdit />

                        </button>

                    </div>
                  )}

                </td>
                <td className="px-4 py-2">
                    {editUserId === u._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editUserEmail}
                          onChange={(e) => setEditUserEmail(e.target.value)}
                          className="w-full p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(u._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheckToSlot />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <a href={`mailto:${u.email}`}>{u.email}</a>{" "}
                        <button
                          onClick={() =>
                            toggleEdit(u._id, u.name, u.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {u.isAdmin ? (
                      <FaCheckToSlot style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {!u.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => deleteHandler(u._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash size={10} />
                        </button>
                      </div>
                    )}
                  </td>

                
              </tr>

          
            

              ))}
          </tbody>


          </table>

        </div>
      )
    
    }

      
    </div>
  )
}

export default UserList

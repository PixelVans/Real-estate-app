import React from 'react'
import {
  updateUserStart, updateUserFailure, updateUserSuccess,
  deleteUserFailure,deleteUserStart,deleteUserSuccess
 } from '../../redux/user/userSlice'
import { useState, useRef,useEffect} from 'react'
import {getStorage, ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import { useSelector } from 'react-redux'
import { app } from '../../firebase'
import { useDispatch } from 'react-redux'


export default function Profile() {

  const fileRef = useRef(null)

  const { currentUser,loading,error } = useSelector(state => state.user)
  const [file, setFile] = useState(undefined)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [filePercentage, setfilePercentage] = useState(0)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const dispatch = useDispatch(); // Move this inside the component
 


  
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file])


  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `uploads/${currentUser._id}/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // Progress function
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfilePercentage(Math.round(progress));
      }, 
      (error) => {
        // Error function
        
        setFileUploadError(true)
      }, 
      () => {
        // Complete function
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          
          // Optionally, you can update the user's profile with the new avatar URL
        });
      }
    );
  };



  const handlechange =  (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }



  //HANDLESUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return;
      }

      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
}




  
  //HandleDelete User
  const handleDeleteUser = async () => {
    try { 
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        
      });
      const data = await res.json();
      if (data.success === false) {
          dispatch(deleteUserFailure(data.message))
          return;
        }
        dispatch(deleteUserSuccess(data))

    } catch (error) {
    dispatch(deleteUserFailure(error.message))
  }
}
















  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
       Profile
      </h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input onChange={(e) => setFile(e.target.files[0])}
          type="file" ref={fileRef} hidden accept='image/*' />

        <img onClick={()=>fileRef.current.click()}
          src={formData.avatar || currentUser.avatar} alt="profile"
          className='rounded-full h-24 w-24 object-cover cursor-pointer 
          self-center mt-2'/>
        

             <p className='text-sm self-center'>
                {fileUploadError ? (
            <span className='text-red-700'>Error Image Upload
              (image must be less than 2 mb)</span>
            ) : filePercentage > 0 && filePercentage < 100 ? (
              <span className='text-slate-700'>{`Uploading ${filePercentage}%`}</span>
            ) : filePercentage === 100 ? (
              <span className='text-green-700'>Successfully Uploaded</span>
            ) : (
              ''
            )}
          </p> 

        

        <input
          type="text"
          placeholder='username'
          id='username'
           onChange={handlechange}
          defaultValue={currentUser.username}
          className='border p-3 rounded-lg' />
        
        <input
          type="text"
          defaultValue={currentUser.email}
          placeholder='email'
          onChange={handlechange}
          id='email'
          className='border p-3 rounded-lg' />
        

        <input
          type="text"
          placeholder='password'
          onChange={handlechange}
          id='password'
          className='border p-3 rounded-lg' />
        

        <button disabled={loading} className='bg-slate-700 text-white rounded-lg 
        p-3 uppercase hover:opacity-85'>{ loading? 'Loading...' : 'Update'}</button>

         
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span  className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>

       <div className='mx-auto text-center'>
      <p className='text-red-700 mt-5 '>{ error  ? error: ''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? 'User Updated Successfully' : ''}
        
        </p>
      </div>
    </div>
  )
}
  
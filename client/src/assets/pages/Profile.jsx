import React from 'react'
import {
  updateUserStart, updateUserFailure, updateUserSuccess,
  deleteUserFailure,deleteUserStart,deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess
 } from '../../redux/user/userSlice'
import { useState, useRef,useEffect} from 'react'
import {getStorage, ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import { useSelector } from 'react-redux'
import { app } from '../../firebase'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'


export default function Profile() {

  const fileRef = useRef(null)

  const { currentUser,loading,error } = useSelector(state => state.user)
  const [file, setFile] = useState(undefined)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [filePercentage, setfilePercentage] = useState(0)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [showListingsError,setShowListingsError] = useState(false)
  const [userListings,setUserListings] = useState([])

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





  //Handle sign out user
  
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch(`/api/auth/signout/`)
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message))
        return;
      }
      dispatch(signOutUserSuccess(data))

    } catch (error) {
      dispatch(signOutUserFailure(data.message))
    }
  }


  //HANDLE SHOW LISTINGS
  
  const handleShowListings = async () => {
    try {
      setShowListingsError(false)
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      
      if (data.success === false) {
        setShowListingsError(true)
    
        return
       
      }  setUserListings(data)
    } catch (error) {
      setShowListingsError(true)
    }
  }


  //HANDLE DELETE USER LISTING
  const handleDeletelisting = async (listingId) => {
    try {
    
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      
      if (data.success === false) {
        
    return
        }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId))
       
    } catch (error) {
      console.log(error)
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

        <Link className='bg-green-700 text-white
        p-3 rounded-lg uppercase text-center hover:opacity-85' to={'/create-listing'}>
          Ceate Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span   onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>

       <div className='mx-auto text-center'>
      <p className='text-red-700 mt-5 '>{ error  ? error: ''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? 'User Updated Successfully' : ''}
        
        </p>
      </div>
      <button onClick={handleShowListings}
        className='text-green-700 w-full'>Show Listings</button>
      <p className='text-red-700'>{ showListingsError ? 'Error showing Listings' : ''}</p>
    
      {userListings && 
        userListings.length > 0 && 
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
               { userListings.map((listing) =>
          <div key={listing._id} className=' border rounded-lg p-3 
          flex justify-between items-center gap-4'>
            <Link to={`listings/${listing._id}`}>
              <img
                className='h-16 w-16 object-contain'
                src={listing.imageUrls[0]}
                alt="Listing image" />
            </Link >
            <Link className='flex-1' to={`listings/${listing._id}`}>
              <p className='text-slate-700 font-semibold 
            flex-1 hover:underline truncate'>{listing.name}</p>
            </Link>
            <div className='flex flex-col'>
              <button onClick={()=>handleDeletelisting(listing._id)} className='text-red-700 uppercase'>Delete</button>
              <Link to={`/update-listing/${listing._id}`}>
                    
                     <button className='text-green-700 uppercase'>Edit</button>
        </Link>
                   
                   </div>

</div>)}
        </div>
  }


    </div>
  )
}
  
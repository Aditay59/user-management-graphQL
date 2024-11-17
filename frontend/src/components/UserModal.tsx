import React, { ChangeEvent, FormEvent, useState } from 'react';
import { updateType, userType } from '../../interfaces/userType';
import { FaXmark } from 'react-icons/fa6';
import { useMutation } from '@apollo/client';
import { GET_USERS, UPDATE_USER } from '../../graphql/query/gqlQueries';
import { toast } from 'react-toastify';

export interface modalProps {
    updateUser: userType,
    handleCloseModal: React.Dispatch<React.SetStateAction<boolean>>
}

const UserModal:React.FC<modalProps> = ({updateUser, handleCloseModal}) => {

    const [updateData, setUpdateData] = useState<updateType>(updateUser);

    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target as HTMLInputElement;
        setUpdateData((prev) => ({...prev, [name]: value }));
    };

    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const [updateUserDetails] = useMutation(UPDATE_USER,{
        refetchQueries: [{query: GET_USERS}],
        awaitRefetchQueries: true
    });

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);
        const {__typename, ...filteredUpdateData} = updateData as updateType & {__typename?: string};
        try {
            await updateUserDetails({
                variables: {
                    uid: updateData.id,
                    userUpdate: filteredUpdateData
                }
            }).then(() => {
                toast.success(`User details updated successfully`);
                handleCloseModal(false);
            })
        } catch(err) {
            console.log(`Error you got is: ${err}`);
            
            toast.error(`Error: can't update user details`);
        } finally{
            setIsUpdating(false);
        };
    };
  
    return (
    <div className='custom-modal'>
        <div className="row">
            <div className="">
                <form onSubmit={handleSubmit} className='border p-4 border rounded-4 bg-white'>
                <div onClick={()=>handleCloseModal(false)} style={{cursor: "pointer"}} className='d-flex justify-content-end'><FaXmark size={20} /></div>
                    {/* first name field */}
                    <div className="form-group">
                        <label className='form-label' htmlFor="fname">FirstName: </label>
                        <input onChange={handleChange} value={updateData.firstName} className='form-control' type="text" name="firstName" id="fname" />
                    </div>

                    {/* last name field */}
                    <div className="form-group">
                        <label className='form-label' htmlFor="lname">LastName:</label>
                        <input onChange={handleChange} value={updateData.lastName} className='form-control' type="text" name="lastName" id="lnane" />
                    </div>

                    {/* email field */}
                    <div className="form-group">
                        <label className='form-label' htmlFor="mail">Email: </label>
                        <input onChange={handleChange} value={updateData.email} className='form-control' type="text" name="email" id="mail" />
                    </div>

                    {/* phone number field */}
                    <div className="form-group">
                        <label className='form-label' htmlFor="phn">Phone: </label>
                        <input onChange={handleChange} value={updateData.phone} className='form-control' type="text" name="phone" id="phn" />
                    </div>

                    {/* update button */}
                    <div className='d-flex justify-content-center mt-2'>
                        <button disabled={isUpdating} className='btn btn-warning text-white' type="submit">{isUpdating?"Loading...":"Update"}</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
  )
}

export default UserModal;
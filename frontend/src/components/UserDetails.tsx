import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import {DELETE_USER, GET_USERS} from '../../graphql/query/gqlQueries';
import { userType } from '../../interfaces/userType'
import { toast } from 'react-toastify';
import UserModal from './UserModal';

const UserDetails:React.FC = () => {

    const {loading, error, data} = useQuery(GET_USERS);
    const [isModalEnable, setIsModalEnable] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    

    const [currUpdateUser, setCurrentUpdateUser] = useState<userType>({
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: ''
    })

    const [deleteUseById] = useMutation(DELETE_USER,{
        refetchQueries: [{query: GET_USERS}],
        awaitRefetchQueries: true
    });

    const handleDelete = async (id: number) => {
        setIsDeleting(true);
        try {
            await deleteUseById({
                variables: {
                    uid: id
                }
            }).then(() => {
                toast.success(`User with id ${id} is deleted successfully`);
            });
        } catch(err) {
            toast.error(`Error in deleting the user`);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleModal = (user:userType) => {
        setIsModalEnable(true);
        setCurrentUpdateUser(user);
    };

    if(loading) return <div className='text-center text-warning'>Still Loading the data...</div>
    if(error) return <div className='text-center text-danger'>Error:Fetching the data from graphQl NodeJs Server</div>

  return (
    <div className='container-fluid p-4'>
        {
            isModalEnable&&
            <UserModal updateUser={currUpdateUser} handleCloseModal={setIsModalEnable} />
        }
        <h3 className='text-center display-4 fw-lighter'>User Available</h3>
        <div className="row">
            {
                data&&
                data.getAllUsers&&
                data.getAllUsers.map((user:userType, index:number)=> (
                    <div className='col-lg-4 gy-2' key={index+user.id}>
                        <div className="card custom-hover">
                            <div className="card-body">
                                <h5 className='card-title'>FirstName: {user.firstName}</h5>
                                <p className='card-subtitle'>LastName: {user.lastName}</p>
                                <p className='card-text'>Email: {user.email}</p>
                                <p className='card-text'>Role: {user.role}</p>
                                <div className='d-flex gap-2'>
                                    <button disabled={isDeleting} className='btn btn-sm btn-danger' onClick={()=>handleDelete(user.id)} type="button">{isDeleting? "Loading": "Delete"}</button>
                                    <button onClick={()=>handleModal(user)} className='btn btn-sm btn-outline-warning ' type="button">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default UserDetails;
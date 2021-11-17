import React, {useEffect, useState} from "react";
import {axiosJWT} from "../utils/axios/axios";
import {URL} from "../constants/url";
import theme from "../store/theme";
type UsersResponse = {id: number, email: string, role: string}[];
export const AdminPanel: React.FC = () => {
    const [users, setUsers] = useState<UsersResponse>();
    const fetchUsers = async () => {
        const {data} = await axiosJWT.get<UsersResponse>(`${URL}/auth/admin/get-users`, {withCredentials: true});
        setUsers(data);
    }

    const issueAdminRoleToUser = (userId: number) => {
        axiosJWT.post(`${URL}/auth/admin/issue-admin-role`, {userId}, {withCredentials: true}).then(() => {
            fetchUsers();
        })
    }
    return (
        <div className='container'>
            <h1>Admin Panel</h1>
            <button className={`btn ${theme.theme}`} onClick={() => fetchUsers()}>Get users</button>
            {
                users &&
                <>
                    <h2>{users.length} users</h2>
                    <ul>
                        {
                            users.map(({id, email, role}) => {
                                return (
                                    <>
                                        <li key={email + role + id} className='admin-users'><span>user id: {id}</span> {email} <span>user role: {role}</span> {role !== "admin" && <button className={`btn-small ${theme.theme}`} onClick={() => issueAdminRoleToUser(id)}>Выдать роль админа</button>}</li>
                                    </>
                                )
                            })
                        }
                    </ul>
                </>
            }
        </div>
    )
}
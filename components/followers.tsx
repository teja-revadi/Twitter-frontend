import React, { useState, useEffect } from 'react';
import { fetchUsers } from "./fetchusers";
import { fetchMyfollowers } from "./fetchmyfollowers";
import { fetchMyfollowing } from "./fetchmyfollowing";
import { follow } from './followbutton';
import { Data } from './datainterface';

// fetching users based on selected option
const Followers: React.FC<any> = (props) => {
    const [selectedValue, setSelectedValue] = useState("accounts-to-follow");
    const [datas, setData] = useState<Data[]>([]);
  
    useEffect(() => {
        console.log("use", selectedValue, datas)
        fetchUsers(setData);
    }, []);

    const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedValue(value);
        try {
            console.log(value, datas)
            if (value === "accounts-to-follow") {
                await fetchUsers(setData);
            } else if (value === "my-following") {

                await fetchMyfollowing(setData);
            } else if (value === "my-followers") {

                await fetchMyfollowers(setData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    

    return (
        <div className="leftcolumn w-1/5 flex flex-col items-center">
            <select id="listSelector" value={selectedValue} className="w-4/5 mb-4 p-2 border border-gray-300 rounded" onChange={handleChange}>
                <option value="accounts-to-follow">Suggestions</option>
                <option value="my-following">Following</option>
                <option value="my-followers">Followers</option>
            </select>

            <div>
                <ul>
                    {datas.map((user) => (
                        <li key={user.id}>
                            {selectedValue === "accounts-to-follow" ?(
                            <p>{user.username}<button id="follow-button-${user.id}" className="follow-button" style={{
            marginLeft: '10px',
            marginBottom: '15px',
            backgroundColor: '#1DA1F2',
            color: '#ffffff',
            borderRadius: '5px',
            border: 'none',
            paddingInline: '5px'
        }} onClick={() => follow(user.id,props.tweets,props.setTweets,props.showMyTweets,setData)}
        > Follow
      </button></p>):(
                           <p>{user.username}</p>
                            
                        )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Followers;

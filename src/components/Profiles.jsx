import { useState, useEffect } from "react";

function Profiles({userId}){
    const [profiles, setProfiles] =useState([]);
    const [showProfileForm, setShowProfileForm] = useState(false);
    const [newProfileName,setNewProfileName]= useState('');

    useEffect(() => {
        if(userId){
            fetchProfiles();
        }
    },[userId]);

    const fetchProfiles =async () => {
        const res = await window.electronAPI.getProfiles(userId);
        setProfiles(res);
    }

    const handleAddProfile = async () => {
        if(!newProfileName) return;
        await window.electronAPI.addProfile(userId, newProfileName);
        setNewProfileName('');
        setShowProfileForm(false);
        fetchProfiles();
    };

    return (
        <div className="mt-4">
            <h3 className="font-semibold">Profiles:</h3>
            {profiles.length === 0?  (
                <p className="text-gray-500">No profiles added.</p>
            ):(
            <ul className="list-disc list-inside">
                {profiles.map(profile =>(
                    <li key={profile.profile_id} >
                        {
                            profile.profile_name
                        }
                    </li>
                ))}
            </ul>
            )}
            {showProfileForm ? (
                <div className="mt-2 space-y-2">
                    <input 
                        type="text"
                        placeholder="New Profile Name"
                        className="border p-1 w-full"
                        value={newProfileName}
                        onChange={(e) => setNewProfileName(e.target.value)}
                    />
                    <button onClick= {handleAddProfile} className="bg-green-500 text-white px-2 py-1 rounded">Add Profile</button>
                    <button onClick={() =>setShowProfileForm(false)} className="text-gray-500 ml-2">Cancel</button>
                </div>
            ) : (<button onClick={() => setShowProfileForm(true)} className="bg-blue-500 text-white px-2 py-1 rounded mt-2">Add New Profile</button>
            )}
        </div>
    );
}

export default Profiles;
import { useEffect, useState } from "react";

function Account(){

    const [user ,setUser] = useState(null);
    const [mode, setMode] = useState('login');
    const[email,setEmail]= useState('');
    const [password, setPassword] =useState('');

    useEffect(() => {
        window.electronAPI.getCurrentUser().then ((loggedUser) => {
            if(loggedUser){
                setUser(loggedUser);
            }
        });
    }, []);

    const handleLogin = async() =>{
        const res=await window.electronAPI.login(email,password);
        if(res.success){
            setUser(res.user);
        }
        else{
            alert('Login failed');
        }
    }

    const handleSignUp = async() =>{
        const res =await window.electronAPI.signup(email,password);
        if(res.success){
            setUser(res.user);
        }
        else{
            alert('Signup failed');
        }
    };

    const handleLogout =async () => {
        await window.electronAPI.logout();
        setUser(null);
        setEmail('');
        setPassword('');
        setMode('login');
    };

    const handleClose= () =>{
        window.close();
    }

    if(user){
        return (
            <div className="p-4 space-y-4">
                <h2> Hello, {user.email}</h2>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded"> Logout </button>
                <button onClick={handleClose} className="text-gray-500 mt-4"> close</button>
            </div>
        )
    }

    return(
        <div style={{ padding: 20, textAlign: 'center'}}>
            <h2>
                { mode=== 'Login' ? 'Login' : 'Sign Up'}
            </h2>

            <input type="email" placeholder="Email" className="border p-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)}/>
                
            <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            
            {mode=== 'Login'? (
                <>
                    <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">Login </button>
                    <p>
                        Don't have an account?{' '}
                        <button onClick={() =>setMode('signup')} className="text-blue-500 underline"> Sign Up Here</button>
                    </p>
                </>
            ) : (
                <>
                    <button onClick={handleSignUp} className="bg-green-500 text-white px-4 py-2 rounded"> Sign up </button>
                    
                    <p> Already have an account? {' '}
                        <button onClick={() => setMode('login')} className="text-blue-500 underline"> Login </button>
                    </p>
                </>
            )}

            <button onClick={handleClose} className="text-gray-500 mt-4">Close</button>
        </div>
    )
}


export default Account;
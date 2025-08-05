'use client'
import { FormEvent, useState } from "react"
import { auth } from "@/lib/firebase"
import { sendPasswordResetEmail} from "firebase/auth";
export const ForgotPassword=()=>{
    const [ email,setEmail] = useState('');
    const [message,setMessage] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);

    const handleSubmit =async (e:FormEvent)=>{
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');
        try {
            await sendPasswordResetEmail(auth,email);
            setMessage('password reset link sent please check your email')
        } catch (err) { 
    if (err && typeof err === 'object' && 'code' in err) {
        const errorCode = (err as { code: string }).code;
        switch (errorCode) {
            case 'auth/user-not-found':
                setError('No user found with this email address.');
                break;
            case 'auth/invalid-email':
                setError('Please enter a valid email address.');
                break;
            default:
                setError('An unexpected error occurred. Please try again.');
                break;
        }
    } else {
        setError('An unexpected error occurred. Please try again.');
    }
    console.error(err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="max-w-md mt-50 mx-auto p-8 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
            <p className="mb-4 text-gray-600">Enter your email Address and we will send you link to reset your password</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="You@example.com"
                />
                </div>

                {message && <p className="text-green-500 mb-4">{message}</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                    {loading?"sending ....":"Send Reset the link"}
                </button>

            </form>

        </div>
    )
}
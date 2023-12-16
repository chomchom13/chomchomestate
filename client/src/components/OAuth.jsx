import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
    const dispatch = useDispatch(); // useDispatch is a react hook and it is always at the top of a function call, if you try to insert it somewhere in the middle of the function , it will throw error
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider); 
            
            const res = await fetch('server/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }), //name: result.user.displayName, email: result.user.email,  photo: result.user.photoURL
            })

            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');

        } catch (error) {
            console.log("Could not sign in with Google", error);
        }
    }
  return ( 
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'> {/* if we click this OAuth button it will submit the form as well as it is inside the form tag ( button by default type is submit ), so change the type of this OAuth to 'button' */}
      Continue with Google
    </button>
  )
}

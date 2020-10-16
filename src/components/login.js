import { Button } from '@material-ui/core'
import React from 'react'
import './login.css'
// import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase'
import { actionTypes } from './reducer'
import  {useStatevalue} from './stateprovider'

const Login = () => {
    const [{}, dispatch] = useStatevalue()
    const signIn = () => {
        auth.signInWithPopup(provider).then( result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        }).catch( error => {
            alert(error.message)
        })
    }
    
    return (
        <div className = 'login__Container'>
        <div className = 'login__Text'>
            <h2>Sign-in to Chat</h2>
        </div>

    <Button type = 'submit' onClick = {signIn}>
        Sign-in With Google
    </Button>
        </div>
    )
}

export default Login
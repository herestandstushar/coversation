import React, {useState, useEffect} from 'react'
import './sidebarchat.css'
import {Avatar} from '@material-ui/core'
import db from '../firebase'
import {Link} from 'react-router-dom'


const SidebarChat = ({addNewchat ,id, name})  => {
    const [seeds,setSeeds] =useState('')
    const [messages, setMessage] = useState('')
    useEffect(()=>{
        setSeeds(Math.floor(Math.random()*5000))
    }, [])
    
useEffect(() => {
    if(id){
        db.collection("rooms").doc(id).collection('messages').orderBy('timestmap', 'desc')
        .onSnapshot(snapshot => 
            setMessage(snapshot.docs.map(doc => doc.data()))
        )
    }
}, [id])

    const createChat = () => {
        const roomName = prompt("Please Enter Name for chat")
        if(roomName){
            db.collection("rooms").add({
                name: roomName
            })
        }
    }

    return !addNewchat ? (
        <Link to ={`/rooms/${id}`}>
        <div className = 'sidebarchat'>
           < Avatar src ={`https://avatars.dicebear.com/api/human/${seeds}.svg`} /> 
           <div className ='sidebarchat__info'>
           <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
            </div>
        </div>
       </Link>
    ):(
        <div className ='sidebarchat' onClick ={createChat}>
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
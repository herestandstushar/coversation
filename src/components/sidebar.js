import React, {useState, useEffect} from 'react'
import './sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {Avatar, IconButton} from '@material-ui/core'
import { SearchOutlined }  from '@material-ui/icons'
import SidebarChat from './sidebarchat'
import db from '../firebase'
import { useStatevalue } from './stateprovider'


const SideBar = () =>{
const [rooms,setRoom] = useState([])
const [{ user }, dispatch] = useStatevalue()
useEffect(()=>{
    const unsubscribe = db.collection("rooms").onSnapshot(snapshot => 
       setRoom(snapshot.docs.map( doc =>({
           id: doc.id,
           data:doc.data()
       }))) 
    )
    return () =>{
        unsubscribe()
    }
},[])

return(
    <div className ='sidebar'>
      <div className = 'sidebar__header'>
      <Avatar src = {user?.photoURL} />
      <div className = 'sidebar__headerRight'>
      <IconButton>
      <DonutLargeIcon />
      </IconButton>
      <IconButton>
          <ChatIcon />
      </IconButton>
      <IconButton>
          <MoreVertIcon />
      </IconButton>
       </div>
    </div>
    <div className = 'sidebar__search'>
        <div className = 'sidebar__searchContainer'>
            <SearchOutlined />
            <input type = 'text' placeholder = 'search or start a new chat'></input>
        </div>
    </div>
    <div className ='sidebar__chat'>
        <SidebarChat addNewchat />
        {
            rooms.map(room => (
                <SidebarChat key ={room.id} id ={room.id}
                name ={room.data.name} />
             
            ))
            
        }
    </div>
    </div>
)
}
export default SideBar
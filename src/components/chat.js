import React , {useState ,useEffect} from 'react'
import {Avatar ,IconButton} from '@material-ui/core'
import { SearchOutlined, MoreVert, AttachFile }  from '@material-ui/icons'
import './chat.css'
import InsertmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import { useParams } from 'react-router-dom'
import db from '../firebase'
import firebase from 'firebase'
import { useStatevalue } from './stateprovider'

const Chat = () => {
    const [input,setInput] = useState('')
    const { roomId } = useParams()
    const [roomnName, setRoomname] = useState('')
    const [seeds,setSeeds] =useState('')
    const [messages, setMessages] = useState([])
    const [{user}, dispatch] = useStatevalue()


    useEffect(() => {
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot(snapshot => {
                 setRoomname(snapshot.data().name)   
            })
            db.collection("rooms").doc(roomId).collection("messages")
            .orderBy('timestamp', 'asc').onSnapshot(snapshot =>(
                setMessages(snapshot.docs.map(doc => 
                    doc.data()))
            ))
        }

       
    }, [roomId] )


    const sendMsg = (e)=>{
        e.preventDefault()
        console.log(`you typed ${input}`)
         
        db.collection("rooms").doc(roomId).collection("messages")
        .add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })


        setInput('')
    }
    useEffect(()=>{
        setSeeds(Math.floor(Math.random()*5000))
    }, [roomId])
    


    return(
    <div className ='chat'>
    <div className ='chat__header'>
    < Avatar src ={`https://avatars.dicebear.com/api/human/${seeds}.svg`} /> 
       <div className ='chat__headerInfo'>
           <h3>{roomnName}</h3>
           <p>
               last seen{" "}
               {
                   new Date(
                       messages[messages.length-1]?.
                       timestamp?.toDate())
                       .toUTCString()
                   
               }
           </p>
       </div>
       <div className = 'chat__headerRight'>
        <IconButton>
            <SearchOutlined />
        </IconButton>
        <IconButton>
            <MoreVert />
        </IconButton>
        <IconButton>
            <AttachFile />
        </IconButton>
       </div>
       </div>
       <div className ='chat__body'>
            {messages.map(message => (
                <p className ={`chat__message ${true && "chat_reciever"}`}>
               <span className ='chat__name'>
                   {message.name} </span>
                  {message.message}
                   <span className ='chat__timestamp'>
                      {new Date(message.timestamp?.toDate()).toUTCString()}
                   </span>
              
           </p>
            ))}
           </div>
           <div className = 'chat__footer'>
               <InsertmoticonIcon />
               <form>
                   <input type ='text'
                   placeholder ='write a message'
                   value= {input}
                   onChange ={e => setInput(e.target.value)}
                   />
                   <button onClick={sendMsg} type ='submit'>Send a message</button>
                   <MicIcon />
               </form>

           </div>
       </div>
   
)
    }

export default Chat
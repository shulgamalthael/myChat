import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { defaultAvatar_url } from '../App.jsx';
import { getUserConversation, postUserConvarsation, updateUserConvarsation } from '../../utils/ws.js';
import Chat from './Chat/Chat.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { set_current_user } from '../../redux-store/actions/client.actions.js';
import { set_message } from '../../redux-store/actions/message.actions.js';
import { messageSelector } from '../../redux-store/selectors/message.selectors.js';
import { currentUserSelector, logginedUserSelector } from '../../redux-store/selectors/client.selectors.js';
import { connect } from 'react-redux';

const Messanger = ({ CompanionData, clientData, currentCompId, ws, loginnedUser, currentUser, setCurrentUser, message, setMessage }) => {
    ws.onmessage = e => setClientMessages(prev => [...prev, JSON.parse(e.data)]);

    console.log(message)

    const [ currentClientData, setCurrentClientData ] = useState({});
    const [ clientMessages, setClientMessages ] = useState([]);
    const [ conversationsList, setConversationsList ] = useState([]);
    const [ companionName, setCompanionName ] = useState('');
    const [ currentCompanion, setCurrentCompanion ] = useState(null);
    const [ avatarUrl, setAvatarUrl ] = useState('');

    useEffect(() => {
        if ( clientData.length > 0 ) {
            const data = clientData.find(el => el[`${loginnedUser}`]);
            setCurrentClientData(data);
            setConversationsList(Object.keys(data[`${loginnedUser}`].companions));
            setAvatarUrl(data[`${loginnedUser}`].companions[`${currentCompId}`].avatar_url);
            setClientMessages(data[`${loginnedUser}`].companions[`${currentCompId}`].messages);
        }
    }, [clientData, currentCompId])

    const handleChange = e => {
        setMessage(e.target.value);
    }

    const onEnterPress = e => {
        if ( e.keyCode === 13 ) {
            sender();
        }
    }

    const sender = () => {
        // if (ws.readyState !== 1) {
        //     setTimeout(() => {
        //         sender();
        //     }, 0.001)
        // } else {
        //     const newMessage = {
        //             ID: Math.random() * 10,
        //             message: message,
        //             date: moment(),
        //             sender: currentUser,
        //         }
        //     ws.send(JSON.stringify(newMessage));
        // }
        if (message.split('').length > 0) {

            const newMessage = {
                ID: Math.random() * 10,
                message: message,
                date: moment(),
                sender: currentUser,
            }

            const newData = { 
                [`${loginnedUser}`]: {
                    ...currentClientData[`${loginnedUser}`],
                    companions: {
                        ...currentClientData[`${loginnedUser}`].companions,
                        [`${currentCompId}`]: {
                            ...currentClientData[`${loginnedUser}`].companions[`${currentCompId}`],
                            messages: [...clientMessages, newMessage],
                        }
                    }
                }
            }

            updateUserConvarsation( currentClientData.id, newData );
            setMessage('');
        }
        // setMessage('');
    }

    const createConversation = () => {
        if ( companionName.length > 0 ) {

            const newData = { 
                [`${loginnedUser}`]: {
                    ...currentClientData[`${loginnedUser}`],
                    companions: {
                        ...currentClientData[`${loginnedUser}`].companions,
                        [`${companionName}`]: {
                            id: currentCompId,
                            avatar_url: defaultAvatar_url,
                            messages: [],
                        }
                    }
                }
            }

            console.log(companionName)

            // const newData = { 
            //     [`${loginnedUser}`]: { 
            //         id: loginnedUser, 
            //         isLogin: true,
            //         companions: {
            //             ...userData.companions,
            //             [`${CompanionData.id}`]: {
            //                 id: CompanionData.id,
            //                 messages: [newMessage],
            //             }
            //         }
            //     }
            // }
            updateUserConvarsation( currentClientData.id, newData );
        }
    }

    const createUser = () => {
        const newData = { 
            [`${loginnedUser}`]: { 
                id: loginnedUser, 
                isLogin: true,
                companions: {
                    [`${CompanionData.id}`]: {
                        id: CompanionData.id,
                        avatar_url: defaultAvatar_url,
                        messages: [],
                    }
                }
            }
        }
        postUserConvarsation( newData );
    }

    const toggleUser = () => {
        const user = currentUser === loginnedUser ? currentCompId : loginnedUser;
        console.log(currentUser)
        setCurrentUser(user);
    }

    if ( clientData.length < 0 ) {
        return null;
    }

    return(
        <>
            <div className="messanger">
                <div className="sidebar">
                    <Sidebar 
                        conversationsList={conversationsList}
                        companionName={companionName}
                        setCompanionName={setCompanionName}
                        createConversation={createConversation}
                        currentCompanion={currentCompanion}
                        setCurrentCompanion={setCurrentCompanion}
                    />
                </div>
                <div className="currentChat">
                    <Chat 
                        clientMessages={clientMessages}
                        currentUser={currentUser}
                        message={message}
                        currentCompId={currentCompId}
                        currentClientData={currentClientData}
                        avatarUrl={avatarUrl}
                        setMessage={setMessage}
                    />
                    <div className="navigation">
                        <button 
                            className="navigation-btn left" 
                            onClick={() => toggleUser()}
                        >Toggle User</button>
                        <input 
                            className="navigation-input" 
                            type="text" onKeyDown={onEnterPress} 
                            onChange={handleChange} value={message} 
                            maxLength="120" 
                            placeholder="Put your message" 
                        />
                        <button 
                            className="navigation-btn right" 
                            onClick={() => createUser()}
                        >Send</button>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapState = state => {
    return {
        message: messageSelector(state),
        currentUser: currentUserSelector(state),
        loginnedUser: logginedUserSelector(state),
    }
}

const mapDispatch = {
    setCurrentUser: (prop) => set_current_user(prop),
    setMessage: (prop) => set_message(prop),
}

export default connect( mapState, mapDispatch )( Messanger );
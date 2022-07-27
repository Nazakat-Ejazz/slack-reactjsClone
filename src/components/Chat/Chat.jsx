import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { selectRoomId } from "../../features/appSlice";
import { db } from "../../firebase";

// icons
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// components
import ChatInput from "../ChatInput/ChatInput";
import Message from "../Message/Message";

import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query } from "firebase/firestore";

const Chat = () => {
  const roomRefs = collection(db, "rooms");
  const chatBottomRef = useRef(null);
  //const q = query(roomRefs, orderBy("timestamp"), "asc");
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(roomId && doc(roomRefs, roomId));

  const [roomMessages, loading] = useCollection(
    roomId && collection(db, "rooms", roomId, "messages")
  );

  // console.log(roomDetails?.data());
  // console.log("roomMessages : ", roomMessages);

  useEffect(() => {
    chatBottomRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);
  return (
    <ChatContainer>
      {roomId && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <span style={{ fontStyle: "italic", fontWeight: "400" }}>
                Channel &nbsp;
              </span>

              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon />
                Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImg } = doc.data();
              return (
                <Message
                  id={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImg={userImg}
                />
              );
            })}

            <ChatBottom ref={chatBottomRef} />
          </ChatMessages>
          <ChatInput
            chatBottomRef={chatBottomRef}
            channelId={roomId}
            channelName={roomDetails?.data().name}
          ></ChatInput>
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
  position: relative;
  background: url(https://wallpaperaccess.com/full/6551738.png);
  background-position: cover;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 0.5px solid lightgray;
  position: sticky;
  top: 0;
  background-color: #eee9e9;
  color: #442346;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div`
  color: white;
`;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;

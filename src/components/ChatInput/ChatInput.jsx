import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";

import { useState } from "react";
import { db, auth } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatInput = ({ chatBottomRef, channelName, channelId }) => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    try {
      const docRef = await addDoc(
        collection(db, "rooms", channelId, "messages"),
        {
          message: input,
          timestamp: serverTimestamp(),
          user: user.displayName,
          userImg: user.photoURL,
        }
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.log("Error adding msg : ", err);
    }
    // db.collection("rooms").doc(channelId).collection("messages").add({
    //   message: input,
    //   timestamp: db.FieldValue.serverTimestamp(),
    //   user: "Najzi",
    //   userImg:
    //     "https://image.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg",
    // });

    chatBottomRef.current.scrollIntoView({
      behavior: "smooth",
    });
    const reset = `send a message into channel ${channelName}`;
    setInput(reset);
  };
  return (
    <ChatInputContainer>
      <form action="">
        <input
          value={input}
          placeholder={`send a message into channel ${channelName}`}
          onChange={(e) => setInput(e.target.value)}
          onClick={() => setInput(" ")}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          Send
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid whitesmoke;
    border-radius: 10px;
    padding: 20px;
    outline: none;
    background-color: #421f44;
    color: whitesmoke;
  }

  > form > button {
    display: none !important;
  }
`;

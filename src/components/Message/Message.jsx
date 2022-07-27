import React from "react";
import styled from "styled-components";

const Message = ({ id, message, timestamp, user, userImg }) => {
  return (
    <MessageContainer>
      <img src={userImg} alt="user-img" />
      <MessageInfo>
        <h4>
          {user}
          <span> at {new Date(timestamp?.toDate()).toUTCString()}</span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;

  > img {
    height: 50px;
    width: 50px;
    vertical-align: middle;
    border-radius: 50%;
    outline: 1px solid black;
  }
`;

const MessageInfo = styled.div`
  margin-left: 10px;
  outline: 1px solid wheat;
  border-radius: 15px;
  padding: 4px 16px;
  padding-right: 30px;
  margin-top: 2px;
  > p {
    all: none;
    margin-left: 0;
    padding-left: 0;
    font-style: italic;
    display: inline-block;
    color: whitesmoke;
  }

  > h4 {
    font-weight: 600;
  }

  > h4 > span {
    color: wheat;
    font-weight: 300;
    margin-left: 5px;
    font-size: 11px;
  }
`;

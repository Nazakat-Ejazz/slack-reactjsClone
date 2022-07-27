import React from "react";
import Styled from "styled-components";
import { useDispatch } from "react-redux";
import { enterRoom } from "../../features/appSlice";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const SidebarOption = ({ Icon, title, addChannelOption, id }) => {
  const dispatch = useDispatch();

  // method to handle addChannel
  const addChannel = async () => {
    const channelName = prompt("Please enter the channel name : ");
    try {
      await addDoc(collection(db, "rooms"), {
        name: channelName,
      });
      //console.log("Document written with ID : ", docRef.id);
    } catch (err) {
      console.log(err);
    }
  };

  // method to handle selectChannel
  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };
  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span>
          {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
};

export default SidebarOption;

const SidebarOptionContainer = Styled.div`
    display:flex;
    gap:3px;
    font-size:12px;
    align-items:center;
    justify-content:flex-start;
    padding-left:2px;
    cursor:pointer;

    :hover{
        opacity:.8;
        background-color:#442346;
    }

    > h3{
        font-weight:400;
        font-size:.8rem;
    }

    > h3:hover{
        font-size:1rem;
        transition: width 2s;
    }

    > h3 > span {
        padding:15px;
    }
`;
const SidebarOptionChannel = Styled.h3`

    padding:10px 0;
    font-weight:300;
`;

import React from "react";
import Styled from "styled-components";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";
import ExpandlessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

import SidebarOption from "../sidebarOption/SidebarOption";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, auth } from "../../firebase";
import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Sidebar = () => {
  const [channels] = useCollection(collection(db, "rooms"));
  const [user] = useAuthState(auth);
  //console.log("channels -> ", channels);
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <small
            style={{ marginLeft: "20px", color: "lightgray", fontSize: "10px" }}
          >
            To showcase skillset
          </small>
          <h2>Slack ++</h2>
          <h3>
            <FiberManualRecordIcon />
            {user.displayName}
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>

      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File browser" />
      <SidebarOption Icon={ExpandlessIcon} title="Show less" />

      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />

      {channels?.docs.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}

      <hr />
      <SidebarOption Icon={AddIcon} title="Add Channel" addChannelOption />
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = Styled.div`
    color:white;
    background-color:var(--slack-color);
    flex:.3;
    border-top:1px solid #49274b;
    max-width:260px;
    margin-top:60px;
    overflow-y:scroll;

    > hr{
      margin-top:0 10px ;
      border:1px solid #49274b;
    }

`;

const SidebarHeader = Styled.div`
    display:flex;
    border-bottom:1px solid #49274b;
    padding-bottom:10px;
    padding:13px;

    > .MuiSvgIcon-root{

        padding:8px;
        color:#49274b;
        font-size:18px;
        background-color:white;
        border-radius:50%;
        margin-right:30px;
    }
`;

const SidebarInfo = Styled.div`
    flex:1;
    justify-content:center;
    
    > h2{
        font-size:25px;
        font-weight:600;
        margin-bottom:5px;
        letter-spacing:.7px;
        padding-left:20px;
        text-align:left;
    }

    > h3{
        display:flex;
        font-size:13px;
        font-weight:400;
        align-items:center;
        justify-content:start;
    }

    > h3 > .MuiSvgIcon-root{
        font-size:14px;
        margin-top:1px;
        margin-right:5px;
        color:green;

    }
    
`;

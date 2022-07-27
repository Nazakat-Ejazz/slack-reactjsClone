import React from "react";
import Styled from "styled-components";
import { Avatar } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const Header = () => {
  const [user] = useAuthState(auth);
  return (
    <HeaderContainer>
      {/*left */}
      <HeaderLeft>
        <HeaderAvatar
          src={user?.photoURL}
          alt={user?.displayName}
          onClick={() =>
            auth.signOut() && console.log("user loggedOut Successfully!")
          }
        />
        <AccessTimeIcon />
      </HeaderLeft>
      {/*search */}
      <HeaderSearch>
        <input placeholder="Search a chat ..." />
        <SearchOutlinedIcon />
      </HeaderSearch>
      {/*right */}
      <HeaderRight>
        <HelpOutlinedIcon />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

//styled components

const HeaderContainer = Styled.div`
    display:flex;
    position:fixed;
    width:100%;
    align-items:center;
    justify-content:space-between;
    padding:10px 0px;
    background-color:var(--slack-color);
    color:white;
`;

const HeaderLeft = Styled.div`
    display:flex;
    flex:.3;
    align-items:center;
    margin-left:50px;

    > .MuiSvgIcon-root{
        margin-left:auto;
        margin-right:20px;
    }

`;

const HeaderAvatar = Styled(Avatar)`

    cursor:pointer;
    

    :hover{
        opacity:.7;
    }
`;
const HeaderSearch = Styled.div`
    background-color:#421f44;
    flex:.4;
    opacity:1;
    border-radius:6px;
    border:1px solid gray;
    display:flex;
    align-items:center;
    justify-content:center;
    text-align:center;
    color:gray;


    > input{
        padding:5px 10px;
        margin:4px 0px;
        margin-left:16px;
        background-color:transparent;
        outline:none;
        color:white;
        border:none;
        min-width:30vw;
    }

`;

const HeaderRight = Styled.div`
    flex:.3;
    display:flex;
    align-items:flex-end;

    > .MuiSvgIcon-root{
        margin-left:auto;
        margin-right:40px;
    }
`;

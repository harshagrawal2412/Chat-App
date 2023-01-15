import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <div
        style={{
          width: "100%",
          justifyContent: "space-evenly",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "25%",
            // justifyContent: "space-evenly",
            // display: "flex",
          }}
        >
          {user && <MyChats fetchAgain={fetchAgain} />}
        </div>
        <div
          style={{
            width: "75%",
            // justifyContent: "space-evenly",
            // display: "flex",
          }}
        >
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatpage;

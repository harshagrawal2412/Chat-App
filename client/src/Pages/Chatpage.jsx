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
        // d="flex"
        // justifyContent="space-evenly"
        // w={"100%"}
        // h="91.5vh"
        // p="10px"
        // bg="red"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          background: "white",
        }}
      >
        <div>{user && <MyChats fetchAgain={fetchAgain} />}</div>
        <div>
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatpage;

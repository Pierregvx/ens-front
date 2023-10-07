import { createEncoder, createDecoder, createLightNode, LightNode } from "@waku/sdk";
import protobuf from "protobufjs";
import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";

async function init() {
    const node = await createLightNode({ defaultBootstrap: true });
    await node.start();
    return node;
}

function Send() {
    const [node, setNode] = useState<LightNode>();
    console.log(node)
    const [messageString, setMessageString] = useState("");
    
    useEffect(() => {
        async function getNode() {
            const initializedNode = await init();
            setNode(initializedNode);
            console.log("new node")
        }

        getNode();
    }, []);

    const contentTopic = "/light-guide/1/message/proto";
    const encoder = createEncoder({ contentTopic });
    const decoder = createDecoder(contentTopic);

    const ChatMessage = new protobuf.Type("ChatMessage")
        .add(new protobuf.Field("timestamp", 1, "uint64"))
        .add(new protobuf.Field("sender", 2, "string"))
        .add(new protobuf.Field("message", 3, "string"));

    const message = prepareMessage(messageString);
    const serialisedMessage = ChatMessage.encode(message).finish();

    async function sendMessage() {
        if (!node) return;

        await node.lightPush.send(encoder, {
            payload: serialisedMessage,
        });
    }

    function prepareMessage(message:string) {
        return ChatMessage.create({
            timestamp: Date.now(),
            sender: "Alice",
            message: message,
        });
    }

    return (
        <div>
            <TextField
                label="Enter your message"
                variant="outlined"
                fullWidth
                value={messageString}
                onChange={(e) => setMessageString(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '10px' }}
                onClick={sendMessage}  // added the onClick event to send the message
            >
                Send
            </Button>
        </div>
    );
}

export default Send;

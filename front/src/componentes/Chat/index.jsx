import { FullPageChat } from "flowise-embed-react"

const App = () => {
    return (
        <FullPageChat
            chatflowid="699f2cfc-c52b-4fe1-842c-32f82a4f829d"
            apiHost="https://rayline-chat.hf.space"
            theme={{
                chatWindow: {
                    welcomeMessage: "Bem vindo ao FreshFridge ! No que posso ajudar hoje ?",
                    backgroundColor: "#ffffff",
                    height: 700,
                    width: 400,
                    fontSize: 16,
                    poweredByTextColor: "#303235",
                    botMessage: {
                        backgroundColor: "#f7f8ff",
                        textColor: "#303235",
                        showAvatar: true,
                        avatarSrc: "/imagens/avatar.svg",
                    },
                    userMessage: {
                        backgroundColor: "#9da81a",
                        textColor: "#ffffff",
                        showAvatar: true,
                        avatarSrc: "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
                    },
                    textInput: {
                        placeholder: "Type your question",
                        backgroundColor: "#ffffff",
                        textColor: "#303235",
                        sendButtonColor: "#9da81a",
                    }
                }
            }}
        />
    );
};

export default App;
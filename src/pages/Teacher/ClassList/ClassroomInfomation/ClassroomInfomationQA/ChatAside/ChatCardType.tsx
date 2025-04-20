type Chat = {
    name: string;
    message: string;
    time: string;
    avatar: string;
    seen: number;
    active: boolean;
};
type ChatType = {
    index: number;
    cardIndexChoose: number;
    handleClick: () => void;
    cardData: Chat;
};

export default ChatType;

const AccordionHeader = ({
    id,
    isOpen,
    toggleItem,
    children,
}: {
    id: string;
    isOpen: boolean;
    toggleItem: (id: string) => void;
    children: React.ReactNode;
}) => (
    <button
        className={`accordion-toggle flex items-center gap-2 w-full p-2 transition
            ${isOpen ? "bg-gradient-to-r from-background-orange-1 to-background-1 text-white" : "bg-white"}
            hover:bg-indigo-100`}
        onClick={() => toggleItem(id)}
        aria-controls={`collapse-${id}`}
    >
        {children}
    </button>
);

export default AccordionHeader;

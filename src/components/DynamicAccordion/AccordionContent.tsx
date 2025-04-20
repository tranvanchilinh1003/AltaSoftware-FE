const AccordionContent = ({
    id,
    isOpen,
    children,
}: {
    id: string;
    isOpen: boolean;
    children: React.ReactNode;
}) => (
    <div
        id={`collapse-${id}`}
        className={`accordion-content transition-[max-height] duration-500 ease-in-out overflow-hidden
            ${isOpen ? "max-h-screen" : "max-h-0"}`}>
        <div className="text-gray-900 text-base border-t border-gray-300">
            {children}
        </div>
    </div>
);

export default AccordionContent;

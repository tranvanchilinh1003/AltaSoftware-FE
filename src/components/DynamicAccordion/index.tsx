import { useState } from "react";
import { AccordionProps } from "./type";
import AccordionHeader from "./AccordionHeader";
import AccordionContent from "./AccordionContent";

const DynamicAccordion = <T,>({
    items,
    multiple = false,
    getId,
    renderHeader,
    renderContent,
    defaultOpenItems = [],
    className = "",
    itemClassName,
    onToggle,
}: AccordionProps<T>) => {
    const [openItems, setOpenItems] = useState<string[]>(defaultOpenItems);

    const toggleItem = (id: string) => {
        setOpenItems((prev) => {
            let newOpenItems: string[];

            if (multiple) {
                newOpenItems = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
            } else {
                newOpenItems = prev.includes(id) ? [] : [id];
            }

            onToggle?.(id, newOpenItems.includes(id)); // 🔥 Gọi callback khi mở/đóng
            return newOpenItems;
        });
    };

    return (
        <div className={`w-full text-sm text-left rtl:text-right ${className}`}>
            {items.map((item) => {
                const id = getId(item);
                const isOpen = openItems.includes(id);

                return (
                    <div
                        key={id}
                        className={`accordion border border-gray-400/10 rounded-lg overflow-hidden mb-4 ${
                            itemClassName ? itemClassName(item, isOpen) : ""
                        }`}
                    >
                        <AccordionHeader id={id} isOpen={isOpen} toggleItem={toggleItem}>
                            {renderHeader(item, isOpen)}
                        </AccordionHeader>
                        <AccordionContent id={id} isOpen={isOpen}>
                            {renderContent(item)}
                        </AccordionContent>
                    </div>
                );
            })}
        </div>
    );
};

export default DynamicAccordion;

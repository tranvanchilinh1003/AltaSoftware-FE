import { useState } from 'react';
import EditorTinyMCE from '../../../../../components/Form/EditorTinyMCE/EditorTinyMCE';

const EssayTextArea = ({ handleEditorContentChange }: { handleEditorContentChange: (value: string) => void }) => {
    const [content, setContent] = useState("");

    const handleEditorChange = (value: string) => {
        setContent(value);
        handleEditorContentChange(value);
    };

    return (
        <div className="h-full w-full bg-white shadow-[4px_4px_25px_4px_rgba(154,201,245,0.25)] overflow-hidden border-r border-none antialiased rounded-r-lg ">
            <EditorTinyMCE initialValue={content} handleEditorContentChange={handleEditorChange} disableBorder={true} />
        </div>
    );
};

export default EssayTextArea;

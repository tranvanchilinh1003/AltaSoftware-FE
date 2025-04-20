import { useRef, useState } from 'react';
import TitleComponent from '../../../../components/Title';
import useFileValidation from '../../../../hooks/useFileValidation';
import FileList from './FileList';
import FileRules from './FileRules';
import FileUploadSection from './FileUploadSection';
import EssayTextArea from './EssayTextArea';
import Button from '../../../../components/Button';
import ExamInfo from '../ExamInfo';


const EssayPage = () => {
    const [editorContent, setEditorContent] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { validateFiles, removeFile, errors, uploadedFiles } = useFileValidation(50);
    const isContentFilled = editorContent.trim() !== '';
    const handleFileChange = (files: File[]) => {
        validateFiles(files);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    const handleRemoveFile = (file: File) => {
        removeFile(file.name);
    };

    const handleEditorContentChange = (content: string) => {
        setEditorContent(content);
    };
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="relative max-w-full pt-2 mr-0 mx-auto bg-gray-50 lg:ml-10">
            <ExamInfo/>
            <div className="ml-5 col-span-full xl:mb-2">
                <TitleComponent text="Phần trả lời của học sinh" size={20} className="[&_p]:pb-0" />
            </div>
            <main className="w-full px-0 sm:px-6 lg:px-5">
                <section aria-labelledby="products-heading" className="pb-24 pt-4">
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 gap-0 gap-y-10 lg:grid-cols-4">
                            <div className="lg:col-span-1 flex">
                                <div className="hidden lg:flex flex-col rounded-l-lg bg-[#F0F3F6] shadow-sm px-2 py-3 w-full max-h-[600px] overflow-y-auto space-y-2
                            [&::-webkit-scrollbar]:w-2
                            [&::-webkit-scrollbar-track]:bg-gray-100
                            [&::-webkit-scrollbar-thumb]:bg-gray-300
                            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                                    <FileList uploadedFiles={uploadedFiles} onRemoveFile={handleRemoveFile} />
                                    <FileRules />
                                    <FileUploadSection handleFileChange={handleFileChange} errors={errors} />
                                </div>
                            </div>

                            <div className="lg:col-span-3">
                                <EssayTextArea handleEditorContentChange={handleEditorContentChange} />
                                <div className="flex justify-center items-center gap-4 mt-2">
                                    <Button
                                        type="button"
                                        size="mini"
                                        style={{
                                            backgroundColor: isContentFilled ? 'var(--background-4)' : 'var(--background-gray)',
                                            color: 'white',
                                            outline: 'none',
                                            border: 'none',
                                            fontWeight: 'bold',
                                            fontFamily: 'var(--font-Mulish)',
                                        }}
                                    >
                                        Lưu bài
                                    </Button>
                                </div>

                            </div>

                        </div>
                    </form>

                </section>
            </main>
        </div>
    );
};

export default EssayPage;

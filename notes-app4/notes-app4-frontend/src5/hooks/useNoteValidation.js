// useNoteValidation.js

const useNoteValidation = (initialContent = '') => {
    const [content, setContent] = useState(initialContent);
    
    const trimmedContent = content.trim();
    const length = trimmedContent.length;
    
    const isContentValid = length >= MIN_LENGTH && length <= MAX_LENGTH;
    const isNearMaxLength = length >= MAX_LENGTH - 20;
    
    const handleChange = (e) => {
        setContent(e.target.value);
    };
    
    return {
        content,
        trimmedContent,
        handleChange,
        length,
        MIN_LENGTH,
        MAX_LENGTH,
        isNearMaxLength,
        isContentValid,
        setContent,
    };
};

export default useNoteValidation;

const missingEnv: string[] = [];

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
if (!API_BASE_URL) missingEnv.push('REACT_APP_API_BASE_URL');

const TINYMCE_API_KEY = process.env.REACT_APP_TINYMCE_API_KEY || '';
if (!TINYMCE_API_KEY) missingEnv.push('REACT_APP_TINYMCE_API_KEY');

export const env = Object.freeze({ API_BASE_URL, TINYMCE_API_KEY });

if (missingEnv.length) {
  console.warn(`Thiếu biến môi trường: ${missingEnv.join(', ')}`);
}

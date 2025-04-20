import { env } from '../../../config';
const tinymceApiKey: string = String(env.TINYMCE_API_KEY) || '';
export default tinymceApiKey;

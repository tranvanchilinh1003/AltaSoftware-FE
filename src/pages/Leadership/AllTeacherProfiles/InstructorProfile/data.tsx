import { Tab } from '../../../../components/TabSwitch/types';
import TeacherProfile from '../LeadershipElearning';
import TeacherProfileEdit from '../LeadershipElearningEdit';
import Workprocess from '../Workprocess';

export const tabs: Tab[] = [
  { label: 'Thông tin chung', value: 'general', content: <TeacherProfile /> },
  { label: 'Quá trình công tác', value: 'work', content: <Workprocess /> },
  { label: '', value: 'edit', content: <TeacherProfileEdit /> },
];

import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const questionInterviewer = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  position: sample(['React','LapTrinhWeb']),
  question:sample([
    'Bạn thành thạo nhất ngôn ngữ lập trình nào?',
    'OLAP khác gì với OLTP? Chúng được dùng khi nào?',
    'Bạn thường dùng công cụ gì để quản lý source code?',
    'Điểm khác nhau giữa fixed, relative và statically positioned element là gì?'
  ]),
}));

export default questionInterviewer;

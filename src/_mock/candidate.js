import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const candidate = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  email: faker.internet.email(),
  gender: sample(['male', 'female']),
  phone: faker.phone.number(),
  address: faker.address.country(),
  status: sample(['WaitSchedule', 'WaitInterview', 'WaitApproval', 'Passed', 'Failed']),

  role: sample(['Fresher', 'Senior', 'Junior', 'Intern']),
  position: sample(['Lập trình web', 'Data analyst', 'Project Manager', 'Fontend developer']),
  skill: sample(['React', 'HTML', 'CSS', 'Name']),

  certificate: sample(['Ielts 10 chấm', 'Toeic 960', 'Master of SQL', 'JavaScript cấp cao', 'Tin học văn phòng']),

  education: sample([
    'Đại học Bách Khoa',
    'Đại học Sư phạm Kĩ thuật',
    'Đại học Sài Gòn',
    'Đại học RMIT',
    'Đại học FPT',
  ]),
  award: sample([
    'Giải nhất Toán học toàn quốc',
    'Huy chương vàng VNOI',
    'Giải nhất Hùng biện tiếng anh miền nam',
    'Giải ba Lập trình thanh niên',
  ]),
  personalProjects: sample(['Nhà thông minh', 'Web bán hàng', 'Chat GPT 5', 'Sạc bluetooth cho Iphone']),
  interviewdate: '13-4-2023',
  result: faker.datatype.number({ max: 10, min: 5 }),
  question: sample([
    'Browser Session là gì?',
    'Redux thunk có gì khác Redux toolkit?',
    'Kiểu nhúng CSS nào được ưu tiên áp dụng lên component?',
  ]),
  evaluate: 'Xuất sắc, có thể đi làm ngay',
  cv:'https://www.africau.edu/images/default/sample.pdf'
}));

export default candidate;

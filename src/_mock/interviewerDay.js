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
  statusSeeking: sample(['INTERVIEWED', 'NOTINTERVIEWED']),
  role: sample(['Fresher', 'Senior', 'Junior', 'Intern']),
  skill: sample(['React', 'HTML', 'CSS', 'Name']),

  certificate: sample(['Ielts 10 chấm', 'Toeic 960', 'Master of SQL', 'JavaScript cấp cao', 'Tin học văn phòng']),

  day: sample(['12/06/2023', '14/06/2023']),

  position: sample(['Lập trình Web', 'Lập trình AI']),

  education: sample([
    'Đại học Bách Khoa',
    'Đại học Sư phạm Kĩ thuật',
    'Đại học Sài Gòn',
    'Đại học RMIT',
    'Đại học FPT',
  ]),
  prize: sample([
    'Giải nhất Toán học toàn quốc',
    'Huy chương vàng VNOI',
    'Giải nhất Hùng biện tiếng anh miền nam',
    'Giải ba Lập trình thanh niên',
  ]),
  project: sample(['Nhà thông minh', 'Web bán hàng', 'Chat GPT 5', 'Sạc bluetooth cho Iphone']),
}));

export default candidate;

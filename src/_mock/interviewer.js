import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const interviewerList = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  email: faker.internet.email(),
  gender: sample(['male', 'female']),
  phone: faker.phone.number(),
  role: sample(['Fresher', 'Senior', 'Junior', 'Intern']),
  skill: sample(['React', 'HTML', 'CSS', 'Name']),
}));

export default interviewerList;

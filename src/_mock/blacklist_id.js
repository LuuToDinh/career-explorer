import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const NAME = ['Nguyễn Văn A', 'Nguyễn Văn B', 'Nguyễn Văn C', 'Nguyễn Văn D', 'Nguyễn Văn E'];
const EMAILS = ['abc@gmail.com', 'a123@yahoo.com', 'cc@gmail.com', 'Ttaia@gmail.com', 'Kaka@yahoo.com'];
const PHONENUMBER = ['0951412412', '0951412412', '0951412412', '0951412412', '0951412412'];
faker.seed(123);
const blacklists = [...Array(5)].map((_, index) => {
  return {
    id: faker.datatype.uuid(),
    name: NAME[index],
    email: EMAILS[index],
    address: '1011 Pine Street, Anytown, USA',
    phonenumber: PHONENUMBER[index],
    reason: sample(['Reason 1', 'Reason 2', 'Reason 3', 'Reason 4', 'Reason ++']),
  };
});
export default blacklists;

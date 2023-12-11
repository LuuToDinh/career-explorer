import { faker } from '@faker-js/faker';

const events = [...Array(24)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.random.words(),
  firstdate: '2023-06-10',
  enddate: '2023-07-30',
  image: 'https://blog.topcv.vn/wp-content/uploads/2019/02/nhan-vien-to-chuc-su-kien-768x320.jpg',
  description:
    'Người làm event – những người vẫn thường được nói đùa là “lo trước cái lo của thiên hạ, vui sau niềm vui của mọi người”. Sau hội trường hay cánh gà, không ai biết họ là ai. Nhưng niềm hạnh phúc thực sự xuất hiện khi họ được nhìn thấy những nụ cười, tràng vỗ tay của mọi người dành cho chương trình của mình. Ở bài viết này, hãy cùng chúng tôi tìm hiểu xem nhân viên tổ chức sự kiện là gì, công việc của họ bao gồm những gì và tìm việc làm ở đâu chất lượng.',
}));

export default events;

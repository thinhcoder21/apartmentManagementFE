// server.js
const jsonServer = require('json-server');
const faker = require('faker');
const fs = require('fs');

const PORT = 3001;
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Tạo dữ liệu giả mạo cho bảng `user`
const generateUsers = () => {
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const newUser = {
      id: i,
      username: faker.internet.userName(),
      password: faker.internet.password(),
      fullname: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      gender: faker.random.boolean() ? 1 : 0,
      active: faker.random.boolean() ? 1 : 0,
      link_image: faker.image.avatar(),
      id_role: faker.random.number({ min: 1, max: 3 }),
      id_locker: faker.random.number({ min: 1, max: 5 }),
      status: faker.random.boolean() ? 1 : 0,
    };
    users.push(newUser);
  }
  return { user: users };
};

// Tạo dữ liệu giả mạo cho bảng `surveyform`
const generateSurveyForms = () => {
  const surveyforms = [];
  for (let i = 1; i <= 3; i++) {
    const newSurveyForm = {
      id: i,
      initiated_date: faker.date.past(),
      description: faker.lorem.sentence(),
      id_user: faker.random.number({ min: 1, max: 10 }),
    };
    surveyforms.push(newSurveyForm);
  }
  return { surveyform: surveyforms };
};

// Tạo dữ liệu giả mạo cho bảng `payment`
const generatePayments = () => {
  const payments = [];
  for (let i = 1; i <= 5; i++) {
    const newPayment = {
      id: i,
      status: faker.random.number({ min: 0, max: 1 }),
      description: faker.lorem.sentences(),
      user_id: faker.random.number({ min: 1, max: 10 }),
      fee_id: faker.random.number({ min: 1, max: 5 }),
      date_of_payment: faker.date.past(),
    };
    payments.push(newPayment);
  }
  return { payment: payments };
};

// Ghi dữ liệu vào db.json
const generateData = () => {
  const data = {
    ...generateUsers(),
    ...generateSurveyForms(),
    ...generatePayments(),
  };
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
};

generateData();

// Sử dụng routes từ db.json
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});

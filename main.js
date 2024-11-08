import express from 'express';
const app = express();

const person = {
  name: "Khoa",
  age: 25
};


app.get('/', (req, res) => {
  const nameExists = "name" in person; 
  const addressExists = "address" in person; 
  const name  = person.name;

  res.send(`
    <h1>Kiểm tra thuộc tính trong đối tượng</h1>
    <p>Thuộc tính "name" tồn tại: ${name}</p>
    <p>Thuộc tính "address" tồn tại: ${addressExists}</p>
  `);
});

app.listen(3000, function () {
  console.log("ECA is running at http://localhost:3000");
});
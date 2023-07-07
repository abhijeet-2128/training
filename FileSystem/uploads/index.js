const Joi = require('joi');
const schema = Joi.object()
  .keys({
    name: Joi.string()
      .min(3)
      .max(40)
      .required(),
    age: Joi.number()
      .integer()
      .min(16)
  })
const data = {
  name: 'Srajan',
  age: 10
};
const res = schema.validate(data);
console.log(res);


const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

const validation = require('./v/validation')
const {
  validate
} = require('./middleware')

app.post("/", validate(validation.person), (req, res) => {
  res.send("request processed");
});


app.listen(3000, () => {
  console.log("Server Started");
});

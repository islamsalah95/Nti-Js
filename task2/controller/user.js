const deal = require("./dealWithJson");
const add = (name, age, status) => {
  const user = { id: Date.now(), name, age, status };
  const allUsers = deal.readDataFromJson("user.json");
  allUsers.push(user);
  deal.writeDataToJson("user.json", allUsers);
};
const showAll = () => {
  const allUsers = deal.readDataFromJson("user.json");
  if (!allUsers.length) return console.log("no users yet");
  allUsers.forEach((user) => {
    console.log(
      `id=> ${user.id} - name=> ${user.name} - age => ${user.age}  - status => ${user.status}`
    );
  });
};
const searchUser = (id, data) => {
  const userId = data.findIndex((user) => user.id == id);
  return userId;
};
const single = (id) => {
  const allUsers = deal.readDataFromJson("user.json");
  const user = searchUser(id, allUsers);
  if (user == -1) return console.log("no users with this id");
  console.log(
    `id=> ${allUsers[user].id} - name=> ${allUsers[user].name} - age => ${allUsers[user].age} - status => ${allUsers[user].status}`
  );
};
const edit = (id, newData) => {
  const allUsers = deal.readDataFromJson("user.json");
  const myId = searchUser(id, allUsers);
  if (myId == -1) return console.log("no users with this id");
  if (newData.name) allUsers[myId].name = newData.name;
  if (newData.age) allUsers[myId].age = newData.age;
  if (newData.status) allUsers[myId].status = newData.status;
  deal.writeDataToJson("user.json", allUsers);
};
const del = (id) => {
  const allUsers = deal.readDataFromJson("user.json");
  const afterDel = allUsers.filter((user) => user.id != id);
  if (allUsers.length == afterDel.length)
    return console.log("no users with this id");
  deal.writeDataToJson("user.json", afterDel);
  console.log("deleted");
};

module.exports = { add, showAll, single, edit, del };

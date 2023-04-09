const models = {
  user: require("./nosql/User"),
  role: require("./nosql/Role"),
  permission: require("./nosql/Permission"),
  category: require("./nosql/Category"),
  blog: require("./nosql/Blog"),
  resources: require("./nosql/Resources"),
  event: require("./nosql/Event"),
  customer: require("./nosql/Customer"),
};

module.exports = models;

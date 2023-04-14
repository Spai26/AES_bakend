const models = {
  user: require("./nosql/User"),
  role: require("./nosql/Role"),
  permission: require("./nosql/Permission"),
  category: require("./nosql/Category"),
  blog: require("./nosql/Blog"),
  resources: require("./nosql/Resources"),
  event: require("./nosql/Event"),
  person: require("./nosql/Person"),
  tag: require("./nosql/Tag"),
  organization: require('./nosql/Organization'),
  area: require('./nosql/Areas'),
  institution: require('./nosql/Institution')
};

module.exports = models;

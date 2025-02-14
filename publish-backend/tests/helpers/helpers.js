// helper functions
const getUser = async (username) => {
  try {
    return await strapi.db.query("plugin::users-permissions.user").findOne({
      where: { username: username },
    });
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to get User for ${username}`);
  }
};

const getPost = async (slug) => {
  try {
    return await strapi.db.query("api::post.post").findOne({
      where: { slug: slug },
    });
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to get Post for ${slug}`);
  }
};

const getUserJWT = async (username) => {
  try {
    const user = await getUser(username);
    return await strapi.plugins["users-permissions"].services.jwt.issue({
      id: user.id,
    });
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to get JWT for ${username}`);
  }
};

const getRoleId = async (roleName) => {
  try {
    const role = await strapi.db
      .query("plugin::users-permissions.role")
      .findOne({
        where: { name: roleName },
      });
    return role.id;
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to get Role ID for ${roleName}`);
  }
};

module.exports = {
  getUser,
  getPost,
  getUserJWT,
  getRoleId,
};

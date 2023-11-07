module.exports = {
  jwt: {
    tokens: {
      access: {
        type: "access",
        expiresIn: "60m",
      },
      refresh: {
        type: "refresh",
        expiresIn: "365d",
      },
    },
  },
};
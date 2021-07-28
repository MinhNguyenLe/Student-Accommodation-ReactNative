export const setUser = (user) => {
  return {
    type: "SET-USER",
    payload: {
      user: {
        id: user.id_user,
        email: user.email,
        name: user.name,
        age: user.age,
        job: user.job,
        avatar: user.avatar,
        phone: user.phone,
        isAdmin: user.is_admin,
        coverImage: user.cover_image,
      },
    },
  };
};

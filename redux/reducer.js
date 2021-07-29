const INITIAL_STATE = {
  user: {
    id: "",
    email: "",
    name: "",
    age: "",
    job: "",
    avatar: "",
    phone: "",
    isAdmin: "",
    coverImage: "",
  },
};
function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET-USER":
      return {
        ...state,
        user: {
          id: action.payload.user.id,
          email: action.payload.user.email,
          name: action.payload.user.name,
          age: action.payload.user.age,
          job: action.payload.user.job,
          avatar: action.payload.user.avatar || "",
          phone: action.payload.user.phone,
          isAdmin: action.payload.user.isAdmin,
          coverImage: action.payload.user.coverImage || "",
        },
      };
    case "UPDATE-USER":
      return {
        ...state,
        user: {
          name: action.payload.user.name,
          age: action.payload.user.age,
          job: action.payload.user.job,
          phone: action.payload.user.phone,
        },
      };
    default:
      return state;
  }
}
export default reducer;

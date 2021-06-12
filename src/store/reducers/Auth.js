const initialState = {
  token: '',
  _id: '',
  didTryAutoLogin: false,
  isAuth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

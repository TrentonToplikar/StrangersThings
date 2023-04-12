const cohort = "2211-FTB-ET-WEB-FT";
////////// registers the user through the api and gets a token \\\\\\\\\\
export const registerUser = async (username, password) => {
  try {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/${cohort}/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username,
            password,
          },
        }),
      }
    );
    //const token = response.data.token
    const {
      data: { token },
    } = await response.json();
    console.log("THIS IS THE DATA{}}", response)
    return token;
  } catch (error) {
    console.log(error);
  }
};

////////// this gets the user data with all their posts and messages \\\\\\\\\\
export const fetchMe = async (token) => {
  try {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/${cohort}/users/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

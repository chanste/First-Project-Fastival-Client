const server = "http://3.133.96.196:5000/";
export const getAllFestivals = callback => {
  fetch(server + "festivals")
    .then(res => res.json())
    .then(data => callback(data));
};
export const addUserFestival = (user_Id, festival_Id) => {
  let body =
    {
      user_Id: user_Id,
      festival_Id: festival_Id
    };
  fetch(server + "festivals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(response => response.json());
}; //문제 있음

export const getUserFestivals = (user_Id, callback) => {
  console.log(server + "festivals/" + user_Id)
  fetch(server + "festivals/" + user_Id)
    .then(res => res.json())
    .then(data => callback(data))
};

export const deleteUserFestival = (user_Id, festival_Id) => {
  let body = {
    user_Id: user_Id,
    festival_Id: festival_Id  
  };
  return fetch(server + "festivals", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(res => res.json());
}; // 문제 없음

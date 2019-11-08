const server = "http://3.133.96.196:5000/";
export const getAllFestivals = callback => {
  fetch(server + "festivals")
    .then(res => res.json())
    .then(data => callback(data));
};
export const addUserFestival = (user_Id, festival_Id) => {
  let body = {
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
};

export const getUserFestivals = (user_Id, callback) => {
  fetch(server + "festivals/" + user_Id)
    .then(res => res.json())
    .then(data => callback(data));
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
};

export const addUserConcert = (user_Id, concert_Id) => {
  let body = [
    {
      user_Id: user_Id,
      concert_Id: concert_Id
    }
  ];
  return fetch(server + "concerts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(response => response.json());
};

export const deleteUserConcert = (user_Id, concert_Id) => {
  let body = {
    user_Id: user_Id,
    concert_Id: concert_Id
  };
  return fetch(server + "festivals", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(res => res.json());
};

export const getAllConcerts = (festival_Id, callback) => {
  fetch(server + "concerts/" + festival_Id)
    .then(res => res.json())
    .then(data => callback(data));
};

export const getUserConcerts = (user_Id, festival_Id, callback) => {
  fetch(server + "/concerts_user/" + user_Id + "/" + festival_Id)
    .then(res => res.json())
    .then(data => callback(data));
};

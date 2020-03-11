const remoteURL = "http://localhost:8200";

export default {
  get(component, id) {
    return fetch(`${remoteURL}/${component}/${id}`).then(result =>
      result.json()
    );
  },
  async getAll(component) {
    const result = await fetch(`${remoteURL}/${component}`);
    return await result.json();
  },
  getLogin(component, email, password) {
    return fetch(
      `${remoteURL}/${component}?email=${email}&password=${password}`
    ).then(result => result.json());
  },
  checkEmail(component, email) {
    return fetch(`${remoteURL}/${component}?email=${email}`).then(r =>
      r.json()
    );
  },
  getAllWithUserId(component, userId) {
    return fetch(`${remoteURL}/${component}?userId=${userId}`).then(result =>
      result.json()
    );
  },
  getAllWithUserIdExpand(component, userId, expandItem) {
    return fetch(
      `${remoteURL}/${component}?userId=${userId}&_expand=${expandItem}`
    ).then(result => result.json());
  },
  getWithEmbed(component, id, embedItem) {
    return fetch(
      `${remoteURL}/${component}/${id}?_embed=${embedItem}`
    ).then(result => result.json());
  },
  getAllWithEmbed(component, embedItem) {
    return fetch(`${remoteURL}/${component}?_embed=${embedItem}`).then(result =>
      result.json()
    );
  },
  getWithExpand(component, id, expandItem) {
    return fetch(
      `${remoteURL}/${component}/${id}?_expand=${expandItem}`
    ).then(result => result.json());
  },
  getAllWithExpand(component, expandItem) {
    return fetch(
      `${remoteURL}/${component}?_expand=${expandItem}`
    ).then(result => result.json());
  },
  async delete(component, id) {
    const result = await fetch(`${remoteURL}/${component}/${id}`, {
      method: "DELETE"
    });
    return await result.json();
  },
  post(component, newObject) {
    return fetch(`${remoteURL}/${component}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newObject)
    }).then(data => data.json());
  },
  update(component, editedObject) {
    return fetch(`${remoteURL}/${component}/${editedObject.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedObject)
    }).then(data => data.json());
  },
  updatePut(component, editedObject) {
    return fetch(`${remoteURL}/${component}/${editedObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedObject)
    }).then(data => data.json());
  },
  eventExpandUser(component, id) {
    return fetch(
      `${remoteURL}/${component}?userId=${id}&_expand=user`
    ).then(r => r.json());
  },
  async patch(component, editedObject, newProperty) {
    const data = await fetch(`${remoteURL}/${component}/${editedObject.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProperty)
    });
    return await data.json();
  },
  async getCompleted() {
    const result = await fetch(`http://localhost:8200/tasks?isComplete=true`);
    return await result.json();
  },

  async getUncompleted() {
    const result = await fetch(`http://localhost:8200/tasks?isComplete=false`);
    return await result.json();
  },
};

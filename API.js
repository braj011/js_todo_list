class API {

  static init () {
    this.baseUrl = 'http://localhost:3000/list-items'
  }

  static getListItems () {
    return fetch(this.baseUrl)
    .then(resp => resp.json())
  }

  static addListItem (newItem) {
    return fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'  
      },
      body: JSON.stringify(newItem)
    })
    .then(resp => resp.json())
  } 

  static crossListItem (id, completedStatus) {
    let reversedStatus = !completedStatus
    return fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'  
      },
      body: JSON.stringify({
        'completedStatus': reversedStatus
      })
    })
    .then(resp => resp.json())
  } 
}

API.init() 
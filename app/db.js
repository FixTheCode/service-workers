// a very simple script to support saving form
// data using IndexedDB
var db;
var request = window.indexedDB.open('MyAppMyAppDatabase', 1);
request.onerror = function(event) {
   console.log('error opening database.');
};

request.onsuccess = function(event) {
   db = request.result;
   console.log('database opened.');
};

request.onupgradeneeded = function(event) {
   var db = event.target.result;
   db.createObjectStore('my-form', {keyPath: 'id', autoIncrement: true});
}

function saveData(objFormData) {
  var request = db.transaction(['my-form'], 'readwrite')
    .objectStore('my-form')
    .add({ id: 1, firstname: objFormData.get('firstname'), lastname: objFormData.get('lastname')});
  request.onsuccess = function(event) {
    console.log('data added to IndexedDB.')
  };
}

function deleteAllData() {
  var request = db.transaction(['my-form'], 'readwrite')
    .objectStore('my-form').clear();

  request.onsuccess = function(event) {
    console.log('all data removed from IndexedDB.')
  };
}

function readData() {
  var request = db.transaction(['my-form'], 'readwrite')
    .objectStore('my-form')
    .get(1);

  request.onerror = function(event) {
    console.log('failure reading data from IndexedDB.');
  };

  request.onsuccess = function(event) {
    if(request.result) {
      console.log('data read: ' + request.result.firstname + ' ' + request.result.lastname);
    }
  };
}
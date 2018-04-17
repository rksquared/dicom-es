import * as request from 'request-promise-native';

const ESURL = 'http://localhost:9200';
const INDEXNAME = 'search'

export function ping() {
  request.get(ESURL + '/').then((res) => {
    console.log(res);
  })
}

export function deleteIndex() {
  request.delete(ESURL + '/' + INDEXNAME);
}

export function saveDoc(doc: Object) {
  const dt = new Date();
  const id = dt.getTime();
  request.put(ESURL + '/' + INDEXNAME + '/dcm/' + id, {
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(doc) 
  }).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log('ERROR: ', err);
  })
}
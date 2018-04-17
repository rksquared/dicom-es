import * as request from 'request-promise-native';

const ESURL = 'http://localhost:9200';
const INDEXNAME = 'search'

export function ping() {
  request.get(ESURL + '/').then((res) => {
    console.log(res);
  })
}

export function search(term: string) {
  return request.get(ESURL + '/' + INDEXNAME + '/_search?q=' + term)
    .then((rc) => {
      console.log(rc);
      const res = JSON.parse(rc);
      const hits = res['hits']['total'];
      if (hits > 0) {
        return res['hits']['hits'].map((data) => {
          return data['_source'];
        })
      }
      return [];
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
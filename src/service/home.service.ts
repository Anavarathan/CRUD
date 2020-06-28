import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.url)
  }

  postData(post) {
    return this.http.post(this.url, JSON.stringify(post))
  }

  updateData(post){
    return this.http.patch(this.url + '/' + post.id , JSON.stringify({isRead: true}))
  }
  deleteData(post) {
    return this.http.delete(this.url + '/' + post.id)
  }
}

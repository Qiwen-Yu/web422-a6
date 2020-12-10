import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../BlogPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  perPage = 6;
  perPageMax = Number.MAX_SAFE_INTEGER;
  constructor(private http: HttpClient) { }

  getPosts(page, tag, category): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`https://rocky-reaches-70281.herokuapp.com/api/posts?page=${page}&perPage=${this.perPage}`+ ((tag==null) ? "" : `&tag=${tag}`) + ((category==null) ? "" : `&category=${category}`));
  }

  getPostbyId(id): Observable<BlogPost> {
    return this.http.get<BlogPost>(`https://rocky-reaches-70281.herokuapp.com/api/posts/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`https://rocky-reaches-70281.herokuapp.com/api/categories`);
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`https://rocky-reaches-70281.herokuapp.com/api/tags`);
  }


getAllPosts():Observable<BlogPost[]> {
  return this.http.get<BlogPost[]>(`https://rocky-reaches-70281.herokuapp.com/api/posts?page=1&perPage=${this.perPageMax}`);
}

newPost(data: BlogPost): Observable<any> {
  return this.http.post<any>(`https://rocky-reaches-70281.herokuapp.com/api/posts`, data);
}

updatePostById(id: string, data: BlogPost): Observable<any> {
  return this.http.put<any>(`https://rocky-reaches-70281.herokuapp.com/api/posts/${id}`, data);
}

deletePostById(id: string): Observable<any> {
  return this.http.delete<any>(`https://rocky-reaches-70281.herokuapp.com/api/posts/${id}`);
}

}
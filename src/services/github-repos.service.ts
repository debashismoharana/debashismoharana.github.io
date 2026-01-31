import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Repo } from 'src/models/github-repo';

@Injectable({
  providedIn: 'root'
})
export class GithubReposService {

  constructor(private http: HttpClient) { }
  
  getRepos() {
    // Fetch repositories sorted by stars (most starred repos are typically pinned)
    return this.http.get<Repo[]>('https://api.github.com/users/debashismoharana/repos?sort=stars&direction=desc&per_page=100');
  }
}

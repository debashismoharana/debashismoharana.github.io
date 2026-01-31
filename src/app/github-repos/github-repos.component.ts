import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { GithubReposService } from '../../services/github-repos.service';
import { Repo } from '../../models/github-repo';

@Component({
  selector: 'app-github-repos',
  templateUrl: './github-repos.component.html',
  styleUrls: ['./github-repos.component.scss'],
  standalone: false
})
export class GithubReposComponent implements OnInit {
  myRepos: Repo[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  showAllRepos: boolean = false;
  pinnedReposCount: number = 6; // Show 6 repos in 2 rows (3 per row)

  constructor(
    private githubService: GithubReposService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getGithubRepos();
  }

  getGithubRepos() {
    this.isLoading = true;
    this.error = null;
    this.githubService.getRepos().subscribe({
      next: (response) => {
        console.log('Raw response:', response);
        this.myRepos = response || [];
        this.isLoading = false;
        console.log('Repos loaded:', this.myRepos);
        console.log('Repos length:', this.myRepos.length);
        console.log('isLoading:', this.isLoading);
        console.log('error:', this.error);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading repos:', error);
        this.error = 'Failed to load repositories. Please try again later.';
        this.myRepos = [];
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  trackByRepoId(index: number, repo: Repo): any {
    return repo.id || index;
  }

  get displayedRepos(): Repo[] {
    if (this.showAllRepos) {
      return this.myRepos;
    }
    return this.myRepos.slice(0, this.pinnedReposCount);
  }

  toggleShowAll() {
    this.showAllRepos = !this.showAllRepos;
  }

}

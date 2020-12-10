import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPost } from 'src/BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.css']
})
export class PostTableComponent implements OnInit {

  blogPosts: Array<BlogPost> = [];
  querySub: any;

  constructor(private data: PostService, private router: Router) { }

  ngOnInit(): void {
    this.querySub = this.data.getAllPosts().subscribe( p => this.blogPosts = p );
  }

  rowClicked(e, id){
    this.router.navigate(['admin/post/',id]);
  }
}
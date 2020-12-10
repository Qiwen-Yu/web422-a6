import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: Array<string>;
  private tagSub;

  constructor(private data: PostService) { }

  ngOnInit(): void {
    this.tagSub = this.data.getTags().subscribe( t => this.tags = t );
  }

}

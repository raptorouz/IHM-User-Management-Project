import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../api/user.service';
import { User } from '../interface/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  private selectedUserId: number;

  userDetail$: Observable<User>;

  constructor(
    public userService: UserService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.selectedUserId = this.actRoute.snapshot.params.id;
    this.userDetail$ = this.userService.getUserDetail(this.selectedUserId);
  }


}

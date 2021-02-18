import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../api/user.service';
import { User } from '../interface/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  subject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  userList$: Observable<User[]> = this.subject.asObservable();

  constructor(        public router: Router,
        public userService: UserService,
) {}
  ngOnInit(): void {
    this.userService.getUserList().subscribe(users => this.subject.next(users));
  }

logout(){
  localStorage.clear();
  this.router.navigateByUrl('login');
}

}

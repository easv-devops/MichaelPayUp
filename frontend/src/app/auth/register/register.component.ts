import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {FormBuilder, Validators} from "@angular/forms";
import {firstValueFrom} from "rxjs";
import {AccountService, Credentials, Registration, User} from "../account.service";
import {TokenService} from "../../../services/TokenService";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  readonly form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
    phone: ['', Validators.required],
  });


  get name() { return this.form.controls.name; }
  get email() { return this.form.controls.email; }
  get phone() { return this.form.controls.phone; }
  get password() { return this.form.controls.password; }
  get repeatPassword() { return this.form.controls.repeatPassword; }


  constructor(
      private readonly fb: FormBuilder,
      private readonly token: TokenService,
      private readonly toast: ToastController,
      private readonly service: AccountService,
  ) { }

  ngOnInit() {}


  async register() {

    var userInfo:Registration =
      {
        created: new Date(Date.now()),
        email: this.form.controls.email.value!,
      fullName: this.form.controls.name.value!,
      password: this.form.controls.password.value!,
        phoneNumber: this.form.controls.phone.value!,
      profileUrl: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"//todo implemter når vi kan gemme billeder.
    }


    if (this.form.invalid) return;
    const { any } = await firstValueFrom(this.service.register(userInfo as Registration));

    const { token } = await firstValueFrom(this.service.login(this.form.value as Credentials));
    console.log("your token is:  " + token)//todo bruges kun til test burde slettes før merge med main
    this.token.setToken(token);

    await (await this.toast.create({
      message: "Welcome to PayUp!",
      color: "success",
      duration: 5000
    })).present();
  }


  register1() {

  }
}

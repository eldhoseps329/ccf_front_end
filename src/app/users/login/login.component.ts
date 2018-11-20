import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import { FormGroup,  FormBuilder,  Validators , FormControl} from '@angular/forms';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ApiService]
})
export class LoginComponent implements OnInit { 
  loginForm: FormGroup;
  state:boolean=true;
  headerText:string="Login Here !";
  footerText:string="Don't have account yet!"
  submitButtonText:string="Login";
  constructor(private apiSrv:ApiService,private fb: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.compose([Validators.required,Validators.pattern("[^ @]*@[^ @]*")])],
      password:['',Validators.required]
    });
    
  }
  login(){
    let url= (this.state)?"login":"signup";
    this.apiSrv.post(url,this.loginForm.value).subscribe( <T>(result)  =>{
      if(result.status){
        if(!this.state) this.state=true,this.changeLogin();
        else{
          localStorage.setItem("userData",JSON.stringify(result.data));
          this.router.navigate(['/complaint'])
        }
      }
      else alert(result.message);
    },err=>{
      if(err.error && err.error.message) alert(err.error.message);
      else alert("OOPS! Something went wrong!")

    })
  }
  changeLogin(){
      this.headerText="Login Here !";
      this.footerText="Don't have account yet!";
      this.submitButtonText="Login";
      this.loginForm.removeControl("name");
      this.loginForm.reset();
  }
  changeSignup(){
      this.headerText="Signup Here !";
      this.footerText="Click here to login";
      this.submitButtonText="Signup";
      this.loginForm.addControl('name', new FormControl('', Validators.required));
      this.loginForm.reset();
  }
  changeState(){
    this.state=!this.state;
    (this.state)?this.changeLogin():this.changeSignup()
    
  }

}

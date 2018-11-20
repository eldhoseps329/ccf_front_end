import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators , FormControl} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css'],
  providers:[ApiService]

})
export class ComplaintComponent implements OnInit {
  complaintDetails: FormGroup;
  complaints:Array<object>=[];
  constructor(private apiSrv:ApiService,private fb: FormBuilder,private router:Router) { 
    this.apiSrv.get('newComplaint',{}).subscribe( <T>(result)  =>{
      if(result.status){
        this.complaints=result.data;
      }
      else alert(result.message);
    },err=>{
      if(err.error && err.error.message) alert(err.error.message);
      else alert("OOPS! Something went wrong!")

    })
  }

  ngOnInit() {
    this.complaintDetails = this.fb.group({
      complaint: ['', Validators.required],
      description:['',Validators.required]
    });
  
  }
  add(){
    this.apiSrv.post('newComplaint',this.complaintDetails.value).subscribe( <T>(result)  =>{
      if(result.status){
        if(result.data!==null) this.complaints.push(result.data)
        document.getElementById("closeModal").click();
      }
      else alert(result.message);
    },err=>{
      if(err.error && err.error.message) alert(err.error.message);
      else alert("OOPS! Something went wrong!")

    })
  }
  logout(){
    if (confirm("Do you want to logout..?")) {
      localStorage.clear();
      this.router.navigate(['/'])
     } 
   
  }

}

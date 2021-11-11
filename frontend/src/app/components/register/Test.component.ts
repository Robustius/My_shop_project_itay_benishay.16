import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
    selector: 'member-form',
    templateUrl: './Test.component.html',
  
})

export class MemberForm implements OnInit {
    langs: string[] = [
        'English',
        'French',
        'German',
    ];

    myform: FormGroup;
    firstName: FormControl;
    lastName: FormControl;
    email: FormControl;
    password: FormControl;
    language: FormControl;
    ethnicity: FormControl;


    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }

    createFormControls() {
        this.firstName = new FormControl('', Validators.required);
        this.lastName = new FormControl('', Validators.required);
        this.email = new FormControl('', [
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*")
        ]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]);

        this.ethnicity = new FormControl(undefined, Validators.required);
        this.language = new FormControl('');

        this.firstName.valueChanges
            .subscribe(value => {
                if (value == "qwerty") alert(value);
            });

        

        this.language.valueChanges
            .subscribe(value => {
                if (value == "English") alert(value);
            });

    }

    createForm() {
        this.myform = new FormGroup({
            name: new FormGroup({
                firstName: this.firstName,
                lastName: this.lastName,
            }),
            email: this.email,
            password: this.password,
            ethnicity: this.ethnicity,
            language: this.language
        });
    }

    onSubmit() {
        if (this.myform.valid) {
            alert("Form Submitted!");
            this.myform.reset();
        }
    }
}
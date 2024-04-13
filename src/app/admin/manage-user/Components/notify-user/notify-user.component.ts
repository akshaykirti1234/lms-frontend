import { COMMA, ENTER, TAB } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ManageUserService } from '../../Services/manage-user.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-notify-user',
  templateUrl: './notify-user.component.html',
  styleUrls: ['./notify-user.component.css']
})
export class NotifyUserComponent {

  public notifyForm: any;
  public userList: any;

  constructor(private fb: FormBuilder, private manageUserService: ManageUserService) {

  }

  public initNotifyForm() {
    this.notifyForm = this.fb.group({
      notifyStatus: ['', [Validators.required]],
      selectedEmails: [[], [Validators.required]],
      description: [''],
      selectAllUsersCtrl:['']
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.initNotifyForm();
    // Subscribe to changes in notifyStatus to update description validity
    this.notifyForm.get('notifyStatus').valueChanges.subscribe((value: any) => {
      const descriptionControl = this.notifyForm.get('description');
      if (value === 'information') {
        descriptionControl.setValidators(Validators.required);
      } else {
        descriptionControl.clearValidators();
      }
      // Reset the value and validity of description control
      descriptionControl.setValue('');
      descriptionControl.updateValueAndValidity();
    });

    this.notifyForm.get('selectedEmails')?.valueChanges.subscribe((users: any) => {
      // Update the users array whenever selectedEmails changes
      this.users = users;
    });
  }

  getAllUsers(): void {
    this.manageUserService.getAllUsers().subscribe({
      next: (response) => {
        this.userList = response.body.filter((email: string) => email !== 'admin@csm.tech');
        this.filteredUsers = this.userCtrl.valueChanges.pipe(
          map((user: string | null) => (user ? this._filter(user) : this.userList.slice())),
        );
      }, error: (error) => {
        console.log(error);
      }
    });
  }
  

  separatorKeysCodes: number[] = [ENTER, TAB];
  userCtrl = new FormControl('');
  filteredUsers!: Observable<string[]>;
  users: string[] = [];

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Check for duplicate user
    if (this.isDuplicateUser(value)) {
      Swal.fire({
        icon: 'error',
        title: 'Duplicate User',
        text: 'The user you entered is already selected!',
      });
      return; // Don't proceed further
    }

    // Add the user
    if (value) {
      this.users.push(value);

      // Update selectedEmails form control value
      this.notifyForm.get('selectedEmails')!.setValue(this.users);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.userCtrl.setValue(null);
  }

  isDuplicateUser(user: string): boolean {
    return this.users.includes(user);
  }

  remove(user: string): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
      this.notifyForm.get('selectedEmails')!.setValue(this.users);
      this.announcer.announce(`Removed ${user}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.users.push(event.option.viewValue);
    this.notifyForm.get('selectedEmails')!.setValue(this.users);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.userList.filter((user: any) => user.toLowerCase().includes(filterValue));
  }



  public onFormSubmit(): void {
    if (this.notifyForm.valid) {
      this.manageUserService.submitNotifyForm(this.notifyForm.value).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Sent Successfully'
          });
          // this.initNotifyForm();
          this.ngOnInit();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong'
          });
          // this.notifyForm.reset();
        }
      }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please Fill The Form Correctly'
      });
    }
  }

  selectAllUsers(): void {
    const selectAll = this.notifyForm.get('selectAllUsersCtrl').value;
    if (selectAll) {
      this.notifyForm.get('selectedEmails').setValue(this.userList);
    } else {
      this.notifyForm.get('selectedEmails').setValue([]);
    }
  }

}
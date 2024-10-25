import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.css']
})
export class GroupModalComponent implements OnInit {
  groupName = '';
  description = '';
  memberEmails: string[] = [];
  members: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<GroupModalComponent>,
    private groupService: GroupService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users: any) => {
      if (users && users.$values) {
        this.members = users.$values;
        console.log(this.members)
      }
    });
    
  }
  

  onCreateGroup(): void {
    const group = {
      name: this.groupName,
      description: this.description,
      createdDate: new Date(),
      memberEmails: this.memberEmails
    };
    this.groupService.createGroup(group).subscribe({
      next: () => {
        this.snackBar.open('Group created successfully', 'Close', {
          duration: 3000,
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackBar.open("Max 10 members are allowed", 'Close', {
          duration: 5000,
        });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

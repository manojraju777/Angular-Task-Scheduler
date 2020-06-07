import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  name: string = 'Logger'
  seconds: string = '*'
  minutes: string = '*'
  hours: string = '*'
  dayOfMonth: string = '*'
  month: string = '*'
  dayOfWeek: string = '*'
  tasks: any

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks() {
    const url = 'tasks'
    this.taskService.getTasks(url)
      .subscribe(value => {
        this.tasks = value
      })
  }

  createTask() {
    const url = 'tasks'
    const task = {
      "name": this.name,
      "time": `${this.seconds} ${this.minutes} ${this.hours} ${this.dayOfMonth} ${this.month} ${this.dayOfWeek}`
    }

    this.taskService.createTask(url, task)
      .subscribe(data => {
        this.getTasks()
      })
  }

}

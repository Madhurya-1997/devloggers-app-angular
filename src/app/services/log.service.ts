import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];
  private logSource = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null
  })
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    this.logs = [
      // {
      //   id: '1',
      //   text: 'Generated Components',
      //   date: new Date('12/26/2020 12:54:53')
      // },
      // {
      //   id: '2',
      //   text: 'Added Login',
      //   date: new Date('09/12/2020 02:16:22')
      // },
      // {
      //   id: '3',
      //   text: 'Added Bootstrap',
      //   date: new Date('12/03/2020 08:04:36')
      // }
    ]
  }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = []
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'))
    }

    /* To sort the logs by date
    return of(this.logs.sort((a, b) => {
      return b.date - a.date
    }));
    */

    return of(this.logs);
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log)

    //Add to localStorage
    localStorage.setItem('logs', JSON.stringify(this.logs))
  }

  updateLog(log: Log) {
    this.logs.forEach((currentLog, index) => {
      if (currentLog.id === log.id) {
        this.logs.splice(index, 1)
      }
    })
    this.logs.unshift(log)

    //Update localStorage
    localStorage.setItem('logs', JSON.stringify(this.logs))
  }

  deleteLog(log: Log) {
    this.logs.forEach((currentLog, index) => {
      if (log.id === currentLog.id) {
        this.logs.splice(index, 1)
      }
    })

    //Delete log from localStorage
    localStorage.setItem('logs', JSON.stringify(this.logs))
  }

  clearState() {
    this.stateSource.next(true);
  }
}

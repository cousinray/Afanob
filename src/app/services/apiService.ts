import { Partnerjobs } from './../models/jobs.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';
import { Jobs } from '../models/jobs.model';
// import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = 'https://www.afanoblaw.com/afanob_api/scriptz';
  // PHP_API_SERVER = 'http://localhost/afanob_api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'    })
  };

public lawyers = [];
public job = [];
public partnerJob: Partnerjobs;
public message;

  constructor(private httpClient: HttpClient) {
  }


   private handleError(error) {
    if (error.error === undefined) {
      this.message = 'Check internet connection';
      console.log(this.message);
    } else {
      this.message = error.error.text;
      console.log(this.message);
    }
    // return an observable with a user friendly message
    return throwError(this.message);
  }


  createLawyer(data) {
    return this.httpClient.post(`${this.PHP_API_SERVER}/createLawyer.php`, data)
      .pipe(timeout(30000), map((res) => {
        this.lawyers.push(res);
        return this.lawyers;
      }),
        catchError(this.handleError));
  }

  createjob(job: Jobs): Observable<Jobs[]> {
    return this.httpClient.post(`${this.PHP_API_SERVER}/createJob.php`, job)
      .pipe(timeout(30000), map((res) => {
        this.job.push(res);
        return this.job;
      }),
        catchError(this.handleError));
  }

  updateJob(identify, assigned) {
    return this.httpClient.post(`${this.PHP_API_SERVER}/updateJob.php`, {id: identify, assignedTo: assigned});
  }

  getLawyers() {
    return this.httpClient.get(`${this.PHP_API_SERVER}/getLawyers.php?time=${new Date().getTime()}`)
    .pipe(timeout(30000), map((res) => {
      const lawyers = res[`data`];
      return lawyers;
    }),
      catchError(this.handleError));

}

  getJobs() {
    return this.httpClient.get(`${this.PHP_API_SERVER}/getJobs.php?time=${new Date().getTime()}`)
    .pipe(timeout(30000), map((res) => {
      const jobs = res[`data`];
      return jobs;
    }),
      catchError(this.handleError));

}

getPartnerData(name): Observable<Partnerjobs> {
  return this.httpClient.get<Partnerjobs>(`${this.PHP_API_SERVER}/getPartnerData.php?time=${new Date().getTime()}&id=${name}`)
  .pipe(timeout(30000), map((res) => {
    // console.log(res);
    const partnerJob = res;
    return partnerJob;
  }),
    catchError(this.handleError));
}


deleteJob(identify, assigned) {
  return this.httpClient.post(`${this.PHP_API_SERVER}/deleteJob.php`, {id: identify,
    assignedTo: assigned});
}

deleteLawyer(id: number) {
  return this.httpClient.delete(`${this.PHP_API_SERVER}/deleteLawyer.php?id=${id}`)
  .pipe(timeout(30000), map((res) => {
    return res;
  }));
}

updateLawyer(data) {
  // console.log(data);
  return this.httpClient.post(`${this.PHP_API_SERVER}/updateLawyer.php`, data);
}



// login(password) {
//   return this.httpClient.post(`${this.PHP_API_SERVER}/login.php`, password)
//   .pipe(map((res) => {
//     const loginDetails = res;
//     return loginDetails;
//   }),
//     catchError(this.handleError));
// }


login(password) {
  return this.httpClient.post(`${this.PHP_API_SERVER}/login.php`, password)
  .pipe(timeout(30000), map((res) => {
    const loginDetails = res;
    return loginDetails;
  }),
  catchError(this.handleError));
}
}


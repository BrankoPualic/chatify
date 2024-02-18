import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GroupService {
  private changeGroupSubject = new BehaviorSubject<any>(null);
  changeGroupSubject$ = this.changeGroupSubject.asObservable();

  setChangedGroupInformations(group: any) {
    this.changeGroupSubject.next(group);
  }

  constructor(private dataService: DataService) {}

  fetchGroupInformations(gid: { gid: number }): Observable<any> {
    return this.dataService.postDataJson(gid, '/group');
  }

  updateAllGroupInfo(data: FormData): Observable<any> {
    return this.dataService.postDataFiles(data, '/group/updateAll');
  }

  updateGroupInfo(data: {
    id: number;
    name: string;
    desc: string;
  }): Observable<any> {
    return this.dataService.postDataJson(data, '/group/updateInfo');
  }

  findFriends(data: {
    id: number;
    group: number;
    value: string;
  }): Observable<any> {
    return this.dataService.postDataJson(data, '/group/findFriends');
  }

  addMember(data: { user: number; group: number }): Observable<any> {
    return this.dataService.postDataJson(data, '/group/addMember');
  }

  fetchOtherRoles(data: { my_role: number }): Observable<any> {
    return this.dataService.postDataJson(data, '/group/otherRoles');
  }

  updateUserRole(data: {
    id: number;
    role: number;
    group: number;
  }): Observable<any> {
    return this.dataService.postDataJson(data, '/group/updateRole');
  }

  removeUserFromGroup(data: { uid: number; gid: number }): Observable<any> {
    return this.dataService.deleteData(
      `/group/remove/uid=${data.uid}&gid=${data.gid}`
    );
  }
}

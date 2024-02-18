import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private chatSubject = new BehaviorSubject<any>(null);
  public chatObserver$ = this.chatSubject.asObservable();

  private sendMessageProfile = new BehaviorSubject<string>('');
  public sendMessageProfile$ = this.sendMessageProfile.asObservable();

  constructor(private dataService: DataService) {}

  setUsernameInSearch(username: string) {
    this.sendMessageProfile.next(username);
  }

  setNewChat(chat: any) {
    this.chatSubject.next(chat);
  }

  findConversations(value: {
    id: number;
    name: string;
    search: string;
  }): Observable<any> {
    return this.dataService.postDataJson(value, '/user/conversations');
  }

  getConversation(value: {
    me: number;
    him?: number;
    group?: number;
    offset: number;
  }): Observable<any> {
    return this.dataService.postDataJson(value, '/conversation');
  }

  sendMessage(value: {
    me: number;
    him?: number;
    group?: number;
    message: string;
  }): Observable<any> {
    return this.dataService.postDataJson(value, '/conversation/messages');
  }

  loadExistingConversations(value: { id: number }): Observable<any> {
    return this.dataService.postDataJson(value, '/conversation/conversations');
  }
  loadExistingGroupConversations(value: { id: number }): Observable<any> {
    return this.dataService.postDataJson(value, '/conversation/groups');
  }

  createGroup(formData: FormData): Observable<any> {
    return this.dataService.postDataFiles(
      formData,
      '/conversation/createGroup'
    );
  }
}

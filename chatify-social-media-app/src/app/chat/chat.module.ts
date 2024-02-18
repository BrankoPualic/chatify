import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChattingWindowComponent } from './chatting-window/chatting-window.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { UserToUserComponent } from './chatting-window/user-to-user/user-to-user.component';
import { UserToGroupComponent } from './chatting-window/user-to-group/user-to-group.component';
import { UserChatSettingsComponent } from './chatting-window/user-to-user/user-chat-settings/user-chat-settings.component';
import { GroupChatSettingsComponent } from './chatting-window/user-to-group/group-chat-settings/group-chat-settings.component';
import { SharedModule } from '../shared/shared.module';
import { EditGroupInfoComponent } from './chatting-window/user-to-group/group-chat-settings/edit-group-info/edit-group-info.component';
import { AddFriendsComponent } from './chatting-window/user-to-group/group-chat-settings/add-friends/add-friends.component';
import { UserOptionsComponent } from './chatting-window/user-to-group/group-chat-settings/user-options/user-options.component';
import { RemoveMemberComponent } from './chatting-window/user-to-group/group-chat-settings/user-options/remove-member/remove-member.component';

@NgModule({
  declarations: [
    ChatComponent,
    ChattingWindowComponent,
    CreateGroupComponent,
    UserToUserComponent,
    UserToGroupComponent,
    UserChatSettingsComponent,
    GroupChatSettingsComponent,
    EditGroupInfoComponent,
    AddFriendsComponent,
    UserOptionsComponent,
    RemoveMemberComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
  ],
})
export class ChatModule {}

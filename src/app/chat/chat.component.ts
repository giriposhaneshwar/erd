import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import {fadeInAnimation} from "../core/route-animation/route.animation";

@Component({
   selector: 'ms-chat',
   templateUrl:'./chat-component.html',
   styleUrls: ['./chat-component.scss'],
   encapsulation: ViewEncapsulation.None,
   host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class ChatComponent implements OnInit {
	
  // MESSAGE
  selectedChat: any;
  chats: Object[] = [{
      from: 'Jkod Hkdo',
      photo: 'assets/img/user-11.jpg',
      subject: 'Online',
    }, {
      from: 'Maria Puioa',
      photo: 'assets/img/user-2.jpg',
      subject: 'Online',
    }, {
      from: 'Alison Harris',
      photo: 'assets/img/user-3.jpg',
      subject: 'Online',
    }, {
      from: 'Lokid jaeoi',
      photo: 'assets/img/user-4.jpg',
      subject: 'Busy',
    }, {
      from: 'Qmax Jons',
      photo: 'assets/img/user-5.jpg',
      subject: 'At Work',
    }, {
      from: 'Perry Wilsom',
      photo: 'assets/img/user-6.jpg',
      subject: 'Online',
    }, {
      from: 'Ginny Ford',
      photo: 'assets/img/user-7.jpg',
      subject: 'Online',
    }
  ];

  messages: Object[] = [{
      from: 'them',
      msg: 'laboris nisi ut aliquip ex',
      time : '8 min ago'
    }, {
      from: 'me',
      msg: 'Nemo enim ipsam voluptatem',
      time : '3 min ago'
    },{
      from: 'them',
      msg: 'Quis nostrum exercitationem ullam',
      time : '2 min ago'
    }, {
      from: 'them',
      msg: 'sed quia non numquam eius modi tempora',
      time : '1 min ago'
    }
  ];
  newMessage: string;
  send() {
    if (this.newMessage) {
      this.messages.push({
        msg: this.newMessage,
        from: 'me',
        time: '2 sec ago'
      });
      this.newMessage = '';
    }
  }

  clearMessages() {
    this.messages.length = 0;
  }

  constructor(private pageTitleService: PageTitleService) {
    this.selectedChat = this.chats[1];
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Chat");
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  onSelect(chat: Object[]): void {
    this.selectedChat = chat;
  }

	
}




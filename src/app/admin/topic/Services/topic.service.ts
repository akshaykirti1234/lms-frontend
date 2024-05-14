import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private topicUrl = "http://localhost:8085/api/topic/";



  constructor(private httpClient: HttpClient) { }

  // getUserList() {
  //   return this.httpClient.get("http://localhost:8085/usersByUserTypes");
  // }

  saveTopic(topicmaster: any) {
    return this.httpClient.post(this.topicUrl+"saveTopic", topicmaster);
  }

  viewTopic() {
    return this.httpClient.get(this.topicUrl+"getTopic");
  }

  deleteTopic(id: any) {
    return this.httpClient.delete(this.topicUrl+`deleteTopic/${id}`);
  }

  getTopicById(id: any) {
     return this.httpClient.get(this.topicUrl+`getTopic/${id}`);
   }


}

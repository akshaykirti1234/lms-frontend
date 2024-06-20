import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private topicUrl = environment.apiUrl+"api/topic/";
  


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

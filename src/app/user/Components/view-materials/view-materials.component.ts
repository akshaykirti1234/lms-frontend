import { ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../Services/dashboard.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-view-materials',
  templateUrl: './view-materials.component.html',
  styleUrls: ['./view-materials.component.css']
})
export class ViewMaterialsComponent implements OnInit, OnDestroy {

  public firstRecord: any;

  public materialList: any;

  public questionarList: any;

  public selectedPdf: any;
  public selectedVideo: any;
  public selectedQuestionar: any;
  public authorName: any;
  public sessionName: any;
  public description: any;

  public currentRating: any;

  private startTime: any;
  private elapsedTime: any;
  private timer: any;

  private userInfoForm: any;
  private questionAnswer: any;
  constructor(private activatedRout: ActivatedRoute, private dashboardService: DashboardService, private cdr: ChangeDetectorRef,
    private elementRef: ElementRef, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.activatedRout.paramMap.subscribe(params => {
      const scheduleForId = params.get('scheduleForId');
      this.getSessionByscheduleForId(scheduleForId);
    });

    this.initUserInfoForm();
    this.initQuestionForm();
  }

  ngOnDestroy(): void {
    this.onEnded();
  }

  public initUserInfoForm() {
    this.userInfoForm = this.fb.group({
      userId: this.fb.control(sessionStorage.getItem('userId')),
      sessionId: this.fb.control(''),
      startTime: this.fb.control(''),
      endTime: this.fb.control(''),
      rating: this.fb.control('')
    });
  }

  public getSessionByscheduleForId(scheduleForId: any) {
    this.dashboardService.getSessionByscheduleForId(scheduleForId).subscribe({
      next: (response) => {
        this.materialList = response.body;
        // Check if materialList is not empty and contains videos
        if (this.materialList) {
          const firstVideo = this.materialList.find((item: any) => item.video);
          this.firstRecord = firstVideo;
          if (firstVideo) {
            this.showMaterial(firstVideo.video, firstVideo);
          }
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  // ***********************************************************************
  //  Video and PDF
  // ***********************************************************************

  public showMaterial(materialPath: string, file: any): void {


    this.sessionName = file.sessionName;
    this.description = file.sessionDescription;
    this.authorName = file.scheduleFor.author.authName;

    this.selectedPdf = null;
    this.selectedVideo = null;
    this.selectedQuestionar = false;
    this.cdr.detectChanges();

    if (this.userInfoForm.get('startTime').value) {
      this.onEnded();
    }
    this.userInfoForm.get('sessionId').setValue(file.sessionId);
    this.userInfoForm.get('rating').setValue(null);


    const fileExtension = materialPath.substr(materialPath.lastIndexOf('.') + 1).toLowerCase();

    if (fileExtension === 'pdf') {
      this.selectedPdf = '../../../assets/documents/' + materialPath;
    } else if (['mp4', 'avi', 'mkv'].includes(fileExtension as string)) {
      this.selectedVideo = '../../../assets/videos/' + materialPath;
    } else {
      console.log('Unsupported file type or unknown extension.');
    }
  }


  // ***********************************************************************
  //  Questionar
  // ***********************************************************************

  public showQuestionar(sessionId: any): void {
    this.selectedPdf = null;
    this.selectedVideo = null;
    this.selectedQuestionar = true;
    this.dashboardService.getQuestionarBySessionId(sessionId).subscribe({
      next: (response) => {
        this.questionarList = response.body;
        console.log(this.questionarList);
      },
      error: (error) => {
        console.log(error);
        this.questionarList = null;
        this.currentQuestionIndex = 0;
      }
    });
  }
  // ********************************************************************

  public questionForm: any;

  public currentQuestionIndex: number = 0;
  public selectedOption: string | null = null;
  public givenQuestionAnswer: any[] = [];

  public initQuestionForm() {
    this.questionForm = this.fb.group({
      questionId: [''],
      option: ['']
    });
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;

      const currentQuestionId = this.questionarList[this.currentQuestionIndex].sessionAssessmentMasterId;

      const currentAnswer = this.givenQuestionAnswer.find(qa => qa.questionId === currentQuestionId);

      if (currentAnswer) {
        console.log("id exist");
        this.questionForm.get("option").setValue(currentAnswer.option);
      } else {
        console.log("id not exist");
        this.questionForm.get("option").setValue(null);
      }
      console.log(this.questionarList[this.currentQuestionIndex]);
    } else {
      console.log("Already at the first question.");
    }
  }


  nextQuestion() {
    this.questionForm.get("questionId").setValue(this.questionarList[this.currentQuestionIndex].sessionAssessmentMasterId);

    console.log(this.questionForm.value);
    const currentQuestionId = this.questionarList[this.currentQuestionIndex].sessionAssessmentMasterId;

    const currentAnswer = this.givenQuestionAnswer.find(qa => qa.questionId === currentQuestionId);
    console.log(currentAnswer);




    // Create an object to hold the values of "questionId" and "option"
    this.questionAnswer = {
      questionId: this.questionForm.get("questionId").value,
      option: this.questionForm.get("option").value
    };
    // Push the questionAnswer object into your array
    this.givenQuestionAnswer.push(this.questionAnswer);
    if (currentAnswer) {
      this.givenQuestionAnswer.splice(this.currentQuestionIndex--, 1);
      this.questionForm.get("option").setValue(currentAnswer.option);
      // this.givenQuestionAnswer.push(this.questionAnswer);
    } else {
    }

    console.log(this.givenQuestionAnswer);

    if (this.currentQuestionIndex < this.questionarList.length - 1) {
      this.currentQuestionIndex++;
    }
    this.questionForm.get("option").setValue(null);


  }

  submitAssessment() {
    // Here you can handle the submission of the assessment, e.g., send data to a backend service
    console.log("Assessment submitted");
    // Resetting the assessment state after submission
    this.selectedQuestionar = false;
    this.currentQuestionIndex = 0;
    this.selectedOption = null;
  }

  selectAnswer(option: string) {
    this.selectedOption = option;
    // this.answeredQuestions[this.currentQuestionIndex] = true; // Mark current question as answered
  }
  showAssessment(sId: any) {
    this.selectedPdf = null;
    this.selectedVideo = null;
    this.selectedQuestionar = true;
  }

  // ***********************************************************************
  //  Video Rating
  // ***********************************************************************

  rateVideo(rating: number) {
    this.currentRating = rating;
    this.userInfoForm.get('rating').setValue(this.currentRating);
    console.log("Rated video with", rating, "stars");
    // Update star styling based on rating
    const stars = document.querySelectorAll('.star-rating i');
    for (let i = 0; i < stars.length; i++) {
      stars[i].classList.remove('star-selected'); // Remove selected class from all stars
      if (i < rating) {
        stars[i].classList.add('star-selected'); // Add selected class for stars below the rating
      }
    }
  }


  // ***********************************************************************
  //  Time Tracking
  // ***********************************************************************

  // startTimer() {
  //   this.startTime = Date.now();
  //   this.timer = setInterval(() => {
  //     this.elapsedTime = Date.now() - this.startTime;
  //   }, 1000); // Update elapsed time every second
  // }

  onPlay() {

    console.log('video started ' + new Date());
    // this.startTimer();
    if (!this.userInfoForm.get('startTime').value) {
      this.userInfoForm.get('startTime').setValue(new Date());
    }
  }

  onPause() {
    console.log('video paused');
    if (!this.elementRef.nativeElement.paused) {
      // this.stopTimer();
      // const totalTimeShown = this.elapsedTime;
      // console.log('Total time shown:', this.formatTime(totalTimeShown));
      this.userInfoForm.get('endTime').setValue(new Date());
    }
  }

  onEnded() {
    // console.log('video closed');
    // this.stopTimer();
    // const totalTimeShown = this.elapsedTime;
    // console.log('Total time shown:', this.formatTime(totalTimeShown));
    this.userInfoForm.get('endTime').setValue(new Date());
    this.dashboardService.saveUserInfoForm(this.userInfoForm.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.userInfoForm.get('startTime').setValue(null);


  }

  // stopTimer() {
  //   clearInterval(this.timer);
  // }

  // formatTime(milliseconds: number): string {
  //   const seconds = Math.floor(milliseconds / 1000);
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  // }



  // ***********************************************************************
  //  Disable right click
  // ***********************************************************************

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: Event): void {
    event.preventDefault();
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: Event): void {
    event.preventDefault();
  }

}

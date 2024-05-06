import { ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../Services/dashboard.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-materials',
  templateUrl: './view-materials.component.html',
  styleUrls: ['./view-materials.component.css']
})

export class ViewMaterialsComponent implements OnInit, OnDestroy {

  public firstRecord: any;

  public materialList: any[] = [];

  public questionarList: any = [];

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

  // public getSessionByscheduleForId(scheduleForId: any) {
  //   let userId = sessionStorage.getItem('userId');
  //   this.dashboardService.getSessionByscheduleForIdAndUserId(scheduleForId, userId).subscribe({
  //     next: (response) => {
  //       this.materialList = response.body as any[];
  //       console.log(response.body);
  //       // Check if materialList is not empty and contains videos
  //       if (this.materialList) {
  //         const firstVideo = this.materialList.find((item: any) => item.video);
  //         this.firstRecord = firstVideo;
  //         if (firstVideo) {
  //           this.showMaterial(firstVideo.video, firstVideo);
  //         }
  //       }
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   });
  // }
  public getSessionByscheduleForId(scheduleForId: any) {
    let userId = sessionStorage.getItem('userId');
    this.dashboardService.getSessionByscheduleForIdAndUserId(scheduleForId, userId).subscribe({
      next: (response) => {
        this.materialList = response.body as any[];
        console.log(response.body);
        // Check if materialList is not empty and contains videos
        if (this.materialList) {
          const firstVideo = this.materialList.find((item: any) => item.video);
          this.firstRecord = firstVideo;
          if (firstVideo) {
            this.showMaterial(firstVideo.video, firstVideo);
          }
        }

        // Check if response.body is not null and is an array before iterating through sessions
        if (Array.isArray(response.body)) {
          this.materialList.forEach(session => {
            if (session.sessionId) {
              this.dashboardService.getQuestionarBySessionId(session.sessionId).subscribe({
                next: (res) => {
                  session.hasQuestions = (Array.isArray(res.body) && res.body.length > 0) ? true : false;
                },
                error: (error) => {
                  console.log(error);
                  session.hasQuestions = false; // Set hasQuestions to false if there's an error
                }
              });
            } else {
              session.hasQuestions = false; // Set hasQuestions to false if sessionId is not available
            }
          });
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

  public showQuestionar(sessionId: any, resultStatus: any): void {
    if (!resultStatus) {
      this.selectedPdf = null;
      this.selectedVideo = null;
      this.selectedQuestionar = true;
      this.questionarList = [];
      this.dashboardService.getQuestionarBySessionId(sessionId).subscribe({
        next: (response) => {
          this.questionarList = response.body;
          console.log(this.questionarList);
          // Show the questionnaire section only if there are questions available
          if (this.questionarList.length === 0) {
            this.selectedQuestionar = false;
          }
        },
        error: (error) => {
          console.log(error);
          this.questionarList = [];
          this.currentQuestionIndex = 0;
          this.selectedQuestionar = false; // Hide questionnaire if there's an error fetching questions
        }
      });
    }
  }

  allQuestionnairesPassed(): boolean {
    if (this.materialList.length > 0) {
      return this.materialList.every((file: any) => file.resultStatus);
    } else {
      return false;
    }
  }

  downloadPDF(): void {
    let userName = sessionStorage.getItem('fullName');
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const doc = new jsPDF();

    // Set border color and fill color
    doc.setDrawColor(0); // Set border color to black
    doc.setFillColor(255, 255, 255); // Set background color to white

    // Add rectangle with border and filled with background color
    doc.rect(5, 5, 200, 287, 'FD');

    doc.setFontSize(22);
    doc.text("Certificate of Completion", 105, 50, { align: 'center' });

    doc.setFontSize(16);
    doc.text("This is to certify that", 105, 80, { align: 'center' });
    doc.text(`${userName}`, 105, 90, { align: 'center' });

    doc.text("has successfully completed the course", 105, 110, { align: 'center' });
    doc.text(this.firstRecord?.scheduleFor.scheduleForName, 105, 120, { align: 'center' });

    doc.text(`Date: ${currentDate}`, 20, 140);
    // doc.text("Signature: <<Signature>>", 160, 140);

    doc.save('Certificate.pdf');
  }



  // // Method to show a specific question
  // showQuestion(question: any) {
  //   console.log("showQuestion method called");

  //   // Find the index of the selected question in the questionarList array
  //   const selectedQuestionIndex = this.questionarList.findIndex((q: any) => q === question);

  //   if (selectedQuestionIndex !== -1) {
  //     // Set the currentQuestionIndex to the selected question index
  //     this.currentQuestionIndex = selectedQuestionIndex;

  //     // Retrieve the answer for the selected question, if it exists
  //     const selectedQuestionId = this.questionarList[selectedQuestionIndex].sessionAssessmentMasterId;
  //     const selectedAnswer = this.givenQuestionAnswer.find(qa => qa.sessionAssessmentMasterId === selectedQuestionId);

  //     // Set the option value in the form to the selected question's answer, if available
  //     if (selectedAnswer) {
  //       this.questionForm.get("option").setValue(selectedAnswer.option);
  //     } else {
  //       // If no answer exists for the selected question, keep the option value null
  //       this.questionForm.get("option").setValue(null);
  //     }

  //     // Check if the selected question is skipped and update its status to 'skipped' if needed
  //     console.log("Current question status:", this.questionStatusList[selectedQuestionIndex]);
  //     if (this.questionStatusList[selectedQuestionIndex] === 'skipped') {
  //       console.log("Updating question status to 'skipped'");
  //       console.log(selectedQuestionIndex);
  //       this.updateQuestionStatus(selectedQuestionIndex, 'skipped');
  //     }
  //   }
  // }

  showQuestion(question: any) {
    console.log("showQuestion method called");

    // Find the index of the selected question in the questionarList array
    const selectedQuestionIndex = this.questionarList.findIndex((q: any) => q === question);

    if (selectedQuestionIndex !== -1) {
      // Set the currentQuestionIndex to the selected question index
      this.currentQuestionIndex = selectedQuestionIndex;

      // Retrieve the answer for the selected question, if it exists
      const selectedQuestionId = this.questionarList[selectedQuestionIndex].sessionAssessmentMasterId;
      const selectedAnswer = this.givenQuestionAnswer.find(qa => qa.sessionAssessmentMasterId === selectedQuestionId);

      // Set the option value in the form to the selected question's answer, if available
      if (selectedAnswer) {
        setTimeout(() => {
          this.questionForm.get("option").setValue(selectedAnswer.option);
        });
      } else {
        // If no answer exists for the selected question, keep the option value null
        setTimeout(() => {
          this.questionForm.get("option").setValue(null);
        });
      }

      // Check if the selected question is skipped and update its status to 'skipped' if needed
      console.log("Current question status:", this.questionStatusList[selectedQuestionIndex]);
      if (this.questionStatusList[selectedQuestionIndex] === 'skipped') {
        console.log("Updating question status to 'skipped'");
        console.log(selectedQuestionIndex);
        this.updateQuestionStatus(selectedQuestionIndex, 'skipped');
      }
    }
  }


  questionStatusList: string[] = [];

  updateQuestionStatus(index: number, status: string) {
    console.log("Updating question status for index:", index, "with status:", status);
    if (this.questionStatusList[index] !== 'answered') {
      console.log("Previous status:", this.questionStatusList[index]);
      this.questionStatusList[index] = status;
      console.log("Updated status:", this.questionStatusList[index]);
    }
  }


  // ********************************************************************

  public questionForm: any;

  public currentQuestionIndex: number = 0;
  public selectedOption: string | null = null;
  public givenQuestionAnswer: any[] = [];

  public initQuestionForm() {
    this.questionForm = this.fb.group({
      sessionAssessmentMasterId: [''],
      option: ['']
    });
  }

  // previousQuestion() {
  //   console.log("Moving to previous question...");

  //   // Get the ID of the current question
  //   const currentQuestionId = this.questionarList[this.currentQuestionIndex].sessionAssessmentMasterId;

  //   // Check if an option is selected for the current question
  //   if (this.questionForm.get("option").value) {
  //     // If an option is selected, update the status of the current question to 'answered'
  //     this.updateQuestionStatus(this.currentQuestionIndex, 'skipped');
  //   } else {
  //     // If no option is selected, update the status of the current question to 'skipped'
  //     this.updateQuestionStatus(this.currentQuestionIndex, 'skipped');
  //   }

  //   // Move to the previous question if available
  //   if (this.currentQuestionIndex > 0) {
  //     this.currentQuestionIndex--;

  //     // Retrieve the answer for the previous question, if available, and set its option value in the form
  //     const previousQuestionId = this.questionarList[this.currentQuestionIndex].sessionAssessmentMasterId;
  //     const previousAnswer = this.givenQuestionAnswer.find(qa => qa.sessionAssessmentMasterId === previousQuestionId);
  //     if (previousAnswer) {
  //       this.questionForm.get("option").setValue(previousAnswer.option);
  //     } else {
  //       this.questionForm.get("option").setValue(null);
  //     }
  //   } else {
  //     console.log("Already at the first question.");
  //   }

  //   // Update the status of the current question to 'not-visited'
  //   if (this.currentQuestionIndex < this.questionStatusList.length) {
  //     this.updateQuestionStatus(this.currentQuestionIndex, 'not-visited');
  //   }
  // }
  previousQuestion() {
    console.log("Moving to previous question...");

    // Get the ID of the current question
    const currentQuestionId = this.questionarList[this.currentQuestionIndex].sessionAssessmentMasterId;

    // Check if an option is selected for the current question
    if (this.questionForm.get("option").value) {
      // If an option is selected, update the status of the current question to 'answered'
      this.updateQuestionStatus(this.currentQuestionIndex, 'answered');
    } else {
      // If no option is selected, update the status of the current question to 'skipped'
      this.updateQuestionStatus(this.currentQuestionIndex, 'skipped');
    }

    // Move to the previous question if available
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;

      // Retrieve the answer for the previous question, if available, and set its option value in the form
      const previousQuestionId = this.questionarList[this.currentQuestionIndex].sessionAssessmentMasterId;
      const previousAnswer = this.givenQuestionAnswer.find(qa => qa.sessionAssessmentMasterId === previousQuestionId);
      if (previousAnswer) {
        setTimeout(() => {
          this.questionForm.get("option").setValue(previousAnswer.option);
        });
      } else {
        setTimeout(() => {
          this.questionForm.get("option").setValue(null);
        });
      }
    } else {
      console.log("Already at the first question.");
    }

    // Update the status of the current question to 'not-visited'
    if (this.currentQuestionIndex < this.questionStatusList.length) {
      this.updateQuestionStatus(this.currentQuestionIndex, 'not-visited');
    }
  }




  // nextQuestion() {
  //   const currentQuestionId = this.questionarList[this.currentQuestionIndex].sessionAssessmentMasterId;

  //   // Get the value of the selected option
  //   const selectedOption = this.questionForm.get("option").value;

  //   console.log(selectedOption);

  //   // Check if the selected option is not null or empty
  //   if (selectedOption) {
  //     console.log("In side selected ");
  //     // Create a new answer object with the current question ID and selected option
  //     const newAnswer = {
  //       userId: sessionStorage.getItem('userId'),
  //       sessionAssessmentMasterId: currentQuestionId,
  //       option: selectedOption
  //     };

  //     // Update or add the new answer to the givenQuestionAnswer array
  //     const currentAnswerIndex = this.givenQuestionAnswer.findIndex(qa => qa.sessionAssessmentMasterId === currentQuestionId);
  //     if (currentAnswerIndex !== -1) {
  //       this.givenQuestionAnswer[currentAnswerIndex] = newAnswer;
  //     } else {
  //       this.givenQuestionAnswer.push(newAnswer);
  //     }

  //     // Update the status of the current question to 'answered'
  //     this.updateQuestionStatus(this.currentQuestionIndex, 'answered');
  //   } else {
  //     // If no option is selected, update the status of the current question to 'skipped'
  //     this.updateQuestionStatus(this.currentQuestionIndex, 'skipped');
  //   }

  //   // Move to the next question
  //   if (this.currentQuestionIndex < this.questionarList.length - 1) {
  //     this.currentQuestionIndex++;

  //     // Retrieve the answer for the next question, if it exists
  //     const nextQuestionId = this.questionarList[this.currentQuestionIndex].sessionAssessmentMasterId;
  //     const nextAnswer = this.givenQuestionAnswer.find(qa => qa.sessionAssessmentMasterId === nextQuestionId);

  //     // Set the option value in the form to the next question's answer, if available
  //     if (nextAnswer) {
  //       this.questionForm.get("option").setValue(nextAnswer.option);
  //     } else {
  //       // If no answer exists for the next question, reset the option value
  //       this.questionForm.get("option").setValue(null);
  //     }
  //   } else {
  //     console.log("Already at the last question.");
  //     // Clear the option value if already at the last question
  //     this.questionForm.get("option").setValue(null);
  //   }
  // }
  nextQuestion() {
    const currentQuestionId = this.questionarList[this.currentQuestionIndex].sessionAssessmentMasterId;

    // Get the value of the selected option
    const selectedOption = this.questionForm.get("option").value;

    console.log(selectedOption);

    // Check if the selected option is not null or empty
    if (selectedOption) {
      console.log("In side selected ");
      // Create a new answer object with the current question ID and selected option
      const newAnswer = {
        userId: sessionStorage.getItem('userId'),
        sessionAssessmentMasterId: currentQuestionId,
        option: selectedOption
      };

      // Update or add the new answer to the givenQuestionAnswer array
      const currentAnswerIndex = this.givenQuestionAnswer.findIndex(qa => qa.sessionAssessmentMasterId === currentQuestionId);
      if (currentAnswerIndex !== -1) {
        this.givenQuestionAnswer[currentAnswerIndex] = newAnswer;
      } else {
        this.givenQuestionAnswer.push(newAnswer);
      }

      // Update the status of the current question to 'answered'
      this.updateQuestionStatus(this.currentQuestionIndex, 'answered');
    } else {
      // If no option is selected, update the status of the current question to 'skipped'
      this.updateQuestionStatus(this.currentQuestionIndex, 'skipped');
    }

    // Move to the next question
    if (this.currentQuestionIndex < this.questionarList.length - 1) {
      this.currentQuestionIndex++;

      setTimeout(() => {
        // Retrieve the answer for the next question, if it exists
        const nextQuestionId = this.questionarList[this.currentQuestionIndex].sessionAssessmentMasterId;
        const nextAnswer = this.givenQuestionAnswer.find(qa => qa.sessionAssessmentMasterId === nextQuestionId);

        // Set the option value in the form to the next question's answer, if available
        if (nextAnswer) {
          this.questionForm.get("option").setValue(nextAnswer.option);
        } else {
          // If no answer exists for the next question, reset the option value
          this.questionForm.get("option").setValue(null);
        }
      });
    } else {
      console.log("Already at the last question.");
      // Clear the option value if already at the last question
      this.questionForm.get("option").setValue(null);
    }
  }




  submitAssessment() {
    // Push the answer for the last question into givenQuestionAnswer array
    const lastQuestionId = this.questionarList[this.questionarList.length - 1].sessionAssessmentMasterId;
    const lastAnswerIndex = this.givenQuestionAnswer.findIndex(qa => qa.sessionAssessmentMasterId === lastQuestionId);

    // Create a new answer object for the last question
    const lastAnswer = {
      userId: sessionStorage.getItem('userId'),
      sessionAssessmentMasterId: lastQuestionId,
      option: this.questionForm.get("option").value
    };

    // If an answer for the last question already exists, update it; otherwise, add the new answer
    if (lastAnswerIndex !== -1) {
      this.givenQuestionAnswer[lastAnswerIndex] = lastAnswer;
    } else {
      this.givenQuestionAnswer.push(lastAnswer);
    }

    // Perform any necessary actions to submit the assessment data, e.g., send data to a backend service
    console.log(this.givenQuestionAnswer);


    this.dashboardService.saveSessionResult(this.givenQuestionAnswer).subscribe({
      next: (response) => {
        console.log(response);
        console.log(response.body);
        this.givenQuestionAnswer = [];
        this.questionStatusList = [];

        const icon = response.body.percentage < response.body.passingPercentage ? 'warning' : 'success';
        const title = response.body.percentage < response.body.passingPercentage ? `Failed` : `Passed`;
        const text = `Your score is ${response.body.percentage}%`;
        Swal.fire({
          title: title,
          icon: icon,
          text: text,
          confirmButtonText: 'OK'
        });

        // window.location.reload();
        this.ngOnInit();
      },
      error: (error) => {
        console.log(error);
      }
    });


    // Resetting the assessment state after submission
    this.selectedQuestionar = false;
    this.currentQuestionIndex = 0;
    this.selectedOption = null;
    this.questionForm.reset();
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

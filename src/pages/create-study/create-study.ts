import { Component , Renderer, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import { AllStudyData , Rounds } from '../../models';
import { ParserProvider , Time} from '../../providers'
import { Keyboard } from '@ionic-native/keyboard';
/**
 * Generated class for the CreateStudyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-study',
  templateUrl: 'create-study.html'
})
export class CreateStudyPage {
  
  public roundTime: any;
  public all_data: any;
  public round_data: any;
  public studyTitle: any;
  public customer: any;
  public location: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams ,
              public renderer: Renderer,
              public elementRef: ElementRef,
              public viewCtrl: ViewController,
              public keyboard: Keyboard,
              public parser: ParserProvider,
              public time: Time) {
  }

  ionViewDidLoad() {
    this.studyTitle = '';
    this.roundTime = 3; 
    this.customer = this.navParams.get('customer');
    this.location = this.navParams.get('location');
    this.setFocus();
  }

  setFocus(){
    let element = this.elementRef.nativeElement.querySelector('input');
    setTimeout(() => {
      this.renderer.invokeElementMethod(element, 'focus', []);   
      this.keyboard.show();
    }, 500);
  }

  /* DISMISSING ALERT */
  dismiss(action: string) {

    this.roundTime = this.roundTime * 60;
    
    /* SETTING ALL DATA OBJECTS */
    this.all_data = new AllStudyData();
    this.all_data.setTitle(this.studyTitle);
    this.all_data.setCustomer(this.customer);
    this.all_data.setStudyStartTime(new Date().getTime());
    this.all_data.setLocationID(this.location._id);
    this.all_data.setroundDuration(this.roundTime * 1000);
    this.all_data.setStudyEndTime(null);

    /* SETTING ROUNDS OBJECT */
    this.round_data = new Rounds();
    this.round_data.setRoundStartTime(new Date().getTime());

    /* PARSING ROUND DATA AND ALL DATA */
    this.parser.setRounds(this.round_data);
    this.parser.setAllData(this.all_data);
    
    let data = { action: action , roundTime: this.roundTime , title: this.studyTitle};
    this.viewCtrl.dismiss(data);
  }

}
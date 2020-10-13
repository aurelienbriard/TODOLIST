import { Component } from '@angular/core';
// connexion avec firebase
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // ----------------------------  mes variables ---------------------------------
  currentDate: string;

  tasks = []; // le tableau de taches
  myTask: string;// je déclare une tache en tant que chaine de caractere

  addTask: boolean; // un bolléen qui prend vrai ou faux si la tâche est affichée ou non
  checked:boolean;


  // le constructeur de la page
  constructor(public afDB: AngularFireDatabase) {
    const date = new Date(); // je crée une variable date
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = date.toLocaleDateString('fr-FR', options);
    this.getTasks();
  }

  // ------------------------------------ mes fonctions ------------------------------------

  // pour montrer une tache
  showForm() {
    this.addTask = !this.addTask;
    this.myTask = '';
  }

  // pour ajouter une tache
  addTaskToFirebase() {

    if (this.myTask){ // si j'ai quelque chose dans la chaine

      this.afDB.list('Tasks/').push({
        text: this.myTask, // le text saisi
        date: new Date().toISOString(), // la date
        checked: false // un bolléen pour définir qu'une tache n'est pas checked par défaut
      });
      this.showForm();

    }

  }

  // recuperer les taches de la base de donnée
  getTasks() {
  this.afDB.list('Tasks/')
    .snapshotChanges(['child_added', 'child_removed'])
    .subscribe(actions => {
    this.tasks = [];
      actions.forEach(action => {
        this.tasks.push({
          key: action.key,
          text: action.payload.exportVal().text,
          jour: action.payload.exportVal().date.substring(0, 10),
          date: action.payload.exportVal().date.substring(11, 16),
          checked: action.payload.exportVal().checked
        });
      });
    });
  }

  // gestion des checked
  changeCheckState(ev: any) {
    console.log('checked: ' + ev.checked);
    this.afDB.object('Tasks/' + ev.key + '/checked/').set(ev.checked);
  }

  // supprimer une tache
  deleteTask(task: any) {
  this.afDB.list('Tasks/').remove(task.key);
  }

  // supprmier toutes les taches
  deleteAll(tasks){
    this.afDB.list('Tasks/').remove(tasks.key);
  }

  // supprimmer les tâches checked
  deleteCheckedTask(task: any){
    for (let i = this.tasks.length-1; i >= 0; i--) { // boucle inversée je pars de la fin du tableau
        console.log (this.tasks[i]);
      if (this.tasks[i].checked) {
        this.afDB.list('Tasks/').remove(task.key);
      }
      // code...
    }
  }


}

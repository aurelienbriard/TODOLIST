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

  myTask = '';// je déclare une tache vide
  tasks = []; // le tableau de taches

  addTask: boolean; // un bolléen qui prend vrai ou faux si la tâche est affichée ou non

  // le constructeur de la page
  constructor(public afDB: AngularFireDatabase) {
    const date = new Date(); // je crée une variable date
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = date.toLocaleDateString('fr-FR', options);
    this.getTasks();
  }

  // ------------------------------------ mes fonctions ------------------------------------

  // pour ajouter une tache
  addTaskToFirebase() {
    this.afDB.list('Tasks/').push({
      text: this.myTask,
      date: new Date().toISOString(),
      checked: false
    });
    this.showForm();
  }

  // pour montrer une tache
  showForm() {
    this.addTask = !this.addTask;
    this.myTask = '';
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

}

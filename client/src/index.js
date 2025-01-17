// Importing the css file
import '@fortawesome/fontawesome-free/css/all.css';
import Modal from './components/Modal';
import Ideaform from './components/Ideaform';
import IdeaList from './components/Idealist';
import './css/style.css';

new Modal() //always instanciate after importing
const ideaForm = new Ideaform() //always instanciate after importing
ideaForm.render(); // when using render always call it
new IdeaList() //always instanciate after importing





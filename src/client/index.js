import { performAction } from './js/app'
import { toggle } from './js/toggle'
import './styles/style.scss'

document.getElementById('generate').addEventListener('click', toggle);
document.getElementById('generate').addEventListener('click', performAction);
import maths from '../assets/maths.png'
import IT from '../assets/it.png'
import economics from '../assets/economics.png'
import biology from '../assets/biology.png'
import law from '../assets/law.png'
import chemistry from '../assets/chemistry.png'
import physics from '../assets/physics.png'
import accounting from '../assets/accounting.png'
import art from '../assets/art.png'
import business from '../assets/business.png'
import african from '../assets/african.png'
import philosophy from '../assets/philosophy.png'

const data = [
  {name:"Mathematics", image:maths, newProblems:[]}, 
  {name:"Biology",image:biology, newProblems:[]},
  {name:"IT/Computer Science", image:IT, newProblems:[]}, 
  {name:"Economics",image:economics, newProblems:[]},
  {name:"Art", image:art, newProblems:[]}, 
  {name:"Law",image:law, newProblems:[]},
  {name:"Chemistry", image:chemistry, newProblems:[]}, 
  {name:"African Studies",image:african, newProblems:[]},
  {name:"Physics", image:physics, newProblems:[]}, 
  {name:"Accounting",image:accounting, newProblems:[]},
  {name:"Philosophy", image:philosophy, newProblems:[]}, 
  {name:"Business",image:business, newProblems:[]}
]

const themes = [{
    themeName:'light mode pink',
    textColor:'#3c3c3c', 
    headingColor:'#292525',
    themeColor:'#cd17d4',
    backgroundColor:'#fefcfe',
    iconColor:'#3c3c3c',
    placeholderColor:'#f0baf2',
    btnTextColor:'#fefefe',
    borderColor:'#40153a',
    viewProbBackground:'#e9e9e9',
    btnIconCol:"#fefcfe",
    viewSolBackground:'#f6f6f6',
    inputTextCol:'#4c4949',
    placeholderCol:"#e2dce1"
  },{
    themeName:'light mode blue',
    textColor:'#3c3c3c', 
    headingColor:'#292525',
    themeColor:'#162d8d',
    backgroundColor:'#fefcfe',
    iconColor:'#3c3c3c',
    placeholderColor:'#6a7298',
    btnTextColor:'#fefefe',
    borderColor:'#40153a',
    viewProbBackground:'#e9e9e9',
    btnIconCol:"#fefcfe",
    viewSolBackground:'#f6f6f6',
    inputTextCol:'#4c4949',
    placeholderCol:"#e2dce1"
  },{
    themeName:'dark mode',
    textColor:'#ffffff', 
    headingColor:'#ffffff',
    themeColor:'#9c9c9f',
    backgroundColor:'#0e0c0c',
    iconColor:'#ffffff',
    placeholderColor:'#ffffff',
    btnTextColor:'#fefefe',
    borderColor:'#40153a',
    viewProbBackground:'#e9e9e9',
    btnIconCol:"#0e0c0c",
    viewSolBackground:'#1f1d1d',
    inputTextCol:'#4c4949',
    placeholderCol:"#e2dce1"
  }]

export  {data, themes}
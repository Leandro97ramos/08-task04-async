/*
                                  _
                               _ooOoo_
                              o8888888o
                              88" . "88
                              (| -_- |)
                              O\  =  /O
                           ____/`---'\____
                         .'  \\|     |//  `.
                        /  \\|||  :  |||//  \
                       /  _||||| -:- |||||_  \
                       |   | \\\  -  /'| |   |
                       | \_|  `\`---'//  |_/ |
                       \  .-\__ `-. -'__/-.  /
                     ___`. .'  /--.--\  `. .'___
                  ."" '<  `.___\_<|>_/___.' _> \"".
                 | | :  `- \`. ;`. _/; .'/ /  .' ; |
                 \  \ `-.   \_\_`. _.'_/_/  -' _.' /
       ===========`-.`___`-.__\ \___  /__.-'_.'_.-'================
                               `=--=-'                    
                        
Author: Lean33
*/



/*
        ****** TEMPLATES *******

*/
//ELEMENTOS DE CHECKBOX
const elemCheck = (event) => {
    return `
             <div class="form-check col-md-2">
                 <input class="form-check-input" type="checkbox" value="${event.category}" id="flexCheck" >
                 <label class="form-check-label" for="flexCheckChecked">
                   ${event.category}
                 </label>
             </div>
             
     `
 }


const elemTable = (event) => {
    return 
            `

                <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>

            `
}



//getPrAssist();

//obtengo los datos y desde aca decido donde lo inserto
const getElemByPage = async(data, href) => {
    /*  
      */
      
  
      //espero y obtengo los elementos
      let events = await data;
      console.log(events);
  
  
      //mando a iterar los elementos
      InsertEvents(events);
  
      events.events.map(event => {
          
         
  
         // cardContainer.insertAdjacentHTML("beforeend", elemcard(event,href));
          
      })
      //cardContainer.insertAdjacentHTML("beforeend", noneResult())
      eventFiltroCheck();
      viewDetail();
  
  }
  
  
  
  const InsertEvents = (events) => {
      let cardContainer = document.querySelector('.container-cards');
      let checks = []
      events.events.map(event => {
          //separar en categorias
          getChecks(event, checks );
      })
  }
  const viewDetail = (event) => {
      const listItem = document.getElementsByClassName('card  col-md-6') ;
  
      Array.from(listItem).forEach((item) => {
          item.querySelector('.card_button').addEventListener('click', () => {
              //obtengo el objeto
              data.eventos.map((event) => {
                  console.log(event.category);
              })
          })
      })
  }
  
  const eventFiltroCheck = (event) => {
      const listItem = document.getElementsByClassName('card  col-md-6') ;
  
      //obtengo todos los checkbox 
      let checks = document.querySelectorAll('.form-check-input');
      //nombre de los checks seleccionados
      let checksChecked = [];
  
  
      //recorro los checkbox
      checks.forEach((check) => {
          //agrego evento change
          check.addEventListener('change', (event) => {
              //obtengo el valor del check
              let valCheck;
              //obtengo el valor del itemCheck
              //gurado los checks seleccionados
              let item = [];
  
              if (checksChecked.includes(event.target.value)) {
                  //elimino elemento
                  checksChecked.splice(checksChecked.indexOf(event.target.value), 1);
              }else{
                  //agrego elemento
                  checksChecked.push(event.target.value);
              }
              //muestro todos los valores con los elementos
  
              valCheck = event.target.value;
  
              console.log(checksChecked);
  
              //recorro los elementos
              Array.from(listItem).forEach((item) => {
                  //obtengo el valor del itemCheck
                  let itemCheck = item.querySelector('.form-label').textContent;
                  //comparo los valores
                  if (!checksChecked.includes(itemCheck)) {
                      item.style.display = 'none';
                  }else{
                      item.style.display = 'block';
                  }
              })
  
              Array.from(listItem).forEach((item) => {
                  //obtengo el valor del itemCheck
                  let itemCheck = item.querySelector('.form-label').textContent;
                  //comparo los valores
                  if (!checksChecked.includes(itemCheck)) {
                      item.style.display = 'none';
                  }else{
                      item.style.display = 'block';
                  }
              })
              
             
              if (checksChecked.length == 0) {
                  Array.from(listItem).forEach((item) => {
                      item.style.display = 'block';
                  })
              }
          })
              
          
       
      })
      //recorro los items
      Array.from(listItem).forEach((item) => {
          //obtengo el valor del item
          valItem = item.querySelector('label').textContent;
          //comparo los valores
          console.log(checksChecked.includes(valItem));
          if (checksChecked.includes(valItem)) {
              item.style.display = 'none';
          }
      })
  
  }
  
  const getChecks = (event, checks, ) => {
      let checkContainer = document.querySelector('.content-search');
  
      if (!checks.includes(event.category)) {
          checks.push(event.category);
          checkContainer.insertAdjacentHTML("afterbegin",elemCheck(event) );
      }
  
  }
  





 /* consultas async */


//get events to data.json
const getAllEvents = async() =>{
    //fetch
    const res = await fetch('../js/data.json');
    //get data
    const data = await res.json();
    return data;
}

//get all past events
const getAllTypeEvents = (evnt, type) => {
    let events = [];
    let fecha = evnt.currentDate;
    //recorro
    evnt.events.forEach((event) => {
        //pregunto si la fecha del evento es menor a la fecha actual
        if (type == 'past' && event.date < fecha) {
            //en caso afirmativo, pusheo el evento al array
            events.push(event);
            
        }else if( type == 'upcoming' && event.date > fecha){
            events.push(event);

        }
    })

    //retorno el array
    return events;
}



//get all future events



const getAllAsistence = (events) => {
    let allAsistence = 0;
    

    events.events.forEach((event) => {
        let assistance = event.assistance || event.estimate;

        allAsistence += Number(assistance);   
        
        
        
    })     

    //obtengo la media de asistencia
    return allAsistence;

}

const getPercentajeAssistance = (event, totAsist) => {
    let percentaje;
        percentaje= (event / totAsist ) * 100;
    return percentaje.toFixed(3);

}

//obtengo el name y el porcentaje de asistencia de los 5 eventos con mayor asistencia
const getPrAssist = (events, ord) => {
    let totAsist = getAllAsistence(events);
    //declare array
    let  getAssists = [];

        //recorro los eventos
    events.events.forEach((event) => {
        let eventAsist = event.assistance || event.estimate;
        getAssists.push(
            {   
                name: event.name,
                percentaje:  getPercentajeAssistance(eventAsist,totAsist)
            });
    })     

    //arr , tipo de atributo, orden
    return obtener5Valores(getAssists ,'percentaje' ,ord  );
     
}


const obtener5Valores = (arr,atr, ord) => {
    
    
    let arr2 = ordValores(arr,atr, ord);
    
   
    arr2.splice(5, arr.length)
    

    return arr2;
}

const ordValores = (arr,atr, ord) => {
    let arr2 = arr;
    console.log(atr);
    
    /*  HARD CODEADO*/ 
    if (ord == 'asc') {
        arr2.sort((a,b) => b.capacity - a.capacity);
        console.log(atr);

    }else if(ord == 'desc'){
        arr2.sort((a,b) => a.capacity - b.capacity);
        console.log(atr);

    }

    /*  LO QUE QUIERO  HACER
       if (ord == 'asc') {

            arr2.sort((a,b) => b.atr - a.atr);

        }else if(ord == 'desc'){
            
            arr2.sort((a,b) => a.atr - b.atr);
            
        }
    */

    return arr2;
}
        //obtengo los stats
const getStats = async(ev) => {
    
    const events = await ev;
    const pastEvents = getAllTypeEvents(events , 'past');
    const upcomingEvents = getAllTypeEvents(events , 'upcoming');

    //de todas las asistencias de los eventos las mas altas
    const hgPr = getPrAssist(events, 'asc');

    //de todas las asistencias de los eventos las mas bajas
    const lwPr = getPrAssist(events, 'desc');


    //obtengo el evento con mayor capacidad

    const hgCapacity = ordValores(events.events,'capacity' , 'desc');
    console.log(hgCapacity);

    

    //get by lowest percentage of attendance


}

const nav = () => {
    let URLactual = window.location.pathname.split('/').pop();
    
    switch (URLactual) {
        //envio el getAllEvents
        case 'index.html':  
                 getElemByPage(getAllEvents(), "./pages/details.html");
        break;
        
        case 'upComing.html': 
                 getElemByPage(getAllEvents(), "../pages/details.html");
        break;

        case 'pastEvents.html': 
                 getElemByPage(getAllEvents(),"../pages/details.html");  
        break;

        case 'stats.html': 
                getStats(getAllEvents());  
        break;
        default: 
                   getStats();
                 //getElemByPage(data.eventos,"./pages/details.html");
        break;
        
    }
}

nav();
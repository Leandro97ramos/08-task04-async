/*
                                  _
                               _ooOoo_
                              o8888888o
                              88" . "88
                              (|--_--|)
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


const elemcard = (event, href) => {
    return `
    
   


            <div class="card  col-md-6   " id="crd" style="width: 15rem;">
            <img src="${event.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title ">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <label class="form-label hidden" for="flexCheckChecked">${event.category}</label>
            </div>
            <div class="card_price_detail">
                <p class="card_price">Price: $ ${event.price}</p>
                <a href="${href}" id="${event.name}" class="card_button">View Detail</a>
            </div>
    
      
        </div>
            
            `
}
//
const cardDetail = (event) => {
    return `
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${event.image}" class="card-img-top" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
            </div>
        </div>
    </div>
</div>

    `
}


const noneResult = () => {
    return `
    <div class="col-md-12 noneRes hidden">
        <h1 class="text-center">No results found</h1>

    </div>
    `
}



const cardTable = (rw, name)  => {
    rw.insertAdjacentHTML("beforeend", `<th scope="row">${name}</th>`);

}



const getElemByPage = async (data, href) => {

    let events = await data;

   // console.log(events);
    InsertEvents(events,href);
    eventFiltroCheck();
    

}



const InsertEvents = (events, href) => {
    let cardContainer = document.querySelector('.container-cards');
    let checks = []
    events.map(event => {
        //separar en categorias
        getChecks(event, checks);
        cardContainer.insertAdjacentHTML("beforeend", elemcard(event,href));
    })
    viewDetail(events);
}
//show details
const viewDetail = (events ) => {
    //get all cards
    let cards = document.querySelectorAll('.card');

    //add event to button view detail
    cards.forEach((card) => {
        card.addEventListener('click', (event) => {
            

            //search event by name
            let eventDetail = getEventForName(event.target.id, events);
            //save event in localstorage
            localStorage.setItem('event', JSON.stringify(eventDetail));

            //redirect to detail page
            window.location.href = "detail.html";
        })
    } )


}

const getEventForName = (name , events) => {
    let event = events.find(event => event.name == name);
    return event;
}



const insertDetails = () => {
    let cardContainer = document.querySelector('.container-detail');
    let obj = JSON.parse(localStorage.getItem('event'));
    cardContainer.insertAdjacentHTML("beforeend", cardDetail(obj));



}
const eventFiltroCheck = (event) => {
    const listItem = document.getElementsByClassName('card  col-md-6');

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
            } else {
                //agrego elemento
                checksChecked.push(event.target.value);
            }
            //muestro todos los valores con los elementos

            valCheck = event.target.value;


            //recorro los elementos
            Array.from(listItem).forEach((item) => {
                //obtengo el valor del itemCheck
                let itemCheck = item.querySelector('.form-label').textContent;
                //comparo los valores
                if (!checksChecked.includes(itemCheck)) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'block';
                }
            })

            Array.from(listItem).forEach((item) => {
                //obtengo el valor del itemCheck
                let itemCheck = item.querySelector('.form-label').textContent;
                //comparo los valores
                if (!checksChecked.includes(itemCheck)) {
                    item.style.display = 'none';
                } else {
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
        if (checksChecked.includes(valItem)) {
            item.style.display = 'none';
        }
    })

}

const getChecks = (event, checks,) => {
    let checkContainer = document.querySelector('.content-search');

    if (!checks.includes(event.category)) {
        checks.push(event.category);
        checkContainer.insertAdjacentHTML("afterbegin", elemCheck(event));
    }

}

//como ??





/* consultas async */

const getAllEvents = async () => {
    const res = await fetch('../js/data.json');
    const data = await res.json();
    return data;
}

//get events to data.json
const getEventsCondition = async (type) => {
    let evt;
    //fetch
    const data = await getAllEvents()

    //pregunto si el type esta definido
    if (type) {

         evt = getAllTypeEvents(data, type) ;

    }else{
        //si no esta definido, retorno todos los eventos
        evt = data.events;
    }
    return evt;
}



const getAllTypeEvents = (evnt, type) => {
    let events = [];
    let fecha = evnt.currentDate;
    //console.log(evnt);
    //recorro
    evnt.events.forEach((event) => {
        //pregunto si la fecha del evento es menor a la fecha actual
        if (type == 'past' && event.date < fecha) {
            //en caso afirmativo, pusheo el evento al array
            events.push(event);

        } else if (type == 'upcoming' && event.date > fecha) {
            events.push(event);

        }
    })

    //retorno el array
    return events;
}



//get all future events



const getAllAsistence = (events) => {
    let allAsistence = 0;


    events.forEach((event) => {
        let assistance = event.assistance || event.estimate;

        allAsistence += Number(assistance);
    })

    return allAsistence;

}

//aca se empieza como a separar mucho

const getPercentajeAssistance = (event, totAsist) => {
    let percentaje;
    percentaje = (event / totAsist) * 100;
    return percentaje.toFixed(3);

}

//obtengo el name y el porcentaje de asistencia de los 5 eventos con mayor asistencia
const getPrAssist = (events) => {
    let totAsist = getAllAsistence(events);
    //declare array
    let getAssists = [];

    //recorro los eventos
    events.forEach((event) => {
        let eventAsist = event.assistance || event.estimate;
        getAssists.push(
            {
                name: event.name,
                percentaje: getPercentajeAssistance(eventAsist, totAsist)
            });
    })

    //arr , tipo de atributo, orden
    return getAssists;
    
    
    //obtener10porc(getAssists, 'percentaje', ord);

}

//tambien el echo de pasar muchos atributos por parametro
const obtener10porc = (obj, atr, ord) => {
    let porc = 0;
    console.log(obj.length);
    
    porc = obj.length * 0.1;
    
    //redondeo hacia arriba
    porc = Math.ceil(porc);


    let arr2 = ordValores(obj, atr, ord);
    arr2.splice(porc, obj.length)
    //mayor a menor

    //esto creo q esta mal
    arr2.reverse()
    return arr2;

    
}

const ordValores = (arr, atr, ord) => {

    let arr2 = arr;
    //esto me tubo casi todo el finde pensando xd

    arr2.sort((a, b) => {
      
        if (ord == 'asc') {
            return b[atr] - a[atr];
        } else if (ord == 'desc') {
            return a[atr] - b[atr];
        }
    });

    return arr2;
}


//obtengo los stats
const getStats = async (ev) => {

    let events = await  ev;

    console.log(events);
    let pastEvents = getAllTypeEvents(events , 'past');
    console.log(pastEvents);
    let upcomingEvents = getAllTypeEvents(events, 'upcoming');
    
    setDatosTableOne(events.events);

    
    setDatosTableTwo(pastEvents , 'past-stats');

   setDatosTableTwo(upcomingEvents , 'upc-stats' );
    
}




const setDatosTableOne = (evt) => {
    let hgPerc = obtener10porc (getPrAssist(evt), 'percentaje', 'asc');
    let lwpercent = obtener10porc (getPrAssist(evt), 'percentaje', 'desc');
    let capacity = obtener10porc(evt, 'capacity', 'asc');
    let indices = hgPerc.length;

    //recorro el array
    for (let i = 0; i < indices ; i++) {
        let v1= `${hgPerc[i].name}  -  ${hgPerc[i].percentaje}` ;
        let v2= `${lwpercent[i].name}  -  ${lwpercent[i].percentaje}` ;
        let v3 =`${capacity[i].name}  -  ${capacity[i].capacity}` ;

        insertTable( v1,v2,v3, 'evnt-stats')
    }

}

const setDatosTableTwo = (evt , tbl) =>{
    let categorys = [];
    let arr2 = [];
    console.log(evt);
    evt.forEach((event) => {
        let cat = event.category;
        if (!categorys.includes(cat)) {
            categorys.push(cat);
        }
    })
    categorys.forEach((cat) => {
        //obtengo el porcentaje de precio de cada categoria
        arr2.push({
                category : cat,
                percent: getPrByPrice(evt, cat),
                percentAudenc: getPrByAudience(evt, cat)
            });
        })
    arr2.forEach((e) => {
        insertTable(e.category, e.percent, e.percentAudenc, tbl);
    })



}

const getPrByAudience = (events, cat) => {
    let arr = [];
    let pr = 0;
    //porcentaje de precio
    events.forEach((event) => {
        if (event.category == cat) {
            let eventAsist = event.assistance || event.estimate;

            //parse to int
            pr += parseInt(eventAsist);

        }
    })

    pr = (pr / events.length);

    return pr
}


const getPrByPrice = (events, cat) => {
    let arr = [];
    let pr = 0;
    
    events.forEach((event) => {
        if (event.category == cat) {
            //parse to int 
             pr  += parseInt(event.price);

        }
    })


    pr = (pr / events.length);
    
    return pr.toFixed(2);
    
}


const insertTable = (cel1,cel2,cel3, event) => {
        //obtengo el id de la table
    let tblStat = document.getElementById(event);

    

    let rw = tblStat.insertRow(0);

    
    //asi me gusta mas , igual ahora te muestro la consola
    cardTable(rw , cel1);
    cardTable(rw , cel2);
    cardTable(rw , cel3);
    //siento que de a ratos esta todo hard codeado y  en otro todo separado en funciones

}


//ven ?? asi me gusta mas ?? 
const nav = () => {
    let URLactual = window.location.pathname.split('/').pop();

    switch (URLactual) {
        //envio el getEventsCondition
        case 'index.html':
            getElemByPage(getEventsCondition(), "./pages/details.html");
            break;

        case 'upComing.html':
            getElemByPage(getEventsCondition('upcoming'), "../pages/details.html");
            break;
        case 'pastEvents.html':
            getElemByPage(getEventsCondition('past'), "../pages/details.html");
            break;
        case 'details.html':
                
                insertDetails();
        
            break;
            
        case 'stats.html':
            getStats(getAllEvents());
            break;
        default:
           // getStats();
            //getElemByPage(data.eventos,"./pages/details.html");
            break;

    }
}
nav();



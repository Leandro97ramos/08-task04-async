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
                <a href=${href}  class="card_button">View Detail</a>
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

const cardTable = (name)  => {
    return `
            <th scope="row">${ name}</th>
    
        
    `
}



//getPrAssist();

//obtengo los datos y desde aca decido donde lo inserto
const getElemByPage = async (data, href) => {
    /*  
      */


    //espero y obtengo los elementos
    let events = await data;
    console.log(events);


    //mando a iterar los elementos
    InsertEvents(events,href);

    events.events.map(event => {



        // cardContainer.insertAdjacentHTML("beforeend", elemcard(event,href));

    })
    //cardContainer.insertAdjacentHTML("beforeend", noneResult())
    eventFiltroCheck();
    viewDetail();

}



const InsertEvents = (events, href) => {
    let cardContainer = document.querySelector('.container-cards');
    let checks = []
    events.events.map(event => {
        //separar en categorias
        getChecks(event, checks);
        cardContainer.insertAdjacentHTML("beforeend", elemcard(event,href));

        
    })
}

const viewDetail = (event) => {
    const listItem = document.getElementsByClassName('card  col-md-6');

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

            console.log(checksChecked);

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
        console.log(checksChecked.includes(valItem));
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






/* consultas async */


//get events to data.json
const getAllEvents = async () => {
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


    events.events.forEach((event) => {
        let assistance = event.assistance || event.estimate;

        allAsistence += Number(assistance);



    })

    //obtengo la media de asistencia
    return allAsistence;

}

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
    events.events.forEach((event) => {
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


const obtener10porc = (arr, atr, ord) => {

    //10% de los eventos
    let porc = arr.length * 0.1;
    //redondeo hacia arriba
    porc = Math.ceil(porc);


    let arr2 = ordValores(arr, atr, ord);
    arr2.splice(porc, arr.length)
    //mayor a menor

    arr2.reverse()
    return arr2;
}

const ordValores = (arr, atr, ord) => {

    let arr2 = arr;
    /* HARD CODEADO
    if (ord == 'asc') {
        arr2.sort((a,b) => b.capacity - a.capacity);
        console.log(atr);

    }else if(ord == 'desc'){
        arr2.sort((a,b) => a.capacity - b.capacity);
        console.log(atr);

    }
        arr2.forEach((event) => {
            console.log(event[atr]);
        })
    */
    arr2.sort((a, b) => {
        let x = a[atr];
        let y = b[atr];
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

    let events = await ev;
    console.log(events);
    
    
    let pastEvents = getAllTypeEvents(events, 'past');
    let upcomingEvents = getAllTypeEvents(events, 'upcoming');
    
    setDatosTableOne(events);
    
    setDatosTableTwo(pastEvents , 'past-stats');

    setDatosTableTwo(upcomingEvents , 'upc-stats' );
    
}


const setDatosTableOne = (evt) => {
   
    let hgPerc = obtener10porc (getPrAssist(evt), 'percentaje', 'asc');
    let lwpercent = obtener10porc (getPrAssist(evt), 'percentaje', 'desc');
    let capacity = obtener10porc(evt.events, 'capacity', 'asc');
    let indices = hgPerc.length;

    console.log(capacity);


    //recorro el array
    for (let i = 0; i < indices; i++) {
        let v1= `${hgPerc[i].name}  -  ${hgPerc[i].percentaje}` ;
        let v2= `${lwpercent[i].name}  -  ${lwpercent[i].percentaje}` ;
        let v3 =`${capacity[i].name}  -  ${capacity[i].capacity}` ;

        insertTable( v1,v2,v3, 'evnt-stats'  )
    }

    

}

const setDatosTableTwo = (evt , tbl) =>{
    let categorys = [];
    let arr2 = [];
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
        console.log(arr2);
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
    let tblStat = document.getElementById(event);

    
    console.log(  cel3);
    //inserto en la tabla
    let rw = tblStat.insertRow(0);
    rw.insertAdjacentHTML("beforeend", cardTable(cel1));

    rw.insertAdjacentHTML("beforeend", cardTable(cel2));

    rw.insertAdjacentHTML("beforeend", cardTable(cel3));

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
            getElemByPage(getAllEvents(), "../pages/details.html");
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
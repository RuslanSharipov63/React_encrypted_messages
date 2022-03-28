
import React, {useState} from 'react';
import env from '../env.json';

function Create() {

  /* делаем стейты для вывода ссылки */
  const [url, setUrl] = useState('');
  const [lineClass, setLineClass] = useState('hide');
  const [formClass, setFormClass] = useState('');

  let sendData = (obj) => {/* эту функция отправляет данные на сервер */
   
    setFormClass('hide');
    setLineClass(''); 
    
    fetch(env.urlBackend, {
      method : 'POST', 
      headers : {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body : JSON.stringify(obj)
    })
    .then(response => response.json())/* трансформируем ответ от сервера в json */
    .then(response => {
      console.log(response)
      if(response.result) {/* у нас в json удет поле result с true или false */
        setUrl(env.url+'/'+response.url); /* ответ сервера, который придет от бэкенда. по договоренности хэш будет присылаться в поле url - по договоренности с бэкенд-разработчиком */
        /* НО у нас два раза дублируется http://localhost:3500, когда будем переносить на реальный сервер его еще надо будет найти и не потерять. поэтому подобные параметры удобно переносить в отдельный файл. поэтому в src создаем файл env.json - возьмите это за правило, это хорошая привычка - там у нас будут параметры проекта*/
      }
    })
  } 

  let loadDataFromForm = (event) => {
    event.preventDefault();
    /* здесь мы можем сами сделать проверку на пустую форму */
    let note = event.target.elements.note.value; /* получаем все элементы формы */
   
    note = note.trim();
    if(note === '') {
      alert('Заполните поля'); /* здесь потом можно будет сделать всплывающее окно */
      return false;
    }
    sendData({"note" : note}); /* то есть у нас одна функция проверяет форму, другая отправляет данные на сервер. в качестве параметра передали текст из формы  */
  }

  return (
    <div>
      <form onSubmit={loadDataFromForm} className={formClass}> {/* action пустой, его вообще удалили, так как мы будем отправлять форму на данный файл. никуда мы уходить не будем */}
       <div className='row'>
         <div className='col'></div>
         <div className='col-6 text-center mt-3 text-white-50'>
        <label htmlFor="note">Введите заметку</label> {/* в хтмл файлах атрибут for, здесь htmlFor */}
        </div>
        <div className='col-3'></div>
        </div>

        <div className='row'>
         <div className='col'></div>
         <div className='col-6 text-center mt-3'>
        <textarea className="form-control" name="note" id="note" defaultValue="Test"></textarea>{/* по id textarea будет связан с label */}
        </div>
        <div className='col-3'></div>
        </div>



        <div className='row'>
         <div className='col-3'></div>
         <div className='col-6 text-center mt-3 mb-3'>
        <button className="btn btn-primary" type="submit">Создать</button>
        </div>
        <div className='col-3'></div>
        </div>
      </form>


   <div className={lineClass}> {/* это будейт стейт */}

   <div className='row'>
   <div className='col-2'></div>
         <div className='col-8 text-center mt-3 text-warning'>
       {url}
        </div>
        <div className='col-2'></div>
        </div>
        


        <div className='row'>
   
   <div className='col-4'></div>
         <div className='col-4 text-center'>
          <button className='btn btn-primary mb-3 mt-4' onClick={function() {
          window.location.reload()
        }}>Создать новую заметку</button>
        </div>
         <div className='col-4'></div>
         
        </div>
        
       
        </div>
        


    </div>
  );
}

export default Create;

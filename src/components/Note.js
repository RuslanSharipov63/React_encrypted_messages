import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import env from '../env.json';

function Note() {
  let {noteUrl} = useParams();
  const [noteText, setNoteText] = useState('');
  const [lineClass, setLineClass] = useState('hide'); /* изначально этот блок с этим стейтом будет скрыт */
  const [formClass, setFormClass] = useState('hide');
  const [errorClass, setErrorClass] = useState('hide');
/* useEffect будет принимать функцию коллбэк. первое мы должны проверить что noteUrl у нас есть, что пользователь зашел по нашему адресу с параметром, а не просто набрал note. если он просто набрал note я должен ему показать форму и предложить ввести данный параметр  */
  useEffect(()=>{
    if(noteUrl !== undefined) {
      fetch(env.urlBackend, {
        method : 'POST', 
        headers : {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        body : JSON.stringify({"url" : noteUrl}) /* нашу часть хеша  будем посылать на сервер */
      })
      .then(response => response.json())/* ответ тоже приходит json */
      .then(response => {
        console.log(response)
        if(response.result) {
         /* мы получили ответ и теперь должны положить в стейт */
         setNoteText(response.note);
         setLineClass('');
         setFormClass('hide');
         setErrorClass('hide');
        }
        else if (!response.result) {
      setLineClass('hide');
      setFormClass('hide');
      setErrorClass('');

    }
      })
      /* если пользователь перешел просто по note мы должны скрыть блок, где показывается сообщение и показать форму */
    } else {
      setLineClass('hide');
      setFormClass('');
      setErrorClass('hide');
    }
  }, []);/* если мы не передадим пустой массив в качестве второго параметра. если этого не сделать, то при загрузке страницы мы запускаем useEffect и как только мы положели его в setNote у нас начал перерисовывается компонент, обновляться перезагружаться и посыпались выводы.  */

  function getNote(event) {
      event.preventDefault();
      let url = event.target.elements.url.value; /* получаем значение из инпута */
      url = url.trim();
      if(url === '') {
        alert('заполните поля');
        return false;
      } 

      noteUrl = url /* этот url мы вытащили из инпута */
      window.location.href = env.url + '/' + url; /* если мы вставим хэш внутрь инпута нашего - Введите хэш заметки - мы здесь делаем перенаправили себя на нужный адрес. я произвел перенаправление я перезагрузился и вместо того, чтобы писать второй феч я попал на useEffect и выполнил все url запросы как-будто у меня этот адрес есть и оказался в адресной строке и я получил доступ к информации  */
    }

  function searchNote() {
    window.location.href = env.url;
  
}


return (
      <div>
        <div className={lineClass}>
          <h4>Note:</h4>


 <div className='row'>
   <div className='col-2'></div>
         <div className='col-8 text-center mt-3 text-warning'>
          {noteText}
          </div>
        <div className='col-2'></div>
        </div>



        <div className='row'>
         <div className='col-3'></div>
         <div className='col-6 text-center mt-3 mb-3'>
          <button onClick={searchNote} className="btn btn-primary">Смотреть еще один note</button>
          </div>
        <div className='col-3'></div>
        </div>



        </div>

        <div className={errorClass}>
        <h4>Произошла ошибка. Такой note не найден</h4>
        </div>



        <div className={formClass}>
          <form action="" onSubmit={getNote}>
            <div className="row p-3">
            <div className="col-3 "></div>
                <div className="col-6">

                    <div className="row text-center">
                    <div className="col-3"></div>
                    <div className="col-6 text-center">
                        <label htmlFor="url" className="row p-3 text-white-50">Введите hash заметки</label>
                      </div>
                      <div className="col-3"></div>
                      </div>
                      
                    <input type="text" name="url" id="url" className="form-control"/>

                    <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6 text-center">
                    <button type="submit" className="btn btn-primary mt-3">Искать note</button>
                        </div>
                        <div className="col-3"></div>
                      </div>
                </div>
                <div className="col-3"></div>
              </div>
          </form>
        </div> 
      </div>
    );
  }
  
  export default Note;
  

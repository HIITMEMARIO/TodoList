import './App.css';
import { useState } from 'react';

function App() {
  const [titleValue, settitleValue] = useState('');
  const [detailValue, setdeatilValue] = useState('');
  const [List, setList] = useState([]);

  const addCard = function () {
    const newList = {
      id: List.length + 1,
      title: titleValue,
      detail: detailValue,
      isDone: false,
    };

    if (titleValue === '') {
      alert('제목을 입력하세요.');
    } else {
      setList([...List, newList]);
      settitleValue('');
      setdeatilValue('');
    }
  };

  const deleteHandler = (id) => {
    const newList = List.filter((item) => item.id !== id);
    if (window.confirm('삭제 하시겠습니까?')) {
      alert('삭제 되었습니다.');
      setList(newList);
    }
  };

  const doneHandler = (id) => {
    setList(
      List.map((item) => {
        if (item.id === id) {
          item.isDone = !item.isDone;
        }
        return item;
      })
    );
  };

  return (
    <div className="container">
      <div className="nav">
        <div className="title">
          제목 &nbsp;{' '}
          <input
            className="titlebox"
            type="text"
            value={titleValue}
            onChange={(e) => {
              settitleValue(e.target.value);
            }}
          />
        </div>

        <div className="detail">
          내용 &nbsp;{' '}
          <input
            className="detailbox"
            type="text"
            value={detailValue}
            onChange={(e) => {
              setdeatilValue(e.target.value);
            }}
          />
        </div>

        <button className="addButton" onClick={addCard}>
          추가하기
        </button>
      </div>

      <p>🔥Working</p>

      <section className="workingsection">
        {List.filter((item) => !item.isDone).map(function (item) {
          return (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              detail={item.detail}
              deleteHandler={deleteHandler}
              doneHandler={doneHandler}
              isDone={item.isDone}
            />
          );
        })}
      </section>

      <p>👌Done</p>

      <section className="donesection">
        {List.filter((item) => item.isDone).map(function (item) {
          return (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              detail={item.detail}
              deleteHandler={deleteHandler}
              doneHandler={doneHandler}
              isDone={item.isDone}
            />
          );
        })}
      </section>
    </div>
  );
}

function Card({ id, title, detail, deleteHandler, doneHandler, isDone }) {
  console.log(id);
  return (
    <div>
      <div className="cards" key={id}>
        <div className="cardstitle">{title}</div>
        <div className="cardsdetail">{detail}</div>
        <button className="delete" onClick={() => deleteHandler(id)}>
          삭제하기
        </button>
        <button className="done" onClick={() => doneHandler(id)}>
          {isDone ? '취소' : '완료'}
        </button>
      </div>
    </div>
  );
}

export default App;

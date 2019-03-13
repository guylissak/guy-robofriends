import React from 'react';
import Card from './Card';

const CardList = ({robots}) => {
    const cardsArray = robots.map((user,i) => {
        //when you do a loop in react you must give it  unique key
        return (<Card key={i} id={robots[i].id} name={robots[i].name} email={robots[i].email}/>);
    })
    return (
        //this is actually a render() of the CardList component.
        <div>
           { cardsArray }
        </div>
    );
}
export default CardList;
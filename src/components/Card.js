import React from 'react';

const Card = ({name, id, email}) => {
    //the above is equivalent to if as we received props and just destructed them
    //const {name, id, email } = props;
    return (
        //?200x200 changes the img size
        //using class from taychon
        //bg means backgrounf dib means inline br border pinot pa padding ma marging
        //Using the grow class on an element will cause it to scale to 1.05% of its normal size on hover.
        <div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
            <img alt='robots' src={`https://robohash.org/${id}?size=220x220`} />
            <div>
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    );
}

export default Card;
